import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <FadeIn
      className={cn(
        "flex max-w-2xl flex-col",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
          {subtitle}
        </p>
      ) : null}
      {align === "center" ? (
        <span className="mt-5 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-secondary-light" />
          <span className="h-2 w-2 rotate-45 bg-secondary-light" />
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-secondary-light" />
        </span>
      ) : null}
    </FadeIn>
  );
}
