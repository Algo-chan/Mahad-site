"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface ProgramItem {
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
}

export function CommunityPrograms() {
  const { t } = useTranslation();
  const items = (t("impact.programs.items") as ProgramItem[]) ?? [];

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <SectionHeader
          title={t("impact.programs.title")}
          subtitle={t("impact.programs.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {items.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {program.title}
                </h3>
                <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-sm font-bold text-accent-dark dark:text-accent">
                  {program.stat}
                </span>
              </div>
              <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
                {program.desc}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                {program.statLabel}
              </p>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
