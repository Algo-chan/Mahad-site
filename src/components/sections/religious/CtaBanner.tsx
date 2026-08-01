"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {t("religious.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {t("religious.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <Link
              href="/donate"
              className="mt-8 inline-block w-full rounded-full bg-white px-10 py-4 text-lg font-bold text-secondary-dark transition hover:scale-105 sm:w-auto"
            >
              {t("religious.cta.button")}
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
