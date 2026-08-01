"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTranslation } from "@/hooks/useTranslation";
import navigation from "@/data/navigation.json";
import { navKeyByHref } from "@/lib/nav-keys";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasChrome = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        hasChrome
          ? "border-b border-border bg-background/80 backdrop-blur"
          : "border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-bold tracking-tight text-primary">
            {t("schoolName")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navigation
            .filter((item) => !item.cta)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(navKeyByHref[item.href])}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="/donate"
            className="hidden h-11 items-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 lg:inline-flex"
          >
            {t("nav.donate")}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-x-0 bottom-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-background/95 backdrop-blur lg:hidden"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile"
          >
            <Container className="flex flex-col gap-1 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted",
                    item.cta &&
                      "mt-3 flex items-center justify-center rounded-full bg-accent px-4 py-3 text-accent-foreground hover:bg-accent/90"
                  )}
                >
                  {t(navKeyByHref[item.href])}
                </Link>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
