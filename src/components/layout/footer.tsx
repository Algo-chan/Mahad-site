"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Newsletter } from "@/components/ui/Newsletter";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/layout/social-icons";
import navigation from "@/data/navigation.json";
import { useTranslation } from "@/hooks/useTranslation";
import { navKeyByHref } from "@/lib/nav-keys";

const programs = [
  { label: "Academic Education", detail: "KG1 - Grade 10" },
  { label: "Religious Education", detail: "Grade 1 - 12" },
];

export function Footer() {
  const { t } = useTranslation();
  const quickLinks = navigation.filter((item) => !item.cta);

  return (
    <footer className="bg-primary-dark text-neutral-200">
      <div className="border-b border-white/10 bg-gradient-to-r from-primary/40 via-primary-dark to-primary/40">
        <Container className="py-12">
          <Newsletter />
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4">
          <Image
            src="/images/book-footer.png"
            alt=""
            aria-hidden="true"
            width={256}
            height={256}
            className="h-16 w-16 object-contain md:h-20 md:w-20"
          />
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-white"
          >
            {t("schoolName")}
          </Link>
          <p className="text-sm leading-relaxed text-neutral-300/90">
            {t("hero.subtitle")}
          </p>
          <div className="flex items-center gap-2.5">
            <FacebookIcon href="#" />
            <TwitterIcon href="#" />
            <InstagramIcon href="#" />
            <YoutubeIcon href="#" />
            <TelegramIcon href="#" />
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-secondary-light">
            <span className="h-1.5 w-1.5 rotate-45 bg-secondary-light" aria-hidden="true" />
            Quick Links
          </h3>
          <div className="rounded-2xl bg-white/[0.04] p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 sm:p-4">
            <ul className="grid grid-cols-2 gap-x-6">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-neutral-300 transition-colors hover:text-white hover:underline hover:decoration-secondary-light/60 hover:underline-offset-4"
                  >
                    {t(navKeyByHref[item.href])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-secondary-light">
            <span className="h-1.5 w-1.5 rotate-45 bg-secondary-light" aria-hidden="true" />
            Programs
          </h3>
          <ul className="flex flex-col gap-3">
            {programs.map((program) => (
              <li key={program.label} className="text-sm">
                <span className="font-medium text-white">{program.label}</span>
                <span className="block text-neutral-400">{program.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-secondary-light">
            <span className="h-1.5 w-1.5 rotate-45 bg-secondary-light" aria-hidden="true" />
            Contact
          </h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-secondary-light"
                aria-hidden="true"
              />
              <a
                href={`mailto:${t("contact.info.email.general")}`}
                className="break-all transition-colors hover:text-white hover:underline"
              >
                {t("contact.info.email.general")}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone
                className="mt-0.5 h-4 w-4 shrink-0 text-secondary-light"
                aria-hidden="true"
              />
              <span>{t("contact.info.phone.primary")}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-secondary-light"
                aria-hidden="true"
              />
              <span>{t("contact.info.address.value")}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-[hsl(163_74%_9%)]">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-neutral-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {t("schoolName")}. All rights
            reserved.
          </p>
          <Link
            href="/privacy"
            className="transition-colors hover:text-white hover:underline"
          >
            Privacy Policy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
