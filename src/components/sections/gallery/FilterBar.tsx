"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export const galleryCategories = [
  "all",
  "campus",
  "students",
  "teachers",
  "classrooms",
  "labs",
  "events",
  "religious",
  "graduation",
  "community",
];

export function FilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white pb-4 pt-8 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
          {galleryCategories.map((category) => {
            const active = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onFilterChange(category)}
                aria-pressed={active}
                className={cn(
                  "min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                {t(`gallery.filter.${category}`)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
