"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";
import { useTranslation } from "@/hooks/useTranslation";

export function ScrollToTop() {
  const { t } = useTranslation();
  const { prefersReducedMotion } = useAccessibility();
  const [visible, setVisible] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY > 400;
  });

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label={t("a11y.scrollToTop")}
          className="fixed bottom-6 end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-110 hover:bg-primary-dark"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <ArrowUp className="h-6 w-6" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
