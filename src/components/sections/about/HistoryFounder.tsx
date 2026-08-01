"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function HistoryFounder() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <SectionHeader
              align="left"
              title={t("about.history.title")}
            />
            <StaggerContainer className="mt-6 flex flex-col gap-4">
              <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                {t("about.history.p1")}
              </p>
              <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                {t("about.history.p2")}
              </p>
            </StaggerContainer>
          </div>

          <FadeIn direction="left" className="order-first md:order-2">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <div
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/20 text-2xl font-bold text-secondary"
                role="img"
                aria-label="Founder portrait placeholder"
              >
                F
              </div>
              <span
                className="block font-serif text-6xl leading-none text-primary"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2">
                <p className="text-xl italic leading-relaxed text-neutral-800 dark:text-neutral-200 md:text-2xl">
                  {t("about.founder.quote")}
                </p>
                <cite className="mt-6 block font-semibold not-italic text-primary">
                  {t("about.founder.name")}
                </cite>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
