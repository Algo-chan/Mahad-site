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
        <span
          className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent"
          aria-hidden="true"
        />
      ) : null}
    </FadeIn>
  );
}
