import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { UPLOADS_DIR } from "@/lib/store";

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

function sniffImage(buf: Buffer, ext: string): boolean {
  if (ext === "jpg" || ext === "jpeg") {
    return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  }
  if (ext === "png") {
    return (
      buf.length > 8 &&
      buf.readUInt32BE(0) === 0x89504e47 &&
      buf.readUInt32BE(4) === 0x0d0a1a0a
    );
  }
  if (ext === "gif") {
    const head = buf.subarray(0, 6).toString("ascii");
    return head === "GIF87a" || head === "GIF89a";
  }
  if (ext === "webp") {
    return (
      buf.length > 12 &&
      buf.subarray(0, 4).toString("ascii") === "RIFF" &&
      buf.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }
  return false;
}

// Validates the file (extension + size + magic bytes) and stores it under
// /public/uploads/news/ so it is served as a plain static asset, never executed.
export async function saveNewsImage(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error("Unsupported image type. Allowed: JPG, PNG, WEBP, GIF.");
  }
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be between 1 byte and 8MB.");
  }
  const buf = Buffer.from(await file.arrayBuffer());
  if (!sniffImage(buf, ext)) {
    throw new Error("The file does not look like a valid image.");
  }

  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buf, { flag: "wx" });
  return `/uploads/news/${filename}`;
}

export async function deleteUploadedImage(url: string | undefined) {
  if (!url) return;
  if (!url.startsWith("/uploads/news/")) return;
  const filename = path.basename(url);
  await fs.rm(path.join(UPLOADS_DIR, filename), { force: true }).catch(() => {});
}
