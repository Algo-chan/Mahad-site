"use client";

import { Award, Globe, GraduationCap, Trophy, Users } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const achievements = [
  {
    icon: GraduationCap,
    titleKey: "home.achievements.graduates",
    textKey: "home.achievements.graduatesDesc",
  },
  {
    icon: Users,
    titleKey: "home.achievements.projects",
    textKey: "home.achievements.projectsDesc",
  },
  {
    icon: Award,
    titleKey: "home.achievements.ranking",
    textKey: "home.achievements.rankingDesc",
  },
  {
    icon: Globe,
    titleKey: "home.achievements.partners",
    textKey: "home.achievements.partnersDesc",
  },
];

export function Achievements() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          title={t("home.achievements.sectionTitle")}
          subtitle={t("home.achievements.sectionSubtitle")}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FadeIn direction="up" className="h-full">
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-lg md:p-10">
              <div
                className="pattern-lattice absolute inset-0 opacity-25"
                aria-hidden="true"
              />
              <span
                className="absolute -end-10 -top-10 h-40 w-40 rounded-full border border-secondary-light/30"
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-12 -start-12 h-48 w-48 rounded-full border border-secondary-light/20"
                aria-hidden="true"
              />
              <span className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 ring-1 ring-secondary-light/40">
                <Trophy
                  className="h-7 w-7 text-secondary-light"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <h3 className="relative font-display text-2xl font-bold md:text-3xl">
                {t("home.achievements.featuredTitle")}
              </h3>
              <p className="relative mt-3 leading-relaxed text-white/85">
                {t("home.achievements.featuredDesc")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {achievements.map((item) => (
              <div
                key={item.titleKey}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-md"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <item.icon
                    className="h-[22px] w-[22px] text-secondary"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-semibold">{t(item.titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {t(item.textKey)}
                </p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
