"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  isScrolled = false,
}: {
  isScrolled?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-10 w-10 rounded-full transition-colors duration-300",
        isScrolled
          ? "hover:bg-accent hover:text-accent-foreground"
          : "text-white hover:bg-white/10 hover:text-white"
      )}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )
      ) : (
        <div className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
