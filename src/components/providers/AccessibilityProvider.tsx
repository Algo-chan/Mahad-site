"use client";

import * as React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface AccessibilityContextValue {
  prefersReducedMotion: boolean;
}

const AccessibilityContext = React.createContext<AccessibilityContextValue | null>(
  null
);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const handleSkipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const main = document.getElementById("main-content");
    if (!main) return;
    main.focus();
    main.scrollIntoView();
  };

  const value = React.useMemo(
    () => ({ prefersReducedMotion }),
    [prefersReducedMotion]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:ring-2 focus:ring-white"
      >
        {t("a11y.skipToMain")}
      </a>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = React.useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
