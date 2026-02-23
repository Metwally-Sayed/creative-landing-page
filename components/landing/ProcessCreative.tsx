"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Container } from "@/components/landing/Container";
import { MotionSafe } from "@/components/landing/MotionSafe";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { NumberCounter } from "@/components/ui/number-counter";
import { cn } from "@/lib/utils";

type ProcessStep = {
  id: string;
  number: string;
  title: string;
  bullets: [string, string];
  metricValue: number;
  metricLabel: string;
  metricSuffix?: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    bullets: [
      "Deep-dive market and audience diagnostics",
      "Narrative opportunity map for your category",
    ],
    metricValue: 42,
    metricLabel: "research checkpoints mapped",
  },
  {
    id: "strategize",
    number: "02",
    title: "Strategize",
    bullets: [
      "Positioning architecture and value hierarchy",
      "Channel messaging priorities by audience intent",
    ],
    metricValue: 6,
    metricLabel: "core strategic pillars",
  },
  {
    id: "create",
    number: "03",
    title: "Create",
    bullets: [
      "Identity, campaign, and asset production",
      "Launch-ready design system and rollout kit",
    ],
    metricValue: 28,
    metricLabel: "deliverables shipped per cycle",
  },
  {
    id: "amplify",
    number: "04",
    title: "Amplify",
    bullets: [
      "Post-launch optimization and testing loops",
      "Performance-led iteration across key channels",
    ],
    metricValue: 3.4,
    metricLabel: "average campaign lift",
    metricSuffix: "x",
  },
];

function InteractiveBook({ steps }: { steps: ProcessStep[] }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const activeStep = steps[activeIndex] ?? steps[0];
  const nextStep = steps[(activeIndex + 1) % steps.length] ?? steps[0];

  const goTo = (next: number) => {
    if (next < 0 || next >= steps.length) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  };

  return (
    <div className="space-y-5 md:space-y-7">
      <div className="relative mx-auto max-w-6xl md:[perspective:1400px]">
        <motion.div
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (reduceMotion) return;
            if (info.offset.x > 52) goTo(activeIndex - 1);
            if (info.offset.x < -52) goTo(activeIndex + 1);
          }}
          className="cc-card-solid relative min-h-[420px] overflow-hidden p-6 md:min-h-[470px] md:p-9"
          aria-label="Interactive process book"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-primary/10 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border/60" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeStep.id}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      rotateY: direction > 0 ? -12 : 12,
                      x: direction > 0 ? 24 : -24,
                    }
              }
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, rotateY: 0, x: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, rotateY: direction > 0 ? 9 : -9, x: direction > 0 ? -18 : 18 }
              }
              transition={{ duration: reduceMotion ? 0.14 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8"
            >
              <div className="space-y-5 md:space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-4 py-2">
                  <span className="font-playfair text-2xl leading-none text-primary">{activeStep.number}</span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    step
                  </span>
                </div>

                <h3 className="font-playfair text-[44px] leading-[1.02] tracking-tight text-primary md:text-[58px]">
                  {activeStep.title}
                </h3>

                <ul className="space-y-3">
                  {activeStep.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-base leading-relaxed text-foreground/85 md:text-lg">
                      <Dot className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Every step locks before the next begins, so strategy, creative, and execution stay aligned.
                </p>
              </div>

              <div className="cc-card h-fit space-y-4 self-end p-6 md:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">process metric</p>
                <div className="flex items-end gap-2">
                  <NumberCounter
                    value={activeStep.metricValue}
                    suffix={activeStep.metricSuffix ?? ""}
                    decimals={activeStep.metricValue % 1 === 0 ? 0 : 1}
                    once
                    duration={1.8}
                    className="font-playfair text-[48px] leading-none text-primary"
                  />
                </div>
                <p className="text-sm leading-relaxed text-foreground/75">{activeStep.metricLabel}</p>
                <div className="cc-divider" />
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  next up
                </p>
                <p className="font-playfair text-2xl leading-none text-primary">{nextStep.title}</p>
                <p className="text-sm leading-relaxed text-foreground/70">{nextStep.bullets[0]}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="btn-outline inline-flex min-h-11 items-center gap-2 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {steps.map((step, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Open step ${step.number}`}
                className={cn(
                  "h-3 rounded-full transition-all",
                  active ? "w-10 bg-primary" : "w-3 bg-border",
                )}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === steps.length - 1}
          className="btn-outline inline-flex min-h-11 items-center gap-2 disabled:pointer-events-none disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function MobileProcessStack({ steps }: { steps: ProcessStep[] }) {
  return (
    <ul className="space-y-4">
      {steps.map((step, index) => (
        <motion.li
          key={step.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.28, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
          <article className="cc-card-solid space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5">
                <span className="font-playfair text-xl leading-none text-primary">{step.number}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  step
                </span>
              </div>
              <NumberCounter
                value={step.metricValue}
                suffix={step.metricSuffix ?? ""}
                decimals={step.metricValue % 1 === 0 ? 0 : 1}
                once
                duration={1.6}
                className="font-playfair text-[30px] leading-none text-primary"
              />
            </div>

            <h3 className="font-playfair text-[34px] leading-[1.02] text-primary">{step.title}</h3>
            <ul className="space-y-2">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-base leading-relaxed text-foreground/80">
                  <Dot className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{step.metricLabel}</p>
          </article>
        </motion.li>
      ))}
    </ul>
  );
}

export function ProcessCreative() {
  return (
    <section id="process" className="cc-section">
      <Container>
        <MotionSafe>
          <SectionTitle
            title="How We Work"
            subtitle="A guided progression from insight to launch, presented as a tactile storybook with measurable outcomes at every step."
          />
        </MotionSafe>

        <MotionSafe amount={0.12} offsetY={18}>
          <div className="hidden md:block">
            <InteractiveBook steps={PROCESS_STEPS} />
          </div>
        </MotionSafe>

        <div className="md:hidden">
          <MobileProcessStack steps={PROCESS_STEPS} />
        </div>
      </Container>
    </section>
  );
}
