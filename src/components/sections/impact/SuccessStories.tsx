"use client";

import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface StoryItem {
  name: string;
  role: string;
  quote: string;
  background: string;
}

export function SuccessStories() {
  const { t } = useTranslation();
  const items = (t("impact.stories.items") as StoryItem[]) ?? [];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("impact.stories.title")}
          subtitle={t("impact.stories.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {items.map((story) => (
            <div
              key={story.name}
              className="relative flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Quote
                className="absolute top-6 h-8 w-8 text-primary/30 ltr:left-6 rtl:right-6"
                aria-hidden="true"
              />

              <blockquote className="pt-8 pb-4 text-lg italic leading-relaxed text-neutral-700 dark:text-neutral-300">
                {story.quote}
              </blockquote>

              <div className="my-4 border-t border-neutral-200 dark:border-neutral-800" />

              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {story.background}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-bold text-neutral-900 dark:text-white">
                    {story.name}
                  </p>
                  <p className="text-sm text-neutral-500">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
