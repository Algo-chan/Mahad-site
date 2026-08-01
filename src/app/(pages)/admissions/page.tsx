import type { Metadata } from "next";
import { Calendar } from "@/components/sections/admissions/Calendar";
import { CtaBanner } from "@/components/sections/admissions/CtaBanner";
import { Documents } from "@/components/sections/admissions/Documents";
import { Faq } from "@/components/sections/admissions/Faq";
import { PageHero } from "@/components/sections/admissions/PageHero";
import { Process } from "@/components/sections/admissions/Process";
import { Requirements } from "@/components/sections/admissions/Requirements";
import { Tuition } from "@/components/sections/admissions/Tuition";

export const metadata: Metadata = {
  title: "Admissions",
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero />
      <Requirements />
      <Process />
      <Documents />
      <Calendar />
      <Tuition />
      <Faq />
      <CtaBanner />
    </>
  );
}
