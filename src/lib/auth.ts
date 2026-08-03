import "server-only";

import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import {
  appendAuthLog,
  findByUsername,
  getAdmins,
  getSessions,
  getAuthLog,
  writeSessions,
  type AdminRecord,
} from "@/lib/store";

export const SESSION_COOKIE = "mh_sid";

const SESSION_IDLE_MS = 45 * 60 * 1000; // 45 minutes idle timeout
const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

const now = () => Date.now();

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function resolveClientIp(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "(unknown)";
  }
  return (
    headersList.get("x-real-ip")?.trim() ||
    headersList.get("cf-connecting-ip")?.trim() ||
    "(unknown)"
  );
}

// A cached hash of a throwaway string, used to make "unknown username" and
// "wrong password" take the same amount of time (avoids username enumeration).
let dummyHash: string | null = null;
async function getDummyHash(): Promise<string> {
  if (!dummyHash) {
    dummyHash = await bcrypt.hash("not-a-real-credential", 12);
  }
  return dummyHash;
}

// Returns true when the IP has exceeded the failed-attempt limit.
export async function isIpLockedOut(ip: string): Promise<boolean> {
  const log = await getAuthLog();
  const cutoff = now() - ATTEMPT_WINDOW_MS;
  const recentFailures = log.filter(
    (entry) => !entry.success && entry.ip === ip && entry.ts >= cutoff,
  );
  return recentFailures.length >= MAX_ATTEMPTS;
}

export async function logLoginAttempt(
  ip: string,
  username: string,
  success: boolean,
) {
  await appendAuthLog({ ts: now(), ip, username, success });
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<AdminRecord | null> {
  const admin = await findByUsername(username);
  if (!admin) {
    await bcrypt.compare(password, await getDummyHash());
    return null;
  }
  const ok = await verifyPassword(password, admin.passwordHash);
  return ok ? admin : null;
}

// --- Sessions ---------------------------------------------------------------

export async function createSession(adminId: string) {
  const token = randomBytes(32).toString("hex");
  const sessions = await getSessions();
  sessions.push({
    token,
    userId: adminId,
    createdAt: now(),
    lastSeen: now(),
    expiresAt: now() + SESSION_IDLE_MS,
  });
  await writeSessions(sessions);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_IDLE_MS / 1000,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const sessions = await getSessions();
    await writeSessions(sessions.filter((s) => s.token !== token));
  }
  cookieStore.delete(SESSION_COOKIE);
}

// Returns the currently authenticated admin, extending the session on activity
// (sliding window). Returns null when not authenticated or session expired.
export async function getCurrentAdmin(): Promise<AdminRecord | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const sessions = await getSessions();
  const session = sessions.find((s) => s.token === token);
  if (!session) return null;

  if (session.expiresAt < now()) {
    await writeSessions(sessions.filter((s) => s.token !== token));
    return null;
  }

  // Sliding window: bump lastSeen/expiresAt while the session is active.
  if (now() - session.lastSeen > 60 * 1000) {
    session.lastSeen = now();
    session.expiresAt = now() + SESSION_IDLE_MS;
    await writeSessions(sessions);
  }

  const admins = await getAdmins();
  return admins.find((admin) => admin.id === session.userId) ?? null;
}
