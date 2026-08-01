"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export function StickyDonateBar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/donate")) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden dark:border-neutral-800 dark:bg-neutral-950/95"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              <Heart
                className="h-4 w-4 shrink-0 text-accent"
                fill="currentColor"
                aria-hidden="true"
              />
              {t("donate.cta.title")}
            </p>
            <Button href="/donate" size="sm" className="shrink-0">
              {t("nav.donate")}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
