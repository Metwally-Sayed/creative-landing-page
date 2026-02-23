import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  align?: "left" | "center";
}

export function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="font-playfair text-[34px] leading-[1.08] tracking-tight text-primary md:text-[56px]">
        {title}
      </h2>

      {subtitle ? (
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
