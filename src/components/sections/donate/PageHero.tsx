"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const HEARTS = [
  { className: "top-16 start-10 h-20 w-20", delay: 0, duration: 7 },
  { className: "bottom-20 end-14 h-14 w-14", delay: 1.2, duration: 6 },
  { className: "top-24 end-1/4 h-10 w-10", delay: 0.6, duration: 8 },
];

export function PageHero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary py-24 md:py-32">
      {HEARTS.map((heart) => (
        <motion.div
          key={heart.className}
          className={`absolute text-white ${heart.className}`}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.16, 0.1] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <Heart className="h-full w-full" fill="currentColor" />
        </motion.div>
      ))}

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl font-bold text-white md:text-6xl">
              {t("donate.pageTitle")}
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
              {t("donate.heroSubtitle")}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.35}>
            <Link
              href="#donate-methods"
              className="mt-8 inline-block rounded-full bg-accent px-10 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105 hover:bg-accent-dark"
            >
              {t("donate.cta.button")}
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
