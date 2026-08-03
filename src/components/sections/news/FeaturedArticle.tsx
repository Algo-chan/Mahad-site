"use client";

import { ArrowRight, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  featured: boolean;
  image?: string;
}

export function FeaturedArticle({ article }: { article: NewsArticle }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white pb-4 pt-8 dark:bg-neutral-950">
      <Container>
        <FadeIn>
          <article className="grid grid-cols-1 overflow-hidden rounded-3xl border border-neutral-200 shadow-lg md:grid-cols-2 dark:border-neutral-800">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="aspect-[4/3] object-cover md:aspect-auto md:h-full"
              />
            ) : (
              <div
                className="flex aspect-[4/3] items-center justify-center bg-primary/20 text-primary md:aspect-auto md:h-full"
                role="img"
                aria-label="Featured Image"
              >
                <ImageIcon className="h-16 w-16 opacity-40" aria-hidden="true" />
              </div>
            )}

            <div className="flex flex-col justify-center bg-white p-6 dark:bg-neutral-950 md:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase text-accent-dark dark:text-accent">
                  {t("news.featured.badge")}
                </span>
                <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {t(`news.categories.${article.category}`)}
                </span>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white md:text-3xl">
                {article.title}
              </h2>
              <p className="mb-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {article.excerpt}
              </p>

              <div className="mb-6 flex items-center gap-4 text-sm text-neutral-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {article.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {article.readTime} {t("news.meta.readTime")}
                </span>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 font-semibold text-primary transition hover:underline"
              >
                {t("news.featured.readMore")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
            </div>
          </article>
        </FadeIn>
      </Container>
    </section>
  );
}
