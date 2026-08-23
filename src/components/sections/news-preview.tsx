"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Building2, Calendar, CalendarHeart, Newspaper } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import newsItems from "@/data/news.json";
import { useTranslation } from "@/hooks/useTranslation";

const categoryIcons: Record<string, typeof Newspaper> = {
  Facility: Building2,
  Event: CalendarHeart,
  Program: BookOpen,
};

export function NewsPreview() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          title={t("home.news.sectionTitle")}
          subtitle={t("home.news.sectionSubtitle")}
        />

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {newsItems.map((item) => {
            const CategoryIcon = categoryIcons[item.category] ?? Newspaper;
            return (
              <Link
                key={item.id}
                href="/news"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-secondary-light/10 to-accent/10">
                  <span
                    className="pattern-lattice-emerald absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span
                    className="relative flex h-16 w-16 items-center justify-center rounded-full bg-card/80 shadow-sm ring-1 ring-secondary-light/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <CategoryIcon
                      className="h-7 w-7 text-secondary-dark dark:text-secondary-light"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="absolute start-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-3 dark:text-neutral-400">
                    {item.excerpt}
                  </p>
                  <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-neutral-500">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {item.date}
                  </p>
                </div>
              </Link>
            );
          })}
        </StaggerContainer>

        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-light hover:underline"
          >
            {t("home.news.viewAll")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
