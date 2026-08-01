"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import searchIndex from "@/data/search-index.json";

interface SearchEntry {
  title: string;
  path: string;
  excerpt: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

function SearchContent({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const entries = searchIndex as SearchEntry[];

  React.useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, []);

  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? entries.filter((entry) =>
        `${entry.title} ${entry.excerpt}`.toLowerCase().includes(normalized),
      )
    : [];

  return (
    <>
      <div className="relative">
        <Search
          className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full rounded-t-2xl border-b border-neutral-200 bg-white px-5 py-4 ps-12 pe-12 text-lg text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label={t("search.close")}
          className="absolute end-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto rounded-b-2xl">
        {normalized === "" ? (
          <p className="px-5 py-4 text-sm text-neutral-500">
            {t("search.shortcut")}
          </p>
        ) : results.length === 0 ? (
          <p className="px-5 py-8 text-center text-neutral-500">
            {t("search.noResults")}
          </p>
        ) : (
          results.map((entry) => (
            <Link
              key={entry.path}
              href={entry.path}
              onClick={onClose}
              className="flex items-center gap-4 border-b border-neutral-100 px-5 py-3 transition last:border-0 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-neutral-900 dark:text-white">
                  {entry.title}
                </p>
                <p className="truncate text-sm text-neutral-500">
                  {entry.excerpt}
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-neutral-400 rtl:rotate-180"
                aria-hidden="true"
              />
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t("search.placeholder")}
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-950"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <SearchContent onClose={onClose} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
