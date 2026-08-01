"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export function Timeline() {
  const { t } = useTranslation();
  const milestones = t("about.timeline.milestones") as Milestone[];

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <SectionHeader
          title={t("about.timeline.title")}
          subtitle={t("about.timeline.subtitle")}
        />

        <div className="relative mt-14 flex flex-col gap-10 md:gap-14">
          <div
            className="absolute inset-y-0 start-0 border-s-2 border-primary md:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 start-1/2 hidden w-px -translate-x-1/2 bg-neutral-300 dark:bg-neutral-700 md:block"
            aria-hidden="true"
          />

          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <FadeIn
                key={milestone.year}
                delay={index * 0.1}
                className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10"
              >
                <span
                  className="absolute start-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary md:hidden"
                  aria-hidden="true"
                />

                <div
                  className={cn(
                    "ps-8",
                    isEven
                      ? "md:col-start-1 md:ps-0 md:pe-10 md:text-end"
                      : "md:col-start-3 md:ps-10 md:text-start"
                  )}
                >
                  <article className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 md:p-6">
                    <div className="text-2xl font-bold text-primary">
                      {milestone.year}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                      {milestone.desc}
                    </p>
                  </article>
                </div>

                <span
                  className="hidden md:col-start-2 md:flex md:justify-center"
                  aria-hidden="true"
                >
                  <span className="z-10 h-4 w-4 rounded-full border-4 border-white bg-primary dark:border-neutral-900" />
                </span>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
