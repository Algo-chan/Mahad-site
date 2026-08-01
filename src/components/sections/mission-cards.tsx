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
    <section className="bg-white py-16 dark:bg-neutral-950 md:py-24">
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
              className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <card.icon
                className="mb-4 h-12 w-12 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold">{t(card.titleKey)}</h3>
              <p className="mt-2 text-neutral-600 leading-relaxed dark:text-neutral-300">
                {t(card.textKey)}
              </p>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
