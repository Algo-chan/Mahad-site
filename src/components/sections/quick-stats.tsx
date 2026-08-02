"use client";

import { Clock, GraduationCap, HeartHandshake, Users } from "lucide-react";
import { CountUp } from "@/components/animations/CountUp";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const stats = [
  { labelKey: "home.quickStats.students", value: 1000, suffix: "+", icon: Users },
  { labelKey: "home.quickStats.teachers", value: 50, suffix: "+", icon: GraduationCap },
  { labelKey: "home.quickStats.services", value: 30, suffix: "+", icon: HeartHandshake },
  { labelKey: "home.quickStats.years", value: 15, suffix: "+", icon: Clock },
];

export function QuickStats() {
  const { t } = useTranslation();

  return (
    <section className="border-b border-border bg-primary/5 py-12 dark:bg-primary/10">
      <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.labelKey}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              <CountUp
                end={stat.value}
                suffix={stat.suffix ?? ""}
                duration={1.5}
                className="text-3xl font-bold text-foreground md:text-4xl"
              />
              <span className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {t(stat.labelKey)}
              </span>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
