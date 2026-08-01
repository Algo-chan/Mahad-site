"use client";

import { Award, HandHeart, Mic, Trophy } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const icons = [Award, Mic, HandHeart, Trophy];

export function StudentDevelopment() {
  const { t } = useTranslation();
  const items = t("academics.development.items") as {
    title: string;
    desc: string;
  }[];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("academics.development.title")}
          subtitle={t("academics.development.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center transition-colors hover:border-primary/50 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
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
