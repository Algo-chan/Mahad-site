"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function HookSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-12 dark:bg-neutral-950 md:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white md:text-2xl">
          {t("home.hook.title")}
        </h2>
        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
          {t("home.hook.text")}
        </p>
      </div>
    </section>
  );
}
