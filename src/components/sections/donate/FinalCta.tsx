"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-accent py-20 md:py-28">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              {t("donate.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
              {t("donate.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <Link
              href="#donate-methods"
              className="mt-10 inline-block w-full rounded-full bg-white px-12 py-5 text-xl font-bold text-accent-dark shadow-2xl transition hover:scale-105 active:scale-95 sm:w-auto"
            >
              {t("donate.cta.button")}
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
