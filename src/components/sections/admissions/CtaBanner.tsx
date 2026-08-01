"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="bg-primary py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {t("admissions.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {t("admissions.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <a
              href="#"
              className="mt-8 inline-block w-full rounded-full bg-accent px-10 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-accent-dark sm:w-auto"
            >
              {t("admissions.cta.button")}
            </a>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <p className="mt-4 text-sm text-white/70">
              {t("admissions.cta.contact")}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
