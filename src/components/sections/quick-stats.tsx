"use client";

import { Clock, GraduationCap, HeartHandshake, Users } from "lucide-react";
import { CountUp } from "@/components/animations/CountUp";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const stats = [
  { labelKey: "home.quickStats.students", value: 1000, suffix: "+", icon: Users },
  { labelKey: "home.quickStats.teachers", value: 50, suffix: "+", icon: GraduationCap },
  { labelKey: "home.quickStats.services", value: 30, suffix: "+", icon: HeartHandshake },
  { labelKey: "home.quickStats.years", value: 40, suffix: "+", icon: Clock },
];

export function QuickStats() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-14 md:py-16">
      <div
        className="pattern-lattice absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      <Container className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.labelKey}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-secondary-light/40">
                <Icon
                  className="h-6 w-6 text-secondary-light"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <CountUp
                end={stat.value}
                suffix={stat.suffix ?? ""}
                duration={1.5}
                className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl"
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {t(stat.labelKey)}
              </span>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
