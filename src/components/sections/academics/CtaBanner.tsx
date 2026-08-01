"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="bg-primary py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {t("academics.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {t("academics.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <Button href="/admissions" size="lg" className="mt-8 w-full sm:w-auto">
              {t("academics.cta.button")}
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
