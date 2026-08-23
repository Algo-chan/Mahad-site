"use client";

import { BookOpen, Eye, Heart } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const cards = [
  {
    icon: BookOpen,
    titleKey: "home.missionCards.missionTitle",
    textKey: "home.missionCards.missionText",
  },
  {
    icon: Eye,
    titleKey: "home.missionCards.visionTitle",
    textKey: "home.missionCards.visionText",
  },
  {
    icon: Heart,
    titleKey: "home.missionCards.valuesTitle",
    textKey: "home.missionCards.valuesText",
  },
];

export function MissionCards() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          title={t("home.missionCards.sectionTitle")}
          subtitle={t("home.missionCards.sectionSubtitle")}
        />

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {cards.map((card) => (
            <div
              key={card.titleKey}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary-light/60 hover:shadow-xl"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary-light to-accent transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 ring-1 ring-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <card.icon
                  className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <h3 className="text-xl font-semibold">{t(card.titleKey)}</h3>
              <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
                {t(card.textKey)}
              </p>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
