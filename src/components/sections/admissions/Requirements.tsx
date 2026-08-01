"use client";

import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const cards = [
  { key: "academic", accent: "text-primary" },
  { key: "religious", accent: "text-secondary" },
] as const;

export function Requirements() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("admissions.requirements.title")}
          subtitle={t("admissions.requirements.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map(({ key, accent }) => {
            const items = t(`admissions.requirements.${key}.items`) as string[];
            return (
              <article
                key={key}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 md:p-8"
              >
                <h3 className={`mb-4 text-xl font-bold ${accent}`}>
                  {t(`admissions.requirements.${key}.title`)}
                </h3>
                <ul>
                  {items.map((item) => (
                    <li
                      key={item}
                      className="mb-3 flex items-start gap-3"
                    >
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {item}
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
