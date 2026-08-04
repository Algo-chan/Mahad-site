"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function PageHero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <img
        src="/images/gallery/gallery-3.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="up">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              {t("academics.pageTitle")}
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
              {t("academics.heroSubtitle")}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
