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
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </FadeIn>
  );
}
