"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Users } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden md:min-h-[92vh]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary/85 to-primary-dark/90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary-dark/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pattern-lattice absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 text-center sm:px-6 lg:px-8">
        <FadeIn direction="up" delay={0}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary-light/40 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary-light backdrop-blur-sm md:text-sm">
            <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
            {t("hero.trustBadge")}
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.15}>
          <h1 className="mx-auto max-w-4xl break-words text-4xl font-bold text-white drop-shadow-md md:text-5xl lg:text-6xl xl:text-7xl">
            {t("hero.title")}
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            {t("hero.subtitle")}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.45}>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/donate" size="lg" className="w-full sm:w-auto">
              {t("hero.ctaPrimary")}
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="w-full border-white/40 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white/20 hover:text-white sm:w-auto"
            >
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </FadeIn>
      </div>

      {!reduceMotion && (
        <motion.div
          className="absolute bottom-8 z-10 text-white/70"
          aria-hidden="true"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      )}
    </section>
  );
}
