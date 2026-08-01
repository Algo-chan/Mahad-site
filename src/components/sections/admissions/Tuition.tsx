"use client";

import { SectionHeader } from "@/components/animations/SectionHeader";
import { Container } from "@/components/layout/container";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface TuitionRow {
  program: string;
  registration: string;
  monthly: string;
  annual: string;
}

export function Tuition() {
  const { t } = useTranslation();
  const headers = t("admissions.tuition.table.headers") as string[];
  const rows = t("admissions.tuition.table.rows") as TuitionRow[];

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <Container>
        <SectionHeader
          title={t("admissions.tuition.title")}
          subtitle={t("admissions.tuition.subtitle")}
        />

        <p className="mx-auto mb-10 mt-6 max-w-3xl text-center text-neutral-600 dark:text-neutral-300">
          {t("admissions.tuition.note")}
        </p>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-primary text-white">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-start text-sm font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.program}
                    className={cn(
                      index % 2 === 0
                        ? "bg-neutral-50 dark:bg-neutral-900"
                        : "bg-white dark:bg-neutral-950"
                    )}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-primary">
                      {row.program}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-800 dark:text-neutral-200">
                      {row.registration}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-800 dark:text-neutral-200">
                      {row.monthly}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-800 dark:text-neutral-200">
                      {row.annual}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-secondary/20 bg-secondary/5 p-6 dark:bg-secondary/10 md:p-8">
          <h3 className="text-xl font-bold text-secondary">
            {t("admissions.tuition.aid.title")}
          </h3>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            {t("admissions.tuition.aid.text")}
          </p>
        </div>
      </Container>
    </section>
  );
}
