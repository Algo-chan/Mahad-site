"use client";

import { BookOpen, Heart, Scale, ScrollText } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const icons = [BookOpen, ScrollText, Scale, Heart];

export function CurriculumPillars() {
  const { t } = useTranslation();
  const items = t("religious.curriculum.items") as {
    title: string;
    desc: string;
  }[];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("religious.curriculum.title")}
          subtitle={t("religious.curriculum.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
