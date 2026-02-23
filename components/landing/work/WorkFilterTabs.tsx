"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface WorkFilterTabsProps<TCategory extends string> {
  categories: readonly TCategory[];
  activeCategory: TCategory;
  onChange: (category: TCategory) => void;
}

export function WorkFilterTabs<TCategory extends string>({
  categories,
  activeCategory,
  onChange,
}: WorkFilterTabsProps<TCategory>) {
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const focusAndActivate = (index: number) => {
    const next = categories[index];
    if (!next) return;
    onChange(next);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = categories.indexOf(activeCategory);
    if (currentIndex < 0) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAndActivate((currentIndex + 1) % categories.length);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAndActivate((currentIndex - 1 + categories.length) % categories.length);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusAndActivate(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusAndActivate(categories.length - 1);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent md:hidden" />

      <div className="overflow-x-auto px-8 md:px-0">
        <div
          role="tablist"
          aria-label="Selected work categories"
          onKeyDown={handleKeyDown}
          className="mx-auto inline-flex min-w-max items-center gap-1 rounded-full border border-border/50 bg-card/80 p-1 shadow-[var(--shadow-soft)]"
        >
          {categories.map((category, index) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                type="button"
                onClick={() => onChange(category)}
                className={cn(
                  "relative isolate min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="selected-work-filter-indicator"
                    className="absolute inset-0 -z-10 rounded-full bg-background shadow-[var(--shadow-soft)]"
                    transition={{ type: "spring", stiffness: 360, damping: 34 }}
                  />
                ) : null}
                <span className={active ? "text-foreground" : "text-muted-foreground"}>{category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
