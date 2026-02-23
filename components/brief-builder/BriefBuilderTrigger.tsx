"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface BriefBuilderTriggerProps extends HTMLMotionProps<"button"> {
  label?: string;
}

export function BriefBuilderTrigger({
  className,
  label = "Brief Builder",
  ...props
}: BriefBuilderTriggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      layoutId="brief-builder-shell"
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className={cn(
        "btn-outline",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {label}
    </motion.button>
  );
}
