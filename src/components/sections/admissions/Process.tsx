"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface Step {
  number: string;
  title: string;
  desc: string;
}

export function Process() {
  const { t } = useTranslation();
  const steps = t("admissions.process.steps") as Step[];

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <SectionHeader
          title={t("admissions.process.title")}
          subtitle={t("admissions.process.subtitle")}
        />

        <StaggerContainer className="mt-12">
          <div className="relative hidden md:block">
            <div
              className="absolute inset-x-0 top-6 h-px bg-neutral-300 dark:bg-neutral-700"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-5 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center"
                >
                  <span className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[200px] text-sm text-neutral-600 dark:text-neutral-400">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            {steps.map((step) => (
              <div key={step.number} className="mb-8 flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </StaggerContainer>
      </Container>
    </section>
  );
}
