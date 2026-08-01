"use client";

import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function JoinCta() {
  const { t } = useTranslation();
  const benefits = (t("partners.join.benefits") as string[]) ?? [];
  const email = t("partners.join.email");

  return (
    <section className="bg-gradient-to-br from-secondary to-secondary-dark py-16 md:py-24">
      <Container className="max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-start">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {t("partners.join.title")}
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.15}>
              <p className="mt-4 text-lg text-white/80">
                {t("partners.join.subtitle")}
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.2}>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur md:p-8">
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-white"
                      aria-hidden="true"
                    />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-center sm:justify-start">
                <a
                  href={`mailto:${email}`}
                  className="inline-block w-full rounded-full bg-white px-8 py-3 text-center font-bold text-secondary-dark transition hover:scale-105 sm:w-auto"
                >
                  {t("partners.join.cta")}
                </a>
              </div>

              <p className="mt-3 text-center text-sm text-white/70 sm:text-start">
                {email}
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
