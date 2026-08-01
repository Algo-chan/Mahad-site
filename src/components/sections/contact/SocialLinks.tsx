"use client";

import {
  FACEBOOK_PATH,
  INSTAGRAM_PATH,
  TELEGRAM_PATH,
  TWITTER_PATH,
  YOUTUBE_PATH,
} from "@/components/layout/social-icons";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

const SOCIALS = [
  { key: "facebook", path: FACEBOOK_PATH },
  { key: "twitter", path: TWITTER_PATH },
  { key: "instagram", path: INSTAGRAM_PATH },
  { key: "youtube", path: YOUTUBE_PATH },
  { key: "telegram", path: TELEGRAM_PATH },
] as const;

export function SocialLinks() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 md:py-20 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("contact.social.title")}
          subtitle={t("contact.social.subtitle")}
        />

        <StaggerContainer
          staggerDelay={0.08}
          className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-4 md:mt-12 md:flex md:max-w-none md:justify-center md:gap-6"
        >
          {SOCIALS.map((social) => (
            <a
              key={social.key}
              href="#"
              className="flex min-h-[44px] items-center justify-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-6 py-3 font-medium text-neutral-700 transition hover:border-primary hover:bg-primary hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d={social.path} />
              </svg>
              {t(`contact.social.labels.${social.key}`)}
            </a>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
