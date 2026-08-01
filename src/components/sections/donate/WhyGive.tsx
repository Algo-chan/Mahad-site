"use client";

import { GraduationCap, Heart, Users } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface WhyCard {
  title: string;
  desc: string;
  icon: string;
}

const ICONS: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Heart,
  Users,
};

export function WhyGive() {
  const { t } = useTranslation();
  const cards = (t("donate.why.cards") as WhyCard[]) ?? [];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("donate.why.title")}
          subtitle={t("donate.why.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = ICONS[card.icon] ?? GraduationCap;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg md:p-8 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
