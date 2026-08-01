"use client";

import { Eye, Target } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface Value {
  title: string;
  desc: string;
}

export function VisionMissionValues() {
  const { t } = useTranslation();
  const values = t("about.values.items") as Value[];

  return (
    <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24 dark:from-primary/10">
      <Container>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <FadeIn className="h-full">
            <article className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <Eye className="mb-4 h-10 w-10 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                {t("about.vision.title")}
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t("about.vision.text")}
              </p>
            </article>
          </FadeIn>

          <FadeIn className="h-full">
            <article className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <Target className="mb-4 h-10 w-10 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                {t("about.mission.title")}
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t("about.mission.text")}
              </p>
            </article>
          </FadeIn>
        </div>

        <SectionHeader
          title={t("about.values.title")}
          className="mt-16"
        />

        <StaggerContainer
          staggerDelay={0.1}
          className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-xl border border-neutral-200 bg-white p-6 text-center transition-colors hover:border-secondary/50 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                {value.title}
              </h4>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {value.desc}
              </p>
            </article>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
