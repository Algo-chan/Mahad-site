"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Users } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden md:min-h-screen">
      <img
        src="/images/hero-bg.jpg"
        alt={t("schoolName")}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-transparent"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 text-center sm:px-6 lg:px-8">
        <FadeIn direction="up" delay={0}>
          <h1 className="break-words text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl xl:text-7xl">
            {t("hero.title")}
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            {t("hero.subtitle")}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.35}>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              href="/donate"
              size="lg"
              className="w-full ring-4 ring-accent/30 animate-pulse sm:w-auto"
            >
              {t("hero.ctaPrimary")}
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="w-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white sm:w-auto"
            >
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.45}>
          <p className="mt-10 inline-flex items-center justify-center gap-2 text-sm font-medium text-white/80">
            <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
            {t("hero.trustBadge")}
          </p>
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
