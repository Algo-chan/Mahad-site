import type { Metadata } from "next";
import { PageHero } from "@/components/sections/news/PageHero";
import { NewsContent } from "./NewsContent";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Stay connected with the latest news, events, and achievements from MAHAD Al-TOWHEED.",
};

export default function NewsPage() {
  return (
    <div>
      <PageHero />
      <NewsContent />
    </div>
  );
}
