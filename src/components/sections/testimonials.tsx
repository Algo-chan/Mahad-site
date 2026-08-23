"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import testimonials from "@/data/testimonials.json";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 6000;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

const fadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export function Testimonials() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [perView, setPerView] = React.useState(1);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => {
      const next = media.matches ? 2 : 1;
      setPerView(next);
      setActiveIndex((index) => Math.floor(index / next) * next);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goNext = React.useCallback(() => {
    setDirection(1);
    setActiveIndex(
      (index) => (index + perView) % testimonials.length
    );
  }, [perView]);

  const goPrev = React.useCallback(() => {
    setDirection(-1);
    setActiveIndex(
      (index) =>
        (index - perView + testimonials.length) % testimonials.length
    );
  }, [perView]);

  React.useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [goNext, paused, reduceMotion, activeIndex]);

  const visible = testimonials.slice(
    activeIndex,
    activeIndex + perView
  );
  const variants = reduceMotion ? fadeVariants : slideVariants;

  return (
    <section className="bg-neutral-50 py-16 dark:bg-neutral-900 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          title={t("home.testimonials.sectionTitle")}
          subtitle={t("home.testimonials.sectionSubtitle")}
        />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  ease: "easeOut",
                }}
                drag={perView === 1 ? "x" : false}
                dragConstraints={{ left: -120, right: 120 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -300) {
                    goNext();
                  } else if (info.offset.x > 60 || info.velocity.x > 300) {
                    goPrev();
                  }
                }}
                className={cn(
                  "grid gap-6",
                  perView === 2 ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                {visible.map((testimonial, offset) => (
                  <article
                    key={testimonial.id}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 md:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-6 end-4 font-display text-[7rem] leading-none text-secondary-light/25"
                    >
                      &rdquo;
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary-light to-accent opacity-60"
                    />
                    <p className="relative mt-4 flex-1 font-display text-lg italic leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {testimonial.quote}
                    </p>
                    <div className="relative mt-7 flex items-center gap-4 border-t border-border pt-5">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ring-2",
                          offset % 3 === 0 &&
                            "bg-primary/10 text-primary ring-primary/20",
                          offset % 3 === 1 &&
                            "bg-secondary/10 text-secondary-dark dark:text-secondary-light ring-secondary/30",
                          offset % 3 === 2 &&
                            "bg-accent/10 text-accent-dark dark:text-accent ring-accent/25"
                        )}
                        aria-hidden="true"
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
            {testimonials.map((testimonial) => {
              const isActive =
                testimonial.id >= activeIndex + 1 &&
                testimonial.id <= activeIndex + perView;
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      Math.floor((testimonial.id - 1) / perView) * perView
                    )
                  }
                  aria-label={`Go to testimonial ${testimonial.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="flex h-11 w-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      "h-3 w-3 rounded-full transition-colors",
                      isActive ? "bg-primary" : "bg-neutral-300 dark:bg-neutral-700"
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
