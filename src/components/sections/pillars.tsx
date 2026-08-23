"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const pillars = [
  {
    href: "/academics",
    titleKey: "academics.pageTitle",
    textKey: "academics.overview.text",
    image: "/images/gallery/gallery-4.jpg",
    alt: "Students working in a modern classroom at MAHAD Al-TOWHEED",
  },
  {
    href: "/religious",
    titleKey: "religious.pageTitle",
    textKey: "religious.overview.text",
    image: "/images/gallery/gallery-7.jpg",
    alt: "Students studying together in Quran class",
  },
  {
    href: "/impact",
    titleKey: "impact.pageTitle",
    textKey: "home.intro.p3",
    image: "/images/gallery/gallery-9.jpg",
    alt: "Community members receiving food baskets during a charity drive",
  },
];

export function Pillars() {
  const { t } = useTranslation();

  return (
    <section className="py-16 dark:bg-neutral-950 md:py-24">
      <Container className="flex flex-col gap-16 md:gap-24">
        <SectionHeader
          title={t("home.pillars.sectionTitle")}
          subtitle={t("home.missionCards.sectionSubtitle")}
        />

        {pillars.map((pillar, index) => (
          <div
            key={pillar.href}
            className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            <FadeIn
              direction="up"
              className={
                index % 2 === 0 ? "md:order-1" : "md:order-2"
              }
            >
              <div className="relative">
                <span
                  className="absolute -inset-0 translate-x-3 translate-y-3 rounded-2xl border border-secondary-light/50 sm:translate-x-4 sm:translate-y-4"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 560px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn
              direction="up"
              delay={0.1}
              className={
                index % 2 === 0 ? "md:order-2" : "md:order-1"
              }
            >
              <div className="max-w-xl">
                <span
                  className="font-display text-sm font-bold tracking-[0.35em] text-secondary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  {t(pillar.titleKey)}
                </h3>
                <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {t(pillar.textKey)}
                </p>
                <Link
                  href={pillar.href}
                  className="group mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-light"
                >
                  {t("news.featured.readMore")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </FadeIn>
          </div>
        ))}
      </Container>
    </section>
  );
}
