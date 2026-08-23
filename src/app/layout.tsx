import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Sans_Arabic } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StickyDonateBar } from "@/components/layout/StickyDonateBar";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

const SITE_URL = 'https://mahad.fcncare.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MAHAD Al-TOWHEED | Academic & Religious Excellence",
    template: "%s | MAHAD Al-TOWHEED",
  },
  description:
    "MAHAD Al-TOWHEED provides quality academic and religious education in Ethiopia. Join us in building the next generation of ethical leaders.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: 'webvZ8eYJX0km7UVVcqnCZOBv6uRdCLLO1LwswGBYxg', // <-- paste YOUR code here
  },
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${notoSansArabic.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans text-foreground antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_85%_-10%,hsl(45_68%_52%/0.07),transparent_60%),radial-gradient(50rem_36rem_at_-10%_30%,hsl(162_73%_20%/0.06),transparent_55%),radial-gradient(46rem_30rem_at_110%_85%,hsl(20_74%_43%/0.05),transparent_55%)]"
        />
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
