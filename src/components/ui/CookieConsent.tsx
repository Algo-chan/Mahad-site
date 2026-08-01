"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const STORAGE_KEY = "cookie-consent";

type ConsentValue = "accepted" | "declined" | null;

const consentListeners = new Set<() => void>();

function getConsentSnapshot(): ConsentValue {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") {
      return stored;
    }
  } catch {
    // localStorage unavailable; treat as not yet answered
  }
  return null;
}

function getConsentServerSnapshot(): ConsentValue {
  return "declined";
}

function subscribeConsent(onChange: () => void) {
  consentListeners.add(onChange);
  return () => {
    consentListeners.delete(onChange);
  };
}

function updateConsent(value: "accepted" | "declined") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage unavailable; consent still applies for the session
  }
  consentListeners.forEach((listener) => listener());
}

export function CookieConsent() {
  const { t } = useTranslation();
  const consent = React.useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  const showBanner = consent === null;

  return (
    <AnimatePresence>
      {showBanner ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white px-4 py-4 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 md:px-8 md:py-5"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {t("cookies.message")}
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => updateConsent("declined")}
                className="rounded-full bg-transparent px-4 py-2 text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {t("cookies.decline")}
              </button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateConsent("accepted")}
              >
                {t("cookies.accept")}
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
