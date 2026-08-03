import type { Metadata } from "next";
import { getCurrentAdmin } from "@/lib/auth";
import { getPosts } from "@/lib/store";
import { AdminPanel } from "@/components/admin/admin-panel";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

// Always render fresh so the panel reflects the latest data without a rebuild.
export const dynamic = "force-dynamic";

export default async function HeadPage() {
  const admin = await getCurrentAdmin();
  const posts = await getPosts();

  // Never serialize the password hash (or any sensitive field) to the client.
  const safeAdmin = admin
    ? { id: admin.id, username: admin.username, name: admin.name }
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-4 text-neutral-100">
      {safeAdmin ? (
        <AdminPanel admin={safeAdmin} posts={posts} />
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
