"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const paragraphs = [
  "home.intro.p1",
  "home.intro.p2",
  "home.intro.p3",
];

export function Introduction() {
  const { t } = useTranslation();

  return (
    <section className="bg-neutral-50 py-16 dark:bg-neutral-900 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <SectionHeader
              align="left"
              title={t("home.intro.title")}
              subtitle={t("home.intro.subtitle")}
            />

            <StaggerContainer className="mt-6 flex flex-col gap-4">
              {paragraphs.map((key) => (
                <p
                  key={key}
                  className="text-neutral-600 leading-relaxed dark:text-neutral-300"
                >
                  {t(key)}
                </p>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.2} className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                {t("home.intro.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </FadeIn>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/school-campus.jpg"
                  alt="MAHAD Al-TOWHEED school campus in Shashemane"
                  width={320}
                  height={240}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 576px"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -start-4 aspect-square w-2/3 overflow-hidden rounded-xl border-4 border-white shadow-xl dark:border-neutral-800 sm:-start-6">
                <Image
                  src="/images/students-learning.jpg"
                  alt="Students learning together in class"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 60vw, (max-width: 1024px) 33vw, 384px"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
