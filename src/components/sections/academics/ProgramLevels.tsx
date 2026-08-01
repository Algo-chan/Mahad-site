"use client";

import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const levels = [
  { key: "kindergarten" },
  { key: "primary" },
  { key: "intermediate" },
];

export function ProgramLevels() {
  const { t } = useTranslation();

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <SectionHeader
          title={t("academics.levels.title")}
          subtitle={t("academics.levels.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {levels.map(({ key }) => {
            const features = t(`academics.levels.${key}.features`) as string[];
            return (
              <article
                key={key}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 md:p-8"
              >
                <div className="mb-4 flex flex-col items-start gap-2">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                    {t(`academics.levels.${key}.grades`)}
                  </span>
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {t(`academics.levels.${key}.age`)}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
                  {t(`academics.levels.${key}.title`)}
                </h3>
                <p className="mb-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {t(`academics.levels.${key}.description`)}
                </p>

                <ul>
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="mb-2 flex items-start gap-3"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
