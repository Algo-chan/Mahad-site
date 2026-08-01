"use client";

import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const TABS = ["all", "announcements", "events", "achievements", "charity"] as const;

export type NewsTab = (typeof TABS)[number];

export function CategoryTabs({
  active,
  onChange,
}: {
  active: NewsTab;
  onChange: (tab: NewsTab) => void;
}) {
  const { t } = useTranslation();

  return (
    <section className="bg-white dark:bg-neutral-950">
      <Container>
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
          {TABS.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onChange(tab)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-white shadow"
                    : "border border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
                }`}
              >
                {t(`news.tabs.${tab}`)}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
