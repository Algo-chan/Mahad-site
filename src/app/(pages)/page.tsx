import { Achievements } from "@/components/sections/achievements";
import { DonateBanner } from "@/components/sections/donate-banner";
import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";
import { MissionCards } from "@/components/sections/mission-cards";
import { NewsPreview } from "@/components/sections/news-preview";
import { QuickStats } from "@/components/sections/quick-stats";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickStats />
      <Introduction />
      <MissionCards />
      <Achievements />
      <Testimonials />
      <NewsPreview />
      <DonateBanner />
    </>
  );
}
