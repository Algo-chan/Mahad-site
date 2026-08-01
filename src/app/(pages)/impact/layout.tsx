import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact",
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
