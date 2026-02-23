"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
type InViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

interface MotionSafeOptions {
  once?: InViewOptions["once"];
  amount?: InViewOptions["amount"];
  margin?: InViewOptions["margin"];
  offsetY?: number;
  duration?: number;
  delay?: number;
}

export function useMotionSafe<T extends HTMLElement = HTMLDivElement>({
  once = true,
  amount = 0.2,
  margin,
  offsetY = 16,
  duration = 0.38,
  delay = 0,
}: MotionSafeOptions = {}) {
  const ref = React.useRef<T | null>(null);
  const inView = useInView(ref, { once, amount, margin });
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: offsetY };
  const animate = reduceMotion
    ? { opacity: 1, y: 0 }
    : inView
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: offsetY };
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration, delay, ease: DEFAULT_EASE };

  return { ref, inView, reduceMotion, initial, animate, transition };
}

interface MotionSafeProps extends HTMLMotionProps<"div">, MotionSafeOptions {
  children: React.ReactNode;
}

export function MotionSafe({
  children,
  className,
  once,
  amount,
  margin,
  offsetY,
  duration,
  delay,
  ...props
}: MotionSafeProps) {
  const { ref, initial, animate, transition } = useMotionSafe({
    once,
    amount,
    margin,
    offsetY,
    duration,
    delay,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
