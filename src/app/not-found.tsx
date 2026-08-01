"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-primary/20">404</p>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
        {t("notFound.title")}
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        {t("notFound.subtitle")}
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary-dark"
      >
        {t("notFound.button")}
      </Link>
    </div>
  );
}
