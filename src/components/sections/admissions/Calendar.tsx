"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface CalendarEvent {
  date: string;
  title: string;
  type: "academic" | "event" | "holiday";
}

const badgeStyles: Record<CalendarEvent["type"], string> = {
  academic: "bg-primary/10 text-primary",
  event: "bg-accent/10 text-accent-dark dark:text-accent",
  holiday: "bg-secondary/10 text-secondary",
};

export function Calendar() {
  const { t } = useTranslation();
  const events = t("admissions.calendar.events") as CalendarEvent[];

  return (
    <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24 dark:from-primary/10">
      <Container>
        <SectionHeader
          title={t("admissions.calendar.title")}
          subtitle={t("admissions.calendar.subtitle")}
        />

        <StaggerContainer className="mx-auto mt-12 max-w-3xl">
          {events.map((event) => (
            <div
              key={`${event.date}-${event.title}`}
              className="flex flex-col gap-3 border-b border-neutral-200 py-4 last:border-0 sm:flex-row sm:items-center dark:border-neutral-800"
            >
              <span className="w-full whitespace-nowrap text-sm font-bold text-primary sm:w-40">
                {event.date}
              </span>
              <span
                className={`inline-block w-fit rounded-full px-2 py-1 text-xs font-semibold ${badgeStyles[event.type]}`}
              >
                {t(`admissions.calendar.legend.${event.type}`)}
              </span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {event.title}
              </span>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
