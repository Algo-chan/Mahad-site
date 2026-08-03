import type { Metadata } from "next";
import { CurrentProjects } from "@/components/sections/donate/CurrentProjects";
import { DonationMethods } from "@/components/sections/donate/DonationMethods";
import { FinalCta } from "@/components/sections/donate/FinalCta";
import { FundUsage } from "@/components/sections/donate/FundUsage";
import { HowToDonate } from "@/components/sections/donate/HowToDonate";
import { PageHero } from "@/components/sections/donate/PageHero";
import { Transparency } from "@/components/sections/donate/Transparency";
import { WhyGive } from "@/components/sections/donate/WhyGive";

export const metadata: Metadata = {
  title: "Donate",
};

export default function DonatePage() {
  return (
    <div>
      <PageHero />
      <WhyGive />
      <FundUsage />
      <HowToDonate />
      <CurrentProjects />
      <DonationMethods />
      <Transparency />
      <FinalCta />
    </div>
  );
}
