import type { Metadata } from "next";
import { CharacterDevelopment } from "@/components/sections/religious/CharacterDevelopment";
import { CtaBanner } from "@/components/sections/religious/CtaBanner";
import { CurriculumPillars } from "@/components/sections/religious/CurriculumPillars";
import { Objectives } from "@/components/sections/religious/Objectives";
import { Outcomes } from "@/components/sections/religious/Outcomes";
import { Overview } from "@/components/sections/religious/Overview";
import { PageHero } from "@/components/sections/religious/PageHero";
import { ProgramLevels } from "@/components/sections/religious/ProgramLevels";

export const metadata: Metadata = {
  title: "Religious Education",
};

export default function ReligiousPage() {
  return (
    <>
      <PageHero />
      <Overview />
      <ProgramLevels />
      <CurriculumPillars />
      <Objectives />
      <Outcomes />
      <CharacterDevelopment />
      <CtaBanner />
    </>
  );
}
