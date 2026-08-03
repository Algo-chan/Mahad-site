import type { Metadata } from "next";
import { Achievements } from "@/components/sections/achievements";
import { DonateBanner } from "@/components/sections/donate-banner";
import { Hero } from "@/components/sections/hero";
import { HookSection } from "@/components/sections/hook-section";
import { Introduction } from "@/components/sections/introduction";
import { MissionCards } from "@/components/sections/mission-cards";
import { NewsPreview } from "@/components/sections/news-preview";
import { QuickStats } from "@/components/sections/quick-stats";
import { Testimonials } from "@/components/sections/testimonials";
import { getPublishedPosts } from "@/lib/store";

export const metadata: Metadata = {
  title: {
    absolute: "MAHAD Al-TOWHEED | Islamic School Shashemane Ethiopia | Donate & Enroll",
  },
  description: "MAHAD Al-TOWHEED is a non-profit Islamic school in Shashemane , bulchana, Ethiopia. We offer academic programs (KG–Grade 10) and religious education (Grade 1–12) to 500+ students. Donate or enroll today.",
};

// Render fresh so newly published posts appear without a redeploy.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Hero />
      <HookSection />
      <QuickStats />
      <Introduction />
      <MissionCards />
      <Achievements />
      <Testimonials />
      <NewsPreview items={posts.slice(0, 3)} />
      <DonateBanner />
    </>
  );
}
