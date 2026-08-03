"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  deletePostAction,
  logoutAction,
  savePostAction,
} from "@/app/head/actions";
import type { NewsPost } from "@/lib/store";
import {
  Calendar,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

interface SafeAdmin {
  id: string;
  username: string;
  name: string;
}

const CATEGORY_OPTIONS = [
  { value: "announcement", label: "Announcement" },
  { value: "event", label: "Event" },
  { value: "achievement", label: "Achievement" },
  { value: "charity", label: "Charity" },
];

function categoryLabel(category: string) {
  return (
    CATEGORY_OPTIONS.find((option) => option.value === category)?.label ??
    category
  );
}

const inputCls =
  "w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-primary";

export function AdminPanel({
  admin,
  posts,
}: {
  admin: SafeAdmin;
  posts: NewsPost[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<NewsPost | "new" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
      router.refresh();
    });
  }

  function handleDelete(post: NewsPost) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await deletePostAction(post.id);
      if (!result.ok) setError(result.error ?? "Could not delete the post.");
    });
  }

  return (
    <div className="w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl sm:p-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Posts</h1>
          <p className="text-sm text-neutral-400">
            Signed in as {admin.name}{" "}
            <span className="text-neutral-500">({admin.username})</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800 disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </header>

      {error ? (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {editing ? (
        <PostForm
          key={editing === "new" ? "new" : editing.id}
          post={editing === "new" ? null : editing}
          onCancel={() => setEditing(null)}
          onSaved={() => setEditing(null)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="mb-6 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New post
        </button>
      )}

      <ul className="divide-y divide-neutral-800 border-t border-neutral-800">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-wrap items-center gap-4 py-4 sm:flex-nowrap"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-800 text-neutral-500">
              {post.image ? (
                <img
                  src={post.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {categoryLabel(post.category)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.date}
                </span>
                {post.featured ? (
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent-dark dark:text-accent">
                    Featured
                  </span>
                ) : null}
                {!post.published ? (
                  <span className="rounded-full bg-neutral-700 px-2.5 py-0.5 text-xs font-semibold text-neutral-300">
                    Draft
                  </span>
                ) : null}
              </div>
              <h3 className="mt-1 truncate text-sm font-semibold text-white">
                {post.title}
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setEditing(post)}
                className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                aria-label={`Edit ${post.title}`}
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(post)}
                className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-500/15 hover:text-red-400"
                aria-label={`Delete ${post.title}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {posts.length === 0 ? (
        <p className="py-8 text-center text-sm text-neutral-500">
          No posts yet. Create your first post above.
        </p>
      ) : null}
    </div>
  );
}

function PostForm({
  post,
  onCancel,
  onSaved,
}: {
  post: NewsPost | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const defaultDate =
    post?.dateIso ?? new Date().toISOString().slice(0, 10);
  const currentImage = post?.image ?? null;
  const showExistingImage = Boolean(currentImage) && !removeImage && !preview;
  const imageSrc = preview ?? (showExistingImage ? currentImage : null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    if (!file) {
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (post) formData.set("id", post.id);
    if (removeImage) formData.set("removeImage", "1");

    startTransition(async () => {
      const result = await savePostAction(formData);
      if (result.ok) {
        setError(null);
        onSaved();
      } else {
        setError(result.error ?? "Failed to save the post.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-xl border border-neutral-800 bg-neutral-950/60 p-5"
    >
      <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">
        {post ? "Edit post" : "New post"}
      </h2>

      <div>
        <label htmlFor="admin-title" className={labelCls}>
          Title
        </label>
        <input
          id="admin-title"
          name="title"
          type="text"
          required
          defaultValue={post?.title ?? ""}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="admin-excerpt" className={labelCls}>
          Excerpt
        </label>
        <textarea
          id="admin-excerpt"
          name="excerpt"
          rows={3}
          required
          defaultValue={post?.excerpt ?? ""}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="admin-category" className={labelCls}>
            Category
          </label>
          <select
            id="admin-category"
            name="category"
            defaultValue={post?.category ?? "announcement"}
            className={inputCls}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="admin-date" className={labelCls}>
            Date
          </label>
          <input
            id="admin-date"
            name="date"
            type="date"
            required
            defaultValue={defaultDate}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="admin-readtime" className={labelCls}>
            Read time (min)
          </label>
          <input
            id="admin-readtime"
            name="readTime"
            type="number"
            min={1}
            defaultValue={post?.readTime ?? 4}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="admin-image" className={labelCls}>
          Image (optional)
        </label>
        <input
          id="admin-image"
          name="image"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.gif"
          onChange={handleFileChange}
          className="block w-full text-sm text-neutral-400 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-800 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-neutral-200 hover:file:bg-neutral-700"
        />
        {showExistingImage || preview ? (
          <div className="mt-3 flex items-center gap-3">
            <img
              src={imageSrc ?? undefined}
              alt="Preview"
              className="h-20 w-32 rounded-lg border border-neutral-800 object-cover"
            />
            {currentImage && !preview ? (
              <label className="flex items-center gap-2 text-sm text-neutral-400">
                <input
                  type="checkbox"
                  name="removeImage"
                  checked={removeImage}
                  onChange={(event) => setRemoveImage(event.target.checked)}
                  className="h-4 w-4 rounded border-neutral-600 bg-neutral-900"
                />
                Remove current image
              </label>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={post?.featured ?? false}
            className="h-4 w-4 rounded border-neutral-600 bg-neutral-900"
          />
          Featured (shows as the top story)
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4 rounded border-neutral-600 bg-neutral-900"
          />
          Published (visible on the public site)
        </label>
      </div>

      {error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : null}
          {isPending ? "Saving…" : "Save post"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const labelCls =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400";
