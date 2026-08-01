import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/academics/CtaBanner";
import { Methodology } from "@/components/sections/academics/Methodology";
import { Overview } from "@/components/sections/academics/Overview";
import { PageHero } from "@/components/sections/academics/PageHero";
import { ProgramLevels } from "@/components/sections/academics/ProgramLevels";
import { StudentDevelopment } from "@/components/sections/academics/StudentDevelopment";
import { Subjects } from "@/components/sections/academics/Subjects";

export const metadata: Metadata = {
  title: "Academic Programs",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHero />
      <Overview />
      <ProgramLevels />
      <Methodology />
      <Subjects />
      <StudentDevelopment />
      <CtaBanner />
    </>
  );
}
