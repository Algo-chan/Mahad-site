"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
    <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-lg ring-1 ring-white/10 md:p-8">
      <h3 className="font-display text-xl font-bold">
        {t("newsletter.title")}
      </h3>
      <p className="mb-4 mt-1 text-sm text-white/80">
        {t("newsletter.subtitle")}
      </p>
      {subscribed ? (
        <p className="text-sm font-medium text-secondary-light">
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
            className="min-h-[48px] flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:ring-2 focus:ring-secondary-light dark:border-white/20 dark:bg-white/10"
          />
          <Button type="submit" variant="primary" size="md">
            {t("newsletter.button")}
          </Button>
        </form>
      )}
      {error ? (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}
      {/* NOTE: No backend yet. Integrate with a free email marketing service (e.g. Mailchimp or Brevo) by wiring this form to their API later. */}
    </div>
  );
}
