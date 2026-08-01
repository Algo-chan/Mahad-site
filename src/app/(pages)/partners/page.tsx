import type { Metadata } from "next";
import { IntroSection } from "@/components/sections/partners/IntroSection";
import { PageHero } from "@/components/sections/partners/PageHero";
import { PartnersGrid } from "@/components/sections/partners/PartnersGrid";
import { JoinCta } from "@/components/sections/partners/JoinCta";

export const metadata: Metadata = {
  title: "Partners",
};

export default function PartnersPage() {
  return (
    <div>
      <PageHero />
      <IntroSection />
      <PartnersGrid />
      <JoinCta />
    </div>
  );
}
