"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function PageHero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center">
        <FadeIn>
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            {t("about.pageTitle")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {t("about.heroSubtitle")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
