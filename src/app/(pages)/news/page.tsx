import type { Metadata } from "next";
import { PageHero } from "@/components/sections/news/PageHero";
import { getPublishedPosts } from "@/lib/store";
import { NewsContent } from "./NewsContent";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Stay connected with the latest news, events, and achievements from MAHAD Al-TOWHEED.",
};

// Read the live post store on every request so admin edits appear instantly.
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getPublishedPosts();

  return (
    <div>
      <PageHero />
      <NewsContent articles={posts} />
    </div>
  );
}
