"use client";

import * as React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setError(t("contact.form.invalidEmail"));
      return;
    }
    setError(null);
    setSubscribed(true);
  };

  return (
    <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 dark:bg-primary/10 md:p-8">
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
        {t("newsletter.title")}
      </h3>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        {t("newsletter.subtitle")}
      </p>
      {subscribed ? (
        <p className="text-sm font-medium text-green-600 dark:text-green-400">
          {t("newsletter.success")}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {t("newsletter.title")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            placeholder={t("newsletter.placeholder")}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            {t("newsletter.button")}
          </button>
        </form>
      )}
      {error ? (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
      {/* NOTE: No backend yet. Integrate with a free email marketing service (e.g. Mailchimp or Brevo) by wiring this form to their API later. */}
    </div>
  );
}
