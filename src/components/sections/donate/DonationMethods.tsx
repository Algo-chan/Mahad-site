"use client";

import { Building2, Calendar, DollarSign, Mail, Package } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface MethodItem {
  title: string;
  desc: string;
  cta: string;
}

const ICONS = [DollarSign, Calendar, Building2, Package];

export function DonationMethods() {
  const { t } = useTranslation();
  const options = (t("donate.methods.options") as MethodItem[]) ?? [];

  return (
    <section
      id="donate-methods"
      className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24 dark:from-primary/10"
    >
      <Container>
        <SectionHeader
          title={t("donate.methods.title")}
          subtitle={t("donate.methods.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {options.map((option, index) => {
            const Icon = ICONS[index % ICONS.length] ?? DollarSign;
            return (
              <div
                key={option.title}
                className="rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm transition hover:border-primary/50 hover:shadow-md md:p-8 dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {option.title}
                </h3>
                <p className="mb-5 mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {option.desc}
                </p>
                <button
                  type="button"
                  className="w-full rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark sm:w-auto"
                >
                  {option.cta}
                </button>
              </div>
            );
          })}
        </StaggerContainer>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {t("donate.methods.contact")}
          </p>
        </div>
      </Container>
    </section>
  );
}
