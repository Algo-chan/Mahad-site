"use client";

import { CountUp } from "@/components/animations/CountUp";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const stats = [
  { labelKey: "home.quickStats.students", value: 500, suffix: "+" },
  { labelKey: "home.quickStats.teachers", value: 45 },
  { labelKey: "home.quickStats.grades", value: 12 },
  { labelKey: "home.quickStats.years", value: 15, suffix: "+" },
];

export function QuickStats() {
  const { t } = useTranslation();

  return (
    <section className="bg-primary py-12">
      <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.labelKey}
            className="flex flex-col items-center gap-1 text-center"
          >
            <CountUp
              end={stat.value}
              suffix={stat.suffix ?? ""}
              duration={1.5}
              className="text-3xl font-bold text-white md:text-4xl"
            />
            <span className="text-sm uppercase tracking-wider text-white/80">
              {t(stat.labelKey)}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
