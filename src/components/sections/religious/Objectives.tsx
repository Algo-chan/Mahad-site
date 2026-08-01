"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function Objectives() {
  const { t } = useTranslation();
  const objectives = t("religious.objectives.list") as string[];

  return (
    <section className="bg-gradient-to-b from-secondary/5 to-transparent py-16 md:py-24 dark:from-secondary/10">
      <Container>
        <SectionHeader
          title={t("religious.objectives.title")}
          subtitle={t("religious.objectives.subtitle")}
        />

        <StaggerContainer className="mx-auto mt-12 max-w-3xl">
          {objectives.map((objective, index) => (
            <div
              key={objective}
              className="flex items-start gap-4 border-b border-neutral-200 py-4 last:border-0 dark:border-neutral-800"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-lg text-neutral-800 dark:text-neutral-200">
                {objective}
              </p>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
