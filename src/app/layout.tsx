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
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/site-bg.jpg')] opacity-40" />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] dark:bg-background/80" />
        </div>
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
