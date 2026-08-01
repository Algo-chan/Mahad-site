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
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </FadeIn>
  );
}
