"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
}

export function PartnerTestimonials() {
  const { t } = useTranslation();
  const items = (t("impact.testimonials.items") as TestimonialItem[]) ?? [];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("impact.testimonials.title")}
          subtitle={t("impact.testimonials.subtitle")}
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {items.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-8 dark:from-primary/10"
            >
              <blockquote className="mb-6 flex-1 text-lg italic leading-relaxed text-neutral-700 dark:text-neutral-300">
                {testimonial.quote}
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-base font-bold text-secondary">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
