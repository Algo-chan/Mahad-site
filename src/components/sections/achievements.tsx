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
    <section className="bg-white py-16 dark:bg-neutral-950 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          title={t("home.achievements.sectionTitle")}
          subtitle={t("home.achievements.sectionSubtitle")}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FadeIn direction="up" className="h-full">
            <div className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white md:p-10">
              <Trophy className="mb-4 h-10 w-10" aria-hidden="true" />
              <h3 className="text-2xl font-bold md:text-3xl">
                {t("home.achievements.featuredTitle")}
              </h3>
              <p className="mt-3 leading-relaxed text-white/90">
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
                className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-colors hover:border-secondary/50 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <item.icon
                  className="mb-4 h-8 w-8 text-secondary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
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
