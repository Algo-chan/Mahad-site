import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Programs",
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
