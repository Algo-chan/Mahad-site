"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const circles = [
  { className: "h-40 w-40 -top-10 -start-10", delay: 0 },
  { className: "h-24 w-24 -bottom-8 -end-6", delay: 1.5 },
  { className: "h-16 w-16 top-1/3 end-1/4", delay: 3 },
];

export function DonateBanner() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary-dark py-20 md:py-28">
      <div
        className="pattern-lattice absolute inset-0 opacity-35"
        aria-hidden="true"
      />
      <span
        className="absolute -top-24 -end-24 h-72 w-72 rounded-full border border-secondary-light/25"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-32 -start-16 h-80 w-80 rounded-full border border-secondary-light/15"
        aria-hidden="true"
      />

      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`pointer-events-none absolute rounded-full bg-secondary-light opacity-10 ${circle.className}`}
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, -20, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, delay: circle.delay }
          }
        />
      ))}

      <Container className="relative z-10 flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:text-start">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary-light/50 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary-light backdrop-blur-sm">
            <Heart className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
            {t("donate.guarantee")}
          </span>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {t("home.donateBanner.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            {t("home.donateBanner.subtitle")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-end">
          <Button href="/donate" variant="primary" size="xl" className="w-full sm:w-auto">
            {t("home.donateBanner.cta")}
          </Button>
          <Link
            href="/donate"
            className="min-h-[44px] pt-1 text-sm font-medium text-secondary-light underline decoration-secondary-light/50 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
          >
            {t("home.donateBanner.secondary")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
