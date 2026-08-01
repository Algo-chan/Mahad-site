"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function Subjects() {
  const { t } = useTranslation();
  const subjects = t("academics.subjects.list") as string[];

  return (
    <section className="bg-gradient-to-b from-secondary/5 to-transparent py-16 md:py-24 dark:from-secondary/10">
      <Container>
        <SectionHeader
          title={t("academics.subjects.title")}
          subtitle={t("academics.subjects.subtitle")}
        />

        <StaggerContainer
          staggerDelay={0.05}
          className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3"
        >
          {subjects.map((subject) => (
            <span
              key={subject}
              className="rounded-full border border-neutral-200 bg-white px-6 py-3 font-medium text-neutral-800 shadow-sm transition-colors hover:border-secondary hover:text-secondary dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
            >
              {subject}
            </span>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
