import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/impact/CtaBanner";
import { CommunityPrograms } from "@/components/sections/impact/CommunityPrograms";
import { PageHero } from "@/components/sections/impact/PageHero";
import { PartnerTestimonials } from "@/components/sections/impact/PartnerTestimonials";
import { StatsGrid } from "@/components/sections/impact/StatsGrid";
import { SuccessStories } from "@/components/sections/impact/SuccessStories";

export const metadata: Metadata = {
  title: "Our Impact",
};

export default function ImpactPage() {
  return (
    <div>
      <PageHero />
      <StatsGrid />
      <SuccessStories />
      <CommunityPrograms />
      <PartnerTestimonials />
      <CtaBanner />
    </div>
  );
}
