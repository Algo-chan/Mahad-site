"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { FadeIn } from "@/components/animations/FadeIn";

export function HookSection() {
  const { t } = useTranslation();

  return (
    <section className="py-14 md:py-16">
      <FadeIn className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="mb-5 font-display text-2xl font-bold text-primary md:text-3xl">
          {t("home.hook.title")}
        </h2>
        <p className="text-base leading-relaxed text-neutral-600 md:text-lg md:leading-relaxed dark:text-neutral-300">
          {t("home.hook.text")}
        </p>
      </FadeIn>
    </section>
  );
}
