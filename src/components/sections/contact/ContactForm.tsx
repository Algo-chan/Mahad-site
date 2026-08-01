"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASSES =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-white";

const LABEL_CLASSES =
  "mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const REQUIRED_FIELDS: (keyof FormValues)[] = ["name", "email", "message"];

export function ContactForm() {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const formRef = useRef<HTMLFormElement>(null);

  const requiredFilled = REQUIRED_FIELDS.filter(
    (field) => values[field].trim()
  ).length;
  const progress = Math.round((requiredFilled / REQUIRED_FIELDS.length) * 100);

  const handleChange =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (field in errors) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validate = (formData: FormData) => {
    const nextErrors: FormErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) nextErrors.name = t("contact.form.required");
    if (!email) {
      nextErrors.email = t("contact.form.required");
    } else if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = t("contact.form.invalidEmail");
    }
    if (!message) nextErrors.message = t("contact.form.required");

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // This form does not submit anywhere yet. To wire it to Formspree,
    // replace the <form> with: <form action="https://formspree.io/f/YOUR_ID" method="POST">
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValues(INITIAL_VALUES);
      formRef.current?.reset();
    }, 1200);
  };

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container className="max-w-2xl">
        <SectionHeader
          title={t("contact.form.title")}
          subtitle={t("contact.form.subtitle")}
        />

        {isSubmitted ? (
          <div className="mt-12 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400"
              aria-hidden="true"
            />
            <p className="text-sm text-green-800 dark:text-green-300">
              {t("contact.form.success")}
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 space-y-5"
          >
            <div className="relative h-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t("contact.form.subtitle")}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={LABEL_CLASSES}>
                  {t("contact.form.name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  placeholder={t("contact.form.namePlaceholder")}
                  className={`${INPUT_CLASSES} ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name ? (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-email" className={LABEL_CLASSES}>
                  {t("contact.form.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder={t("contact.form.emailPlaceholder")}
                  className={`${INPUT_CLASSES} ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="contact-phone" className={LABEL_CLASSES}>
                {t("contact.form.phone")}
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange("phone")}
                placeholder={t("contact.form.phonePlaceholder")}
                className={INPUT_CLASSES}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className={LABEL_CLASSES}>
                {t("contact.form.message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange("message")}
                placeholder={t("contact.form.messagePlaceholder")}
                className={`${INPUT_CLASSES} resize-y ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message ? (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting
                  ? t("contact.form.sending")
                  : t("contact.form.submit")}
              </Button>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t("contact.form.privacy")}
              </p>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}
