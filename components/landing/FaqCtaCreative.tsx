"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/landing/Container";
import { MotionSafe } from "@/components/landing/MotionSafe";
import { SectionTitle } from "@/components/landing/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  preview: string;
  deliverables?: string[];
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "engagement",
    question: "What does a typical engagement look like?",
    answer:
      "Most partnerships begin with a focused discovery sprint, then move into strategy and creative production. We define clear checkpoints, weekly reviews, and launch-ready handoff criteria from day one.",
    preview: "A structured discovery sprint followed by strategy and production cycles.",
    deliverables: ["Discovery Report", "Roadmap", "Weekly Review Cadence"],
  },
  {
    id: "startups",
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. We regularly support early-stage teams that need sharp positioning and clear brand systems before scaling acquisition. We adjust scope to match your current stage and runway.",
    preview: "We tailor strategic scope for early-stage teams and scaling milestones.",
    deliverables: ["Positioning Core", "Messaging Matrix"],
  },
  {
    id: "single-scope",
    question: "Can you handle just one piece (e.g., only packaging)?",
    answer:
      "Absolutely. We can engage on a focused scope such as packaging, content direction, or launch campaign assets while keeping room to expand into a broader system later.",
    preview: "Single-scope projects are supported with expansion paths built in.",
    deliverables: ["Scope Plan", "Execution Timeline"],
  },
  {
    id: "industries",
    question: "What industries do you specialize in?",
    answer:
      "Our methodology is industry-flexible, with recent projects across consumer goods, technology products, hospitality, and service brands. We adapt process depth based on category complexity.",
    preview: "Industry-flexible framework with category-specific depth.",
    deliverables: ["Category Audit", "Competitive Snapshot"],
  },
  {
    id: "pricing",
    question: "How do you price projects?",
    answer:
      "We scope by outcomes and deliverables, not by hourly tracking. After a short call, you receive a proposal with a clear investment model, milestones, and expected timeline.",
    preview: "Outcome-based pricing with fixed deliverables and milestones.",
    deliverables: ["Proposal", "Milestone Plan"],
  },
  {
    id: "strategy-includes",
    question: "What's included in brand strategy?",
    answer:
      "Brand strategy includes audience and competitor analysis, positioning, messaging hierarchy, verbal tone guidance, and the strategic narrative that shapes all creative execution.",
    preview: "Positioning and messaging foundation that informs every creative decision.",
    deliverables: ["Positioning Statement", "Message Architecture", "Narrative Framework"],
  },
];

export function FaqCtaCreative() {
  const reduceMotion = useReducedMotion();
  const [activeFaqId, setActiveFaqId] = React.useState<string>(FAQ_ITEMS[0]?.id ?? "");
  const [openFaq, setOpenFaq] = React.useState<string | undefined>(FAQ_ITEMS[0]?.id);

  const activeFaq = React.useMemo(
    () => FAQ_ITEMS.find((item) => item.id === activeFaqId) ?? FAQ_ITEMS[0],
    [activeFaqId],
  );

  return (
    <section id="faq" className="cc-section">
      <Container>
        <MotionSafe>
          <SectionTitle
            title="Common Questions"
            subtitle="Clear engagement details, process expectations, and deliverable scope before we start."
          />
        </MotionSafe>

        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Accordion
              type="single"
              collapsible
              value={openFaq}
              onValueChange={(value) => {
                setOpenFaq(value);
                if (value) setActiveFaqId(value);
              }}
              className="space-y-3"
            >
              {FAQ_ITEMS.map((item, index) => {
                const isActive = activeFaqId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.26,
                      delay: reduceMotion ? 0 : index * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={reduceMotion ? undefined : { scale: isActive ? 1.008 : 1.004 }}
                    className={cn(
                      "rounded-2xl border border-border/50 bg-card/70 px-5 transition-all",
                      "shadow-[var(--shadow-soft)]",
                      isActive ? "ring-1 ring-ring/50 shadow-[var(--shadow-float)]" : "",
                    )}
                  >
                    <AccordionItem value={item.id} className="border-0">
                      <AccordionTrigger
                        onFocus={() => setActiveFaqId(item.id)}
                        onMouseEnter={() => setActiveFaqId(item.id)}
                        className="py-5 text-left text-base font-medium text-foreground hover:no-underline md:text-xl [&>svg]:text-primary"
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pt-1 text-base leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </motion.div>

          <motion.aside
            initial={reduceMotion ? undefined : { opacity: 0, x: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="cc-card-solid sticky top-24 hidden overflow-hidden p-6 lg:block"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-primary/10 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary/10 to-transparent" />

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              preview spotlight
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeFaq.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <h3 className="font-playfair text-[38px] leading-[1.04] text-primary">{activeFaq.question}</h3>
                <p className="text-base leading-relaxed text-foreground/80">{activeFaq.preview}</p>

                {activeFaq.deliverables?.length ? (
                  <div className="space-y-3">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      related deliverables
                    </p>
                    <ul className="space-y-2">
                      {activeFaq.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-center gap-2 text-sm text-foreground/85">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
