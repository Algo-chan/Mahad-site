"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SearchModal } from "@/components/layout/SearchModal";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTranslation } from "@/hooks/useTranslation";
import navigation from "@/data/navigation.json";
import { navKeyByHref } from "@/lib/nav-keys";
import { cn } from "@/lib/utils";

const PROGRAM_HREFS = ["/academics", "/religious"];

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [programsOpen, setProgramsOpen] = React.useState(false);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const hamburgerButtonRef = React.useRef<HTMLButtonElement>(null);
  const drawerRef = React.useRef<HTMLElement>(null);

  const [lastPathname, setLastPathname] = React.useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
    if (programsOpen) setProgramsOpen(false);
  }

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
        setProgramsOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const hamburger = hamburgerButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      hamburger?.focus();
    };
  }, [open]);

  const handleDrawerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const container = drawerRef.current;
    if (!container) return;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea'
      )
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const programsActive = PROGRAM_HREFS.includes(normalizedPathname);
  const name = String(t("schoolName"));
  const [nameLine1, nameLine2] = name.split(" ");

  return (
    <>
      <header
        dir="ltr"
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 md:h-18",
        isScrolled
          ? "border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95"
          : "border-b border-white/10 bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-2 md:h-18 md:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center">
            <Image
              src="/logo.png"
              alt={t("schoolName")}
              width={80}
              height={80}
              className="h-full w-full rounded-xl object-contain"
            />
          </span>
          <span
            className={cn(
              "flex h-10 w-[5.5rem] flex-col justify-between font-display text-sm font-bold leading-tight tracking-tight md:hidden",
              isScrolled ? "text-primary dark:text-primary" : "text-white"
            )}
            aria-hidden="true"
          >
            <span className="whitespace-nowrap">{nameLine1}</span>
            {nameLine2 ? (
              <span className="whitespace-nowrap">{nameLine2}</span>
            ) : null}
          </span>
          <span
            className={cn(
              "hidden whitespace-nowrap font-display text-lg font-bold tracking-tight md:block md:text-xl",
              isScrolled ? "text-primary dark:text-primary" : "text-white"
            )}
          >
            {name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex lg:gap-2"
          aria-label="Main"
        >
          {navigation
            .filter((item) => !item.cta && !PROGRAM_HREFS.includes(item.href))
            .map((item) => {
              const active = normalizedPathname === item.href;
              return (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex min-h-[44px] items-center whitespace-nowrap px-3 text-sm font-medium transition-colors duration-300",
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
                        "absolute inset-x-3 bottom-1.5 h-0.5 rounded-full transition-all duration-300",
                        active
                          ? "bg-secondary-light opacity-100"
                          : "bg-current opacity-0 group-hover:opacity-40"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                  {item.href === "/about" ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setProgramsOpen(true)}
                      onMouseLeave={() => setProgramsOpen(false)}
                    >
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={programsOpen}
                        onClick={() => setProgramsOpen((v) => !v)}
                        className={cn(
                          "group relative flex min-h-[44px] items-center gap-1 whitespace-nowrap px-3 text-sm font-medium transition-colors duration-300",
                          programsActive
                            ? isScrolled
                              ? "font-semibold text-primary"
                              : "font-semibold text-white"
                            : isScrolled
                              ? "text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary"
                              : "text-white/90 hover:text-white"
                        )}
                      >
                        {t("nav.programs")}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            programsOpen && "rotate-180"
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "absolute inset-x-3 bottom-1.5 h-0.5 rounded-full transition-all duration-300",
                            programsActive
                              ? "bg-secondary-light opacity-100"
                              : "bg-current opacity-0 group-hover:opacity-40"
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {programsOpen ? (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.18 }}
                            className="absolute start-0 top-full z-50 pt-2"
                          >
                            <div className="min-w-[13rem] overflow-hidden rounded-xl border border-border bg-card py-1.5 shadow-xl">
                              {PROGRAM_HREFS.map((href) => {
                                const subActive =
                                  normalizedPathname === href;
                                return (
                                  <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setProgramsOpen(false)}
                                    aria-current={
                                      subActive ? "page" : undefined
                                    }
                                    className={cn(
                                      "flex min-h-[44px] items-center px-4 py-2 text-sm font-medium transition-colors",
                                      subActive
                                        ? "bg-primary/5 font-semibold text-primary dark:bg-primary/10"
                                        : "text-neutral-700 hover:bg-muted dark:text-neutral-200 dark:hover:bg-neutral-900"
                                    )}
                                  >
                                    {t(navKeyByHref[href])}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300",
              isScrolled
                ? "text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
                : "text-white hover:bg-white/10"
            )}
            aria-label={t("search.placeholder")}
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="hidden sm:flex">
            <LanguageSwitcher isScrolled={isScrolled} />
          </div>
          <ThemeToggle isScrolled={isScrolled} />
          <button
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 md:hidden",
              isScrolled
                ? "text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
                : "text-white hover:bg-white/10"
            )}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            ref={hamburgerButtonRef}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </header>

    <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-neutral-950/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              ref={drawerRef}
              onKeyDown={handleDrawerKeyDown}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(20rem,88vw)] flex-col overflow-y-auto bg-white shadow-2xl md:hidden dark:border-s dark:border-neutral-800 dark:bg-neutral-950"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
                <span className="font-display text-base font-bold text-primary">
                  {name}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto py-3">
                {navigation.map((item) => {
                  const active = normalizedPathname === item.href;
                  if (item.cta) return null;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-[48px] items-center border-s-4 px-5 text-base font-medium transition-colors",
                        active
                          ? "border-secondary-light bg-primary/5 font-semibold text-primary dark:bg-primary/10"
                          : "border-transparent text-neutral-800 hover:border-secondary-light/50 hover:bg-muted dark:text-neutral-100 dark:hover:bg-neutral-900"
                      )}
                    >
                      {t(navKeyByHref[item.href])}
                    </Link>
                  );
                })}
              </div>

              <div className="shrink-0 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher isScrolled />
                  <ThemeToggle isScrolled />
                </div>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>

      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
