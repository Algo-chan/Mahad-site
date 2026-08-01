"use client";

import type { Locale } from "@/components/providers/I18nProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ar", label: "عربي" },
];

export function LanguageSwitcher({
  isScrolled = false,
}: {
  isScrolled?: boolean;
}) {
  const { locale, setLocale } = useTranslation();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "flex items-center gap-1 rounded-full p-1 transition-colors duration-300",
        isScrolled
          ? "bg-neutral-200 dark:bg-neutral-800"
          : "bg-white/20"
      )}
    >
      {locales.map(({ code, label }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2 py-1 text-xs font-bold transition-colors duration-300 sm:px-3",
              active
                ? isScrolled
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
                : isScrolled
                  ? "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                  : "text-white hover:text-white/90"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
