"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Landmark,
  Mail,
  ShieldCheck,
  Smartphone,
  Upload,
} from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

// TODO: Replace with verified, org-registered account details before launch —
// confirm with school administration, do not launch with unverified info.
// These account details are the highest-risk content on the site. They are only
// editable here in source code (no admin panel exists), so any change requires a
// code review + git history — keep it that way; never expose this in an admin UI.

interface ChannelItem {
  name: string;
  icon: "bank" | "mobile";
  accountHolder: string;
  accountNumber: string;
  bank: string;
}

const CHANNEL_ICONS = {
  bank: Landmark,
  mobile: Smartphone,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASSES =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-white";

const LABEL_CLASSES =
  "mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

type FormValues = {
  name: string;
  email: string;
  amount: string;
  channel: string;
  receipt: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  amount: "",
  channel: "",
  receipt: "",
};

export function HowToDonate() {
  const { t } = useTranslation();
  const channels = (t("donate.howToDonate.items") as ChannelItem[]) ?? [];
  const donationEmail = t("contact.info.email.donations");

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (field in errors) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValues((prev) => ({
      ...prev,
      receipt: file ? file.name : "",
    }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.name.trim()) {
      nextErrors.name = t("donate.howToDonate.confirm.required");
    }
    if (!values.email.trim()) {
      nextErrors.email = t("donate.howToDonate.confirm.required");
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = t("donate.howToDonate.confirm.invalidEmail");
    }
    if (!values.amount.trim()) {
      nextErrors.amount = t("donate.howToDonate.confirm.required");
    }
    if (!values.channel) {
      nextErrors.channel = t("donate.howToDonate.confirm.required");
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // TODO: Wire this to an email backend that forwards to the donations inbox
    // (e.g. Formspree: <form action="https://formspree.io/f/YOUR_ID" method="POST">)
    // so the receipt file and details actually reach donate@mahadaltowheed.org.
    // Until wired, the mailto link in the Confirm block is the live path.
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValues(INITIAL_VALUES);
      formRef.current?.reset();
    }, 1200);
  };

  return (
    <section id="how-to-donate" className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container className="max-w-6xl">
        <SectionHeader
          title={t("donate.howToDonate.title")}
          subtitle={t("donate.howToDonate.subtitle")}
        />

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-5 dark:border-primary/40 dark:bg-primary/10">
          <ShieldCheck
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {t("donate.howToDonate.transparency")}
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white md:text-2xl">
            {t("donate.howToDonate.channelsTitle")}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400 md:text-base">
            {t("donate.howToDonate.channelsSubtitle")}
          </p>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {channels.map((channel) => {
              const Icon = CHANNEL_ICONS[channel.icon] ?? Landmark;
              return (
                <div
                  key={channel.name}
                  className="rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {channel.name}
                  </h4>

                  <dl className="mt-4 space-y-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        {t("donate.howToDonate.accountHolderLabel")}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {channel.accountHolder}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        {t("donate.howToDonate.accountNumberLabel")}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {channel.accountNumber}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        {t("donate.howToDonate.bankLabel")}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {channel.bank}
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </StaggerContainer>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-500/50 bg-amber-50 p-5 dark:border-amber-500/40 dark:bg-amber-500/10">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-300">
                {t("donate.howToDonate.verificationTitle")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-amber-700 dark:text-amber-200">
                {t("donate.howToDonate.verification")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white md:text-2xl">
              {t("donate.howToDonate.confirm.title")}
            </h3>
            <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t("donate.howToDonate.confirm.subtitle")}
            </p>

            <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-950">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {t("donate.howToDonate.confirm.emailLabel")}
              </p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {t("donate.howToDonate.confirm.emailText")}
              </p>
              <Button
                href={`mailto:${donationEmail}?subject=Donation%20Receipt%20-%20MAHAD%20Al-TOWHEED`}
                variant="primary"
                size="lg"
                icon={<Mail className="h-5 w-5" aria-hidden="true" />}
                className="mt-4 w-full sm:w-auto"
              >
                {donationEmail}
              </Button>
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                {t("donate.howToDonate.confirm.emailCta")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-sm md:p-8 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              {t("donate.howToDonate.confirm.formTitle")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t("donate.howToDonate.confirm.formSubtitle")}
            </p>

            {isSubmitted ? (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400"
                  aria-hidden="true"
                />
                <p className="text-sm text-green-800 dark:text-green-300">
                  {t("donate.howToDonate.confirm.success")}
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 space-y-4"
              >
                <div>
                  <label htmlFor="donation-name" className={LABEL_CLASSES}>
                    {t("donate.howToDonate.confirm.name")}
                  </label>
                  <input
                    id="donation-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                    placeholder={t("donate.howToDonate.confirm.namePlaceholder")}
                    className={`${INPUT_CLASSES} ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name ? (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="donation-email" className={LABEL_CLASSES}>
                    {t("donate.howToDonate.confirm.email")}
                  </label>
                  <input
                    id="donation-email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    placeholder={t("donate.howToDonate.confirm.emailPlaceholder")}
                    className={`${INPUT_CLASSES} ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email ? (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="donation-amount" className={LABEL_CLASSES}>
                      {t("donate.howToDonate.confirm.amount")}
                    </label>
                    <input
                      id="donation-amount"
                      type="text"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange("amount")}
                      placeholder={t("donate.howToDonate.confirm.amountPlaceholder")}
                      className={`${INPUT_CLASSES} ${errors.amount ? "border-red-500" : ""}`}
                    />
                    {errors.amount ? (
                      <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="donation-channel" className={LABEL_CLASSES}>
                      {t("donate.howToDonate.confirm.channel")}
                    </label>
                    <select
                      id="donation-channel"
                      name="channel"
                      value={values.channel}
                      onChange={handleChange("channel")}
                      className={`${INPUT_CLASSES} ${errors.channel ? "border-red-500" : ""}`}
                    >
                      <option value="">
                        {t("donate.howToDonate.confirm.channelPlaceholder")}
                      </option>
                      {channels.map((channel) => (
                        <option key={channel.name} value={channel.name}>
                          {channel.name}
                        </option>
                      ))}
                    </select>
                    {errors.channel ? (
                      <p className="mt-1 text-xs text-red-500">{errors.channel}</p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="donation-receipt" className={LABEL_CLASSES}>
                    {t("donate.howToDonate.confirm.receipt")}
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-900">
                    <Upload
                      className="h-5 w-5 shrink-0 text-neutral-400"
                      aria-hidden="true"
                    />
                    <label className="flex flex-1 items-center justify-between gap-2 text-sm">
                      <span className="truncate text-neutral-600 dark:text-neutral-400">
                        {values.receipt ||
                          t("donate.howToDonate.confirm.receiptHint")}
                      </span>
                      <span className="shrink-0 cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark">
                        {t("donate.howToDonate.confirm.receipt")}
                      </span>
                      <input
                        id="donation-receipt"
                        type="file"
                        name="receipt"
                        accept="image/png,image/jpeg,application/pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting
                    ? t("donate.howToDonate.confirm.sending")
                    : t("donate.howToDonate.confirm.submit")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
