"use client";

import type { Locale } from "@/components/providers/I18nProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ar", label: "عربي" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 rounded-full bg-neutral-200 p-1"
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
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-white"
                : "text-neutral-600 hover:text-neutral-800"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
