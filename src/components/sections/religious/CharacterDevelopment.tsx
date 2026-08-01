"use client";

import { Quote } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function CharacterDevelopment() {
  const { t } = useTranslation();

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <FadeIn className="order-2 md:order-1">
            <SectionHeader
              align="left"
              title={t("religious.character.title")}
              subtitle={t("religious.character.subtitle")}
            />
            <p className="mt-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              {t("religious.character.text")}
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="order-first md:order-2">
            <div className="relative">
              <div
                className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-secondary/20 text-secondary"
                role="img"
                aria-label="Students in Religious Class"
              >
                <Quote className="h-16 w-16 opacity-40" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-6 -start-6 w-2/3 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
                <Quote
                  className="mb-2 h-5 w-5 text-secondary"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {t("religious.character.quote")}
                </p>
                <p className="mt-2 text-xs text-neutral-500">
                  — {t("religious.character.attribution")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
