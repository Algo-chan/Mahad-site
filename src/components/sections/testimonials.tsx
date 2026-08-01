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
                {visible.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 md:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="font-serif text-4xl leading-none text-primary"
                    >
                      &ldquo;
                    </span>
                    <p className="mt-3 flex-1 text-lg italic leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {testimonial.quote}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 font-bold text-secondary">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-neutral-500">
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
                  className={cn(
                    "h-3 w-3 rounded-full transition-colors",
                    isActive ? "bg-primary" : "bg-neutral-300"
                  )}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
