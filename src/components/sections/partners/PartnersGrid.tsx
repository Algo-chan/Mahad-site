"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface Partner {
  name: string;
  category: string;
  description: string;
}

type PartnerCategory = "all" | "international" | "local" | "government" | "corporate";

const CATEGORIES: PartnerCategory[] = [
  "all",
  "international",
  "local",
  "government",
  "corporate",
];

const CATEGORY_COLORS: Record<string, string> = {
  international: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  local: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  government: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  corporate: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const { t } = useTranslation();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8 dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-xl bg-neutral-100 text-xs font-bold uppercase text-neutral-400 dark:bg-neutral-800">
        {partner.name.slice(0, 2)}
      </div>

      <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">
        {partner.name}
      </h3>

      <span
        className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
          CATEGORY_COLORS[partner.category] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
        }`}
      >
        {t(`partners.categories.${partner.category}`)}
      </span>

      <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {partner.description}
      </p>
    </motion.div>
  );
}

export function PartnersGrid() {
  const { t } = useTranslation();
  const [active, setActive] = useState<PartnerCategory>("all");

  const partners = (t("partners.partnersList") as Partner[]) ?? [];
  const visible =
    active === "all" ? partners : partners.filter((p) => p.category === active);

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-white shadow"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                }`}
              >
                {t(`partners.categories.${category}`)}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-lg font-semibold text-neutral-500 dark:text-neutral-400">
            {t("partners.empty")}
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((partner, index) => (
                <PartnerCard key={partner.name} partner={partner} index={index} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </Container>
    </section>
  );
}
