"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/animations/SectionHeader";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";

interface FaqItem {
  question: string;
  answer: string;
}

export function Faq() {
  const { t } = useTranslation();
  const items = t("admissions.faq.items") as FaqItem[];
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
      <Container>
        <SectionHeader
          title={t("admissions.faq.title")}
          subtitle={t("admissions.faq.subtitle")}
        />

        <StaggerContainer staggerDelay={0.05} className="mx-auto mt-12 max-w-3xl">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="mb-3 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex min-h-12 w-full items-center justify-between gap-4 p-5 text-start transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {item.question}
                  </span>
                  <motion.span
                    className="shrink-0 text-primary"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-neutral-600 dark:text-neutral-400">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
