"use client";

import { Lightbulb } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function Philosophy() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <Lightbulb
              className="mx-auto mb-6 h-8 w-8 text-accent"
              aria-hidden="true"
            />
          </FadeIn>
          <SectionHeader title={t("about.philosophy.title")} />
          <FadeIn delay={0.2}>
            <p className="mt-6 text-xl font-light leading-relaxed text-neutral-700 md:text-2xl dark:text-neutral-300">
              {t("about.philosophy.text")}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
