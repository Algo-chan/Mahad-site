"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface ProjectItem {
  title: string;
  goal: string;
  raised: string;
  percent: number;
  desc: string;
}

export function CurrentProjects() {
  const { t } = useTranslation();
  const items = (t("donate.projects.items") as ProjectItem[]) ?? [];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("donate.projects.title")}
          subtitle={t("donate.projects.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {items.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {project.desc}
              </p>

              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                <div
                  className="relative h-full rounded-full bg-secondary"
                  style={{ width: `${project.percent}%` }}
                >
                  <div className="shimmer absolute inset-0 rounded-full" />
                </div>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="font-semibold text-secondary">
                  {project.raised}
                </span>
                <span className="text-neutral-500">
                  {t("donate.projects.goalLabel")}: {project.goal}
                </span>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                {t("donate.projects.support")}
              </button>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
