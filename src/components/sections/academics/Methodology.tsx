"use client";

import { BookOpen, ClipboardCheck, Heart, Users } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const icons = [BookOpen, Users, ClipboardCheck, Heart];

export function Methodology() {
  const { t } = useTranslation();
  const items = t("academics.methodology.items") as {
    title: string;
    desc: string;
  }[];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("academics.methodology.title")}
          subtitle={t("academics.methodology.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
