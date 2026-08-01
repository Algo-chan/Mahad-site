"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
    <section className="relative overflow-hidden bg-gradient-to-r from-accent to-accent-dark py-16 md:py-20">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`pointer-events-none absolute rounded-full bg-white opacity-10 ${circle.className}`}
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, -20, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, delay: circle.delay }
          }
        />
      ))}

      <Container className="relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-start">
        <div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t("home.donateBanner.title")}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            {t("home.donateBanner.subtitle")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <Button
            href="/donate"
            variant="white"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t("home.donateBanner.cta")}
          </Button>
          <Link
            href="/donate"
            className="text-sm text-white/80 underline transition-colors hover:text-white"
          >
            {t("home.donateBanner.secondary")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
