import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StickyDonateBar } from "@/components/layout/StickyDonateBar";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const SITE_URL = "https://mahadaltowheed.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MAHAD Al-TOWHEED | Academic & Religious Excellence",
    template: "%s | MAHAD Al-TOWHEED",
  },
  description:
    "MAHAD Al-TOWHEED provides quality academic and religious education in Ethiopia. Join us in building the next generation of ethical leaders.",
  keywords: [
    "school",
    "education",
    "Ethiopia",
    "Islamic school",
    "academic",
    "religious education",
    "non-profit",
    "charity",
  ],
  authors: [{ name: "MAHAD Al-TOWHEED" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MAHAD Al-TOWHEED",
    title: "MAHAD Al-TOWHEED",
    description: "Quality academic and religious education in Ethiopia",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAHAD Al-TOWHEED",
    description: "Quality academic and religious education",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
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
            <AccessibilityProvider>
              <Navbar />
              <main
                id="main-content"
                tabIndex={-1}
                className="flex flex-1 flex-col focus:outline-none"
              >
                {children}
              </main>
              <Footer />
              <CookieConsent />
              <ScrollToTop />
              <StickyDonateBar />
            </AccessibilityProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
