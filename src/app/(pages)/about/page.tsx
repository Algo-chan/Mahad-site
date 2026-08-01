import type { Metadata } from "next";
import { HistoryFounder } from "@/components/sections/about/HistoryFounder";
import { PageHero } from "@/components/sections/about/PageHero";
import { Philosophy } from "@/components/sections/about/Philosophy";
import { Timeline } from "@/components/sections/about/Timeline";
import { VisionMissionValues } from "@/components/sections/about/VisionMissionValues";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <HistoryFounder />
      <Timeline />
      <Philosophy />
      <VisionMissionValues />
    </>
  );
}
