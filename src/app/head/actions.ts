"use server";

import { revalidatePath } from "next/cache";
import {
  createSession,
  destroySession,
  getCurrentAdmin,
  isIpLockedOut,
  logLoginAttempt,
  resolveClientIp,
  verifyAdminCredentials,
} from "@/lib/auth";
import {
  createId,
  deletePostById,
  getPosts,
  savePost,
  type NewsPost,
} from "@/lib/store";
import { deleteUploadedImage, saveNewsImage } from "@/lib/uploads";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

const ALLOWED_CATEGORIES = new Set([
  "announcement",
  "event",
  "achievement",
  "charity",
]);

function formatDisplayDate(dateIso: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  if (!y || !m || !d) return dateIso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// --- Authentication ---------------------------------------------------------

export async function loginAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { ok: false, error: "Both fields are required." };
  }

  const ip = await resolveClientIp();

  if (await isIpLockedOut(ip)) {
    await logLoginAttempt(ip, username, false);
    return {
      ok: false,
      error: "Too many failed attempts. Please wait 15 minutes and try again.",
    };
  }

  const admin = await verifyAdminCredentials(username, password);
  if (!admin) {
    await logLoginAttempt(ip, username, false);
    return { ok: false, error: "Invalid username or password." };
  }

  await logLoginAttempt(ip, username, true);
  await createSession(admin.id);
  return { ok: true };
}

export async function logoutAction() {
  await destroySession();
}

// --- Post management ----------------------------------------------------------

export async function savePostAction(formData: FormData): Promise<ActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { ok: false, error: "Not authorized." };
  }

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const dateIso = String(formData.get("date") ?? "").trim();
  const readTime = Math.max(1, parseInt(String(formData.get("readTime") ?? ""), 10) || 4);
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!title || !excerpt) {
    return { ok: false, error: "Title and excerpt are required." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
    return { ok: false, error: "A valid date is required." };
  }
  if (!ALLOWED_CATEGORIES.has(category)) {
    return { ok: false, error: "Invalid category selected." };
  }

  const existing = id
    ? (await getPosts()).find((post) => post.id === id)
    : undefined;

  const nowIso = new Date().toISOString();
  let image: string | undefined = existing?.image;
  let newlyUploaded: string | undefined;

  const rawImage = formData.get("image");
  if (rawImage instanceof File && rawImage.size > 0) {
    try {
      newlyUploaded = await saveNewsImage(rawImage);
      image = newlyUploaded;
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Image upload failed.",
      };
    }
  }
  if (formData.get("removeImage") === "1") {
    image = undefined;
  }

  const post: NewsPost = {
    id: existing?.id ?? createId(),
    title,
    excerpt,
    category,
    date: formatDisplayDate(dateIso),
    dateIso,
    readTime,
    featured,
    published,
    image,
    createdAt: existing?.createdAt ?? nowIso,
    updatedAt: nowIso,
  };

  try {
    await savePost(post);
  } catch {
    await deleteUploadedImage(newlyUploaded);
    return { ok: false, error: "Could not save the post. Please try again." };
  }

  // Clean up the replaced image only after the new post was written.
  if (existing?.image && existing.image !== post.image) {
    await deleteUploadedImage(existing.image);
  }

  revalidatePath("/head");
  revalidatePath("/news");
  revalidatePath("/");
  return { ok: true };
}

export async function deletePostAction(id: string): Promise<ActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { ok: false, error: "Not authorized." };
  }

  const existing = (await getPosts()).find((post) => post.id === id);
  if (!existing) {
    return { ok: false, error: "Post not found." };
  }

  await deleteUploadedImage(existing.image);
  await deletePostById(id);

  revalidatePath("/head");
  revalidatePath("/news");
  revalidatePath("/");
  return { ok: true };
}
