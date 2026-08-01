import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import schoolInfo from "@/data/school.json";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: schoolInfo.name,
    template: `%s | ${schoolInfo.name}`,
  },
  description:
    "Providing quality academic and religious education to our community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <I18nProvider>
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
