import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions",
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
