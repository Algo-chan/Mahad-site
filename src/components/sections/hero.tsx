"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 text-center sm:px-6 lg:px-8">
        <FadeIn direction="up" delay={0}>
          <h1 className="break-words text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
            {t("hero.subtitle")}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.35}>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105 hover:bg-accent-dark active:scale-95"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              {t("hero.ctaSecondary")}
            </Link>
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
