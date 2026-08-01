import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Religious Education",
};

export default function ReligiousLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
