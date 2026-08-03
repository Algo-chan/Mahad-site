import { promises as fs } from "fs";
import path from "path";
import { randomBytes, randomUUID } from "crypto";

// Server-side JSON file store. Runs only on the Node runtime (next start),
// backed by a writable data/ directory at the project root. Not suitable for
// serverless/static deployments. Files under data/ and public/uploads/ are
// gitignored so admin credentials, sessions and uploads never reach the repo.

export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "news");

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateIso: string;
  readTime: number;
  featured: boolean;
  published: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminRecord {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  role: "admin";
  createdAt: string;
}

export interface SessionRecord {
  token: string;
  userId: string;
  createdAt: number;
  lastSeen: number;
  expiresAt: number;
}

export interface AuthLogEntry {
  ts: number;
  ip: string;
  username: string;
  success: boolean;
}

async function ensureFile(file: string, fallback: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify(fallback, null, 2), "utf8");
  }
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureFile(file, fallback);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, value: T) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${randomBytes(6).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tmp, file);
}

const POSTS_FILE = path.join(DATA_DIR, "posts.json");
const ADMINS_FILE = path.join(DATA_DIR, "admins.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");
const AUTH_LOG_FILE = path.join(DATA_DIR, "auth-log.json");

// --- Posts -----------------------------------------------------------------

// Migrated from src/data/news.json. Maps the old free-form categories onto the
// canonical category set used by the public news UI.
const SEED_POSTS: Array<Omit<NewsPost, "readTime" | "featured" | "published" | "createdAt" | "updatedAt">> = [
  {
    id: "seed-1",
    title: "New Science Laboratory Opens",
    date: "July 15, 2026",
    dateIso: "2026-07-15",
    category: "announcement",
    excerpt:
      "Thanks to our generous donors, students now have access to modern science equipment.",
  },
  {
    id: "seed-2",
    title: "Annual Charity Run Raises $5,000",
    date: "June 28, 2026",
    dateIso: "2026-06-28",
    category: "event",
    excerpt:
      "The local community came together to support our scholarship fund in a record-breaking event.",
  },
  {
    id: "seed-3",
    title: "Religious Education Program Expands",
    date: "June 10, 2026",
    dateIso: "2026-06-10",
    category: "announcement",
    excerpt:
      "We are now offering advanced religious studies through Grade 12 with certified instructors.",
  },
];

async function seedPostsIfMissing() {
  await ensureFile(POSTS_FILE, []);
  try {
    const existing = await readJson<unknown>(POSTS_FILE, []);
    if (Array.isArray(existing) && existing.length > 0) return;
  } catch {
    // fall through and write the seed data
  }
  const nowIso = new Date().toISOString();
  const seeded: NewsPost[] = SEED_POSTS.map((post) => ({
    ...post,
    readTime: 4,
    featured: false,
    published: true,
    createdAt: nowIso,
    updatedAt: nowIso,
  }));
  await writeJson(POSTS_FILE, seeded);
}

export async function getPosts(): Promise<NewsPost[]> {
  await seedPostsIfMissing();
  const posts = await readJson<NewsPost[]>(POSTS_FILE, []);
  return posts.sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1));
}

export async function getPublishedPosts(): Promise<NewsPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.published);
}

export async function savePost(post: NewsPost) {
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.push(post);
  }
  await writeJson(POSTS_FILE, posts);
}

export async function deletePostById(id: string) {
  const posts = await getPosts();
  await writeJson(
    POSTS_FILE,
    posts.filter((post) => post.id !== id),
  );
}

// --- Admins ----------------------------------------------------------------

export async function getAdmins(): Promise<AdminRecord[]> {
  return readJson<AdminRecord[]>(ADMINS_FILE, []);
}

export async function saveAdmin(admin: AdminRecord) {
  const admins = await getAdmins();
  const index = admins.findIndex((a) => a.id === admin.id);
  if (index >= 0) {
    admins[index] = admin;
  } else {
    admins.push(admin);
  }
  await writeJson(ADMINS_FILE, admins);
}

export async function findByUsername(username: string): Promise<AdminRecord | null> {
  const admins = await getAdmins();
  const normalized = username.trim().toLowerCase();
  return (
    admins.find((admin) => admin.username.toLowerCase() === normalized) ?? null
  );
}

// --- Sessions --------------------------------------------------------------

export async function getSessions(): Promise<SessionRecord[]> {
  return readJson<SessionRecord[]>(SESSIONS_FILE, []);
}

export async function writeSessions(sessions: SessionRecord[]) {
  await writeJson(SESSIONS_FILE, sessions);
}

// --- Auth log (failed login attempts) --------------------------------------

export async function getAuthLog(): Promise<AuthLogEntry[]> {
  return readJson<AuthLogEntry[]>(AUTH_LOG_FILE, []);
}

export async function appendAuthLog(entry: AuthLogEntry) {
  const log = await getAuthLog();
  // Keep only the last 1000 entries to bound file growth.
  log.push(entry);
  await writeJson(AUTH_LOG_FILE, log.slice(-1000));
}

export function createId() {
  return randomUUID();
}
