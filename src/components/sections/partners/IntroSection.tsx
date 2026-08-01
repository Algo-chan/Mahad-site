"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function IntroSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader title={t("partners.intro.title")} />
          <FadeIn direction="up" delay={0.2}>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              {t("partners.intro.text")}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
