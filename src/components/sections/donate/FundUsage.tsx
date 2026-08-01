"use client";

import { ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface UsageItem {
  percent: string;
  title: string;
  desc: string;
}

export function FundUsage() {
  const { t } = useTranslation();
  const items = (t("donate.usage.items") as UsageItem[]) ?? [];

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <SectionHeader
          title={t("donate.usage.title")}
          subtitle={t("donate.usage.subtitle")}
        />

        <StaggerContainer
          staggerDelay={0.08}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-5"
        >
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-neutral-200 bg-white p-5 text-center dark:border-neutral-800 dark:bg-neutral-950"
            >
              <p className="text-3xl font-bold text-primary md:text-4xl">
                {item.percent}
              </p>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </p>
            </div>
          ))}
        </StaggerContainer>

        <div className="mx-auto mt-8 flex max-w-4xl items-start gap-3 rounded-xl border border-accent/20 bg-accent/10 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm text-accent-dark dark:text-accent">
            {t("donate.usage.note")}
          </p>
        </div>
      </Container>
    </section>
  );
}
