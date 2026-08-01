"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import newsItems from "@/data/news.json";
import { useTranslation } from "@/hooks/useTranslation";

export function NewsPreview() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 dark:bg-neutral-950 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          title={t("home.news.sectionTitle")}
          subtitle={t("home.news.sectionSubtitle")}
        />

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href="/news"
              className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div
                role="img"
                aria-label="News image placeholder"
                className="flex aspect-video items-center justify-center rounded-t-2xl bg-neutral-200 text-sm text-neutral-400 dark:bg-neutral-800"
              />
              <div className="flex flex-1 flex-col p-6">
                <span className="self-start rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase text-accent-dark dark:text-accent">
                  {item.category}
                </span>
                <h3 className="mt-3 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-neutral-600 dark:text-neutral-400">
                  {item.excerpt}
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {item.date}
                </p>
              </div>
            </Link>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            {t("home.news.viewAll")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
