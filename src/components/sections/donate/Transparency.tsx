"use client";

import { Bell, FileCheck, Globe, Lock } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface TransparencyItem {
  title: string;
  desc: string;
}

const ICONS = [FileCheck, Globe, Lock, Bell];

export function Transparency() {
  const { t } = useTranslation();
  const items = (t("donate.transparency.items") as TransparencyItem[]) ?? [];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("donate.transparency.title")}
          subtitle={t("donate.transparency.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length] ?? FileCheck;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
