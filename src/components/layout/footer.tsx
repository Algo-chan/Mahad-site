"use client";

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
import schoolInfo from "@/data/school.json";
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
    <footer>
      <div className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <Container className="py-12">
          <Newsletter />
        </Container>
      </div>

      <div className="bg-neutral-900 text-neutral-300 dark:bg-neutral-950">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              {t("schoolName")}
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400">
              {t("hero.subtitle")}
            </p>
            <div className="flex items-center gap-3">
              <FacebookIcon href="#" />
              <TwitterIcon href="#" />
              <InstagramIcon href="#" />
              <YoutubeIcon href="#" />
              <TelegramIcon href="#" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {t(navKeyByHref[item.href])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Programs
            </h3>
            <ul className="flex flex-col gap-2">
              {programs.map((program) => (
                <li key={program.label} className="text-sm">
                  <span className="font-medium text-neutral-200">
                    {program.label}
                  </span>
                  <span className="block text-neutral-400">
                    {program.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${schoolInfo.email}`}
                  className="transition-colors hover:text-white"
                >
                  {schoolInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <span>{schoolInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <span>{schoolInfo.address}</span>
              </li>
            </ul>
          </div>
        </Container>

        <div className="border-t border-neutral-800">
          <Container className="flex flex-col items-center justify-between gap-2 py-6 text-sm text-neutral-400 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {t("schoolName")}. All rights
              reserved.
            </p>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
          </Container>
        </div>
      </div>
    </footer>
  );
}
