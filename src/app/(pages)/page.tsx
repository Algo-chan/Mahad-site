import type { Metadata } from "next";
import { Achievements } from "@/components/sections/achievements";
import { DonateBanner } from "@/components/sections/donate-banner";
import { Hero } from "@/components/sections/hero";
import { HookSection } from "@/components/sections/hook-section";
import { Introduction } from "@/components/sections/introduction";
import { MissionCards } from "@/components/sections/mission-cards";
import { NewsPreview } from "@/components/sections/news-preview";
import { Pillars } from "@/components/sections/pillars";
import { QuickStats } from "@/components/sections/quick-stats";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: {
    absolute: "MAHAD Al-TOWHEED | Islamic School Shashemane Ethiopia | Donate & Enroll",
  },
  description: "MAHAD Al-TOWHEED is a non-profit Islamic school in Bulchana, Shashemane, West Arsi Zone, Oromia, Ethiopia. We offer academic programs (KG–Grade 10) and religious education (Grade 1–12) to 1000+ students. Donate or enroll today.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HookSection />
      <QuickStats />
      <Introduction />
      <Pillars />
      <MissionCards />
      <Achievements />
      <Testimonials />
      <NewsPreview />
      <DonateBanner />
    </>
  );
}
