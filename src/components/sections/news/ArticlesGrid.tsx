"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, FileX, Image as ImageIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";
import type { NewsArticle } from "./FeaturedArticle";

const CATEGORY_COLORS: Record<string, string> = {
  announcement: "bg-primary/10 text-primary",
  event: "bg-accent/10 text-accent",
  achievement: "bg-secondary/10 text-secondary",
  charity: "bg-purple-500/10 text-purple-500",
};

function ArticleCard({ article, index }: { article: NewsArticle; index: number }) {
  const { t } = useTranslation();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div
        className="flex aspect-[16/9] items-center justify-center bg-primary/15 text-primary"
        role="img"
        aria-label="Article Image"
      >
        <ImageIcon className="h-12 w-12 opacity-40" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
              CATEGORY_COLORS[article.category] ?? "bg-primary/10 text-primary"
            }`}
          >
            {t(`news.categories.${article.category}`)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {article.date}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">
          {article.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readTime} {t("news.meta.readTime")}
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:underline"
          >
            {t("news.featured.readMore")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ArticlesGrid({ articles }: { articles: NewsArticle[] }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 dark:bg-neutral-950 md:py-24">
      <Container>
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 py-20 text-center dark:border-neutral-700">
            <FileX className="mb-4 h-12 w-12 text-neutral-400" aria-hidden="true" />
            <p className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">
              {t("news.noResults")}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </Container>
    </section>
  );
}
