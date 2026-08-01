"use client";

import { CountUp } from "@/components/animations/CountUp";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export function StatsGrid() {
  const { t } = useTranslation();
  const items = (t("impact.stats.items") as StatItem[]) ?? [];

  return (
    <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24 dark:from-primary/10">
      <Container>
        <SectionHeader
          title={t("impact.stats.title")}
          subtitle={t("impact.stats.subtitle")}
        />

        <StaggerContainer
          staggerDelay={0.1}
          className="mt-12 grid grid-cols-2 gap-6 md:mt-16 md:grid-cols-3"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <CountUp
                end={item.value}
                suffix={item.suffix}
                duration={2.5}
                className="text-3xl font-bold tabular-nums text-primary sm:text-4xl md:text-5xl"
              />
              <p className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
