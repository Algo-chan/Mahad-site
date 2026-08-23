"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

export function ContactInfo() {
  const { t } = useTranslation();

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container className="max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              title={t("contact.info.title")}
              subtitle={t("contact.info.subtitle")}
              align="left"
            />

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {t("contact.info.address.title")}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {t("contact.info.address.value")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {t("contact.info.phone.title")}
                  </h3>
                  <div className="mt-1 flex flex-col gap-1 text-sm">
                    <a
                      href={`tel:${String(t("contact.info.phone.primary")).replace(/\s+/g, "")}`}
                      className="font-semibold text-primary hover:underline"
                      dir="ltr"
                    >
                      {t("contact.info.phone.primary")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {t("contact.info.email.title")}
                  </h3>
                  <div className="mt-1 flex flex-col gap-1 text-sm">
                    <a
                      href={`mailto:${t("contact.info.email.general")}`}
                      className="font-semibold text-primary hover:underline"
                    >
                      {t("contact.info.email.general")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {t("contact.info.hours.title")}
                  </h3>
                  <div className="mt-1 flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <p>{t("contact.info.hours.weekdays")}</p>
                    <p>{t("contact.info.hours.saturday")}</p>
                    <p>{t("contact.info.hours.sunday")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader title={t("contact.map.title")} align="left" />

            <div className="mt-8 flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
              <iframe
                src="https://www.google.com/maps?q=Bulchana%20(05)%2C%20Shashemane%2C%20West%20Arsi%20Zone%2C%20Oromia%2C%20Ethiopia&output=embed"
                title={t("contact.map.title")}
                className="h-full w-full flex-1 border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Bulchana%20(05)%2C%20Shashemane%2C%20West%20Arsi%20Zone%2C%20Oromia%2C%20Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-neutral-300 bg-white p-3 text-sm font-semibold text-primary hover:underline dark:border-neutral-700 dark:bg-neutral-950"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t("contact.info.address.value")}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
