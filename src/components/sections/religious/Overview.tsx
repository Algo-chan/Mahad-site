"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function Overview() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("religious.overview.title")}
          subtitle={t("religious.overview.subtitle")}
        />
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            {t("religious.overview.text")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
