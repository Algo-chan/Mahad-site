"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Menu, Search, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SearchModal } from "@/components/layout/SearchModal";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTranslation } from "@/hooks/useTranslation";
import navigation from "@/data/navigation.json";
import { navKeyByHref } from "@/lib/nav-keys";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";

  return (
    <header
      dir="ltr"
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 md:h-18",
        isScrolled
          ? "border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95"
          : "border-b border-white/10 bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-18">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
              isScrolled
                ? "bg-primary text-primary-foreground"
                : "bg-white text-primary"
            )}
          >
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span
            className={cn(
              "truncate text-lg font-bold tracking-tight transition-colors duration-300 md:text-xl",
              isScrolled ? "text-primary dark:text-primary" : "text-white"
            )}
          >
            {t("schoolName")}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex lg:gap-2"
          aria-label="Main"
        >
          {navigation
            .filter((item) => !item.cta)
            .map((item) => {
              const active = normalizedPathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors duration-300",
                    active
                      ? isScrolled
                        ? "font-semibold text-primary"
                        : "font-semibold text-white"
                      : isScrolled
                        ? "text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary"
                        : "text-white/90 hover:text-white"
                  )}
                >
                  {t(navKeyByHref[item.href])}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-current transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300",
              isScrolled
                ? "text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
                : "text-white hover:bg-white/10"
            )}
            aria-label={t("search.placeholder")}
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <LanguageSwitcher isScrolled={isScrolled} />
          <ThemeToggle isScrolled={isScrolled} />
          <Link
            href="/donate"
            className={cn(
              "hidden h-10 items-center whitespace-nowrap rounded-full bg-accent px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark md:inline-flex",
              isScrolled && "shadow-md"
            )}
          >
            {t("nav.donate")}
          </Link>
          <button
            type="button"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 md:hidden",
              isScrolled
                ? "text-neutral-900 hover:bg-accent dark:text-white"
                : "text-white hover:bg-white/10"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-neutral-200 bg-white md:hidden dark:border-neutral-800 dark:bg-neutral-950"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile"
          >
            <Container className="flex flex-col py-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border py-3 text-lg font-medium text-neutral-900 transition-colors hover:bg-muted dark:text-white",
                    item.cta
                      ? "my-3 flex items-center justify-center rounded-full bg-accent px-4 py-3 text-white hover:bg-accent-dark"
                      : "px-3"
                  )}
                >
                  {t(navKeyByHref[item.href])}
                </Link>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>

      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
