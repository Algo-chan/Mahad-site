"use client";

import * as React from "react";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

export type Locale = "en" | "ar";

type Dictionary = Record<string, unknown>;

const dictionaries: Record<Locale, Dictionary> = { en, ar };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- resolves to strings, arrays, or objects
  t: (key: string) => any;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "locale";

const localeListeners = new Set<() => void>();

function getLocaleSnapshot(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ar") {
      return saved;
    }
  } catch {
    // localStorage unavailable; fall back to default locale
  }
  return "en";
}

function getLocaleServerSnapshot(): Locale {
  return "en";
}

function subscribeLocale(onChange: () => void) {
  localeListeners.add(onChange);
  return () => {
    localeListeners.delete(onChange);
  };
}

function updateLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage unavailable; locale still applied for the session
  }
  localeListeners.forEach((listener) => listener());
}

function resolve(dictionary: Dictionary, key: string): unknown {
  const value = key.split(".").reduce<unknown>(
    (acc, part) =>
      acc && typeof acc === "object"
        ? (acc as Record<string, unknown>)[part]
        : undefined,
    dictionary
  );
  return value === undefined || value === null ? key : value;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );

  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = React.useCallback((next: Locale) => {
    updateLocale(next);
  }, []);

  const t = React.useCallback(
    (key: string) => resolve(dictionaries[locale], key),
    [locale]
  );

  const value = React.useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
