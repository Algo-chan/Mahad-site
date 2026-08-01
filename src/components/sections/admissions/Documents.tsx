"use client";

import { FileText, Info } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function Documents() {
  const { t } = useTranslation();
  const checklist = t("admissions.documents.checklist") as string[];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("admissions.documents.title")}
          subtitle={t("admissions.documents.subtitle")}
        />

        <StaggerContainer className="mx-auto mt-12 max-w-3xl">
          <ul className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-neutral-200 py-3 last:border-0 dark:border-neutral-800"
              >
                <FileText
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-neutral-800 dark:text-neutral-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/10 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-sm text-accent-dark dark:text-accent">
              {t("admissions.documents.note")}
            </p>
          </div>
        </StaggerContainer>
      </Container>
    </section>
  );
}
