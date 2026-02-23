"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Copy, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BriefBuilderTrigger } from "./BriefBuilderTrigger";

type StepId = "goals" | "scope" | "timeline" | "contact";

type ContactMethod = "email" | "phone" | "whatsapp" | "";

type BriefData = {
  goals: string[];
  context: string;
  services: string[];
  deliverables: string[];
  timeline: string;
  budget: string;
  notes: string;
  name: string;
  email: string;
  company: string;
  contactMethod: ContactMethod;
};

type StepItem = {
  id: StepId;
  index: string;
  label: string;
  title: string;
  description: string;
};

const STEP_ITEMS: StepItem[] = [
  {
    id: "goals",
    index: "01",
    label: "Goals",
    title: "Project Goals",
    description: "Define the primary outcomes this engagement should unlock.",
  },
  {
    id: "scope",
    index: "02",
    label: "Scope",
    title: "Scope & Deliverables",
    description: "Outline service focus and expected deliverables.",
  },
  {
    id: "timeline",
    index: "03",
    label: "Timeline",
    title: "Timeline & Budget",
    description: "Set an expected schedule and budget signal.",
  },
  {
    id: "contact",
    index: "04",
    label: "Contact",
    title: "Contact Details",
    description: "Share the best details for follow-up.",
  },
];

const GOAL_OPTIONS = [
  "Brand Strategy",
  "Visual Identity",
  "Website",
  "Content System",
  "Launch Campaign",
] as const;

const SERVICE_OPTIONS = [
  "Strategy",
  "Identity",
  "Web Design",
  "Development",
  "Content",
  "Motion / 3D",
] as const;

const DELIVERABLE_OPTIONS = [
  "Logo + Usage",
  "Design System",
  "Landing Page",
  "Pitch Deck",
  "Packaging",
  "Guidelines",
] as const;

const TIMELINE_OPTIONS = ["2-3 weeks", "4-6 weeks", "6-10 weeks", "Flexible"] as const;
const BUDGET_OPTIONS = ["< $5k", "$5-10k", "$10-25k", "$25k+", "Not sure"] as const;
const CONTACT_OPTIONS = ["email", "phone", "whatsapp"] as const;

const INITIAL_DATA: BriefData = {
  goals: [],
  context: "",
  services: [],
  deliverables: [],
  timeline: "",
  budget: "",
  notes: "",
  name: "",
  email: "",
  company: "",
  contactMethod: "",
};

const STEP_ORDER: StepId[] = ["goals", "scope", "timeline", "contact"];

function toggleValue(items: string[], value: string) {
  if (items.includes(value)) return items.filter((entry) => entry !== value);
  return [...items, value];
}

function formatList(items: string[]) {
  if (items.length === 0) return "Not selected";
  return items.join(", ");
}

function StepChip({
  active,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "min-h-10 rounded-full border border-border/50 px-3 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "bg-primary text-primary-foreground" : "bg-card/70 text-foreground/80 hover:bg-card",
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function SummaryBlock({
  data,
  onCopy,
  copied,
}: {
  data: BriefData;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="cc-card space-y-4 border-border/50 bg-card/70 p-4 md:p-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Live Summary</p>
        <h4 className="mt-2 font-playfair text-[28px] leading-[1.05] text-primary">Brief Draft</h4>
      </div>
      <div className="cc-divider" />

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Goals</dt>
          <dd className="text-foreground/85">{formatList(data.goals)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Services</dt>
          <dd className="text-foreground/85">{formatList(data.services)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Deliverables</dt>
          <dd className="text-foreground/85">{formatList(data.deliverables)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Timeline</dt>
          <dd className="text-foreground/85">{data.timeline || "Not selected"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Budget</dt>
          <dd className="text-foreground/85">{data.budget || "Not selected"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Contact</dt>
          <dd className="text-foreground/85">
            {data.email || "No contact yet"}
            {data.name ? ` (${data.name})` : ""}
          </dd>
        </div>
      </dl>

      <button type="button" className="btn-outline w-full" onClick={onCopy}>
        <Copy className="h-4 w-4" />
        {copied ? "Copied" : "Copy Brief"}
      </button>
    </div>
  );
}

function GoalsStep({
  data,
  onUpdate,
}: {
  data: BriefData;
  onUpdate: React.Dispatch<React.SetStateAction<BriefData>>;
}) {
  return (
    <div className="space-y-4">
      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Goal Focus</h5>
        <p className="mt-1 text-sm text-muted-foreground">Select one or more strategic outcomes.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((goal) => (
            <StepChip
              key={goal}
              active={data.goals.includes(goal)}
              onClick={() => onUpdate((prev) => ({ ...prev, goals: toggleValue(prev.goals, goal) }))}
            >
              {goal}
            </StepChip>
          ))}
        </div>
      </section>

      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Project Context</h5>
        <p className="mt-1 text-sm text-muted-foreground">Share concise business context, audience, and challenge.</p>
        <Textarea
          rows={4}
          value={data.context}
          onChange={(event) => onUpdate((prev) => ({ ...prev, context: event.target.value }))}
          placeholder="We are relaunching our brand for a new market segment..."
          className="mt-3 resize-none border-border/60 bg-background/80 text-foreground placeholder:text-muted-foreground"
        />
      </section>
    </div>
  );
}

function ScopeStep({
  data,
  onUpdate,
}: {
  data: BriefData;
  onUpdate: React.Dispatch<React.SetStateAction<BriefData>>;
}) {
  return (
    <div className="space-y-4">
      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Services Checklist</h5>
        <p className="mt-1 text-sm text-muted-foreground">Choose the service lanes you want included.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((service) => {
            const active = data.services.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => onUpdate((prev) => ({ ...prev, services: toggleValue(prev.services, service) }))}
                className={cn(
                  "cc-card-solid border-border/50 p-3 text-left transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "ring-1 ring-ring/30 shadow-[var(--shadow-soft)]" : "",
                )}
              >
                <span className="text-sm font-medium text-foreground">{service}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Deliverables</h5>
        <p className="mt-1 text-sm text-muted-foreground">
          Select the primary outputs you expect from this engagement.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DELIVERABLE_OPTIONS.map((deliverable) => (
            <StepChip
              key={deliverable}
              active={data.deliverables.includes(deliverable)}
              onClick={() =>
                onUpdate((prev) => ({ ...prev, deliverables: toggleValue(prev.deliverables, deliverable) }))
              }
            >
              {deliverable}
            </StepChip>
          ))}
        </div>
      </section>
    </div>
  );
}

function TimelineStep({
  data,
  onUpdate,
}: {
  data: BriefData;
  onUpdate: React.Dispatch<React.SetStateAction<BriefData>>;
}) {
  return (
    <div className="space-y-4">
      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Timeline</h5>
        <p className="mt-1 text-sm text-muted-foreground">Select the expected project window.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TIMELINE_OPTIONS.map((option) => (
            <StepChip
              key={option}
              active={data.timeline === option}
              onClick={() => onUpdate((prev) => ({ ...prev, timeline: option }))}
            >
              {option}
            </StepChip>
          ))}
        </div>
      </section>

      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Budget Signal</h5>
        <p className="mt-1 text-sm text-muted-foreground">Optional: choose an approximate investment range.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <StepChip
              key={option}
              active={data.budget === option}
              onClick={() => onUpdate((prev) => ({ ...prev, budget: option }))}
            >
              {option}
            </StepChip>
          ))}
        </div>
        <Textarea
          rows={3}
          value={data.notes}
          onChange={(event) => onUpdate((prev) => ({ ...prev, notes: event.target.value }))}
          placeholder="Any constraints, launch dates, or notes..."
          className="mt-3 resize-none border-border/60 bg-background/80 text-foreground placeholder:text-muted-foreground"
        />
      </section>
    </div>
  );
}

function ContactStep({
  data,
  onUpdate,
  emailError,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  data: BriefData;
  onUpdate: React.Dispatch<React.SetStateAction<BriefData>>;
  emailError?: string;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="space-y-4">
      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Contact Details</h5>
        <p className="mt-1 text-sm text-muted-foreground">We will follow up with a tailored next-step proposal.</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Name</span>
            <Input
              value={data.name}
              onChange={(event) => onUpdate((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Your name"
              className="border-border/60 bg-background/80 text-foreground placeholder:text-muted-foreground"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Email</span>
            <Input
              value={data.email}
              onChange={(event) => onUpdate((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@company.com"
              className={cn(
                "border-border/60 bg-background/80 text-foreground placeholder:text-muted-foreground",
                emailError ? "border-destructive/40 ring-1 ring-destructive/30" : "",
              )}
            />
            {emailError ? <p className="text-xs text-destructive/90">{emailError}</p> : null}
          </label>

          <label className="space-y-1.5 sm:col-span-2">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Company</span>
            <Input
              value={data.company}
              onChange={(event) => onUpdate((prev) => ({ ...prev, company: event.target.value }))}
              placeholder="Company name"
              className="border-border/60 bg-background/80 text-foreground placeholder:text-muted-foreground"
            />
          </label>
        </div>
      </section>

      <section className="cc-card-solid border-border/50 p-4 md:p-5">
        <h5 className="text-base font-medium text-foreground md:text-lg">Preferred Contact</h5>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONTACT_OPTIONS.map((option) => (
            <StepChip
              key={option}
              active={data.contactMethod === option}
              onClick={() => onUpdate((prev) => ({ ...prev, contactMethod: option }))}
            >
              {option}
            </StepChip>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onSubmit} className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Submitting...
            </>
          ) : (
            "Submit Brief"
          )}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </div>
  );
}

interface BriefBuilderDialogProps {
  triggerClassName?: string;
}

export function BriefBuilderDialog({ triggerClassName }: BriefBuilderDialogProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState<StepId>("goals");
  const [data, setData] = React.useState<BriefData>(INITIAL_DATA);
  const [copied, setCopied] = React.useState(false);
  const [emailError, setEmailError] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const activeItem = React.useMemo(
    () => STEP_ITEMS.find((item) => item.id === activeStep) ?? STEP_ITEMS[0],
    [activeStep],
  );
  const activeIndex = STEP_ORDER.indexOf(activeStep);

  const summaryText = React.useMemo(() => {
    return [
      "Creative Core Brief",
      `Goals: ${formatList(data.goals)}`,
      `Context: ${data.context || "Not provided"}`,
      `Services: ${formatList(data.services)}`,
      `Deliverables: ${formatList(data.deliverables)}`,
      `Timeline: ${data.timeline || "Not selected"}`,
      `Budget: ${data.budget || "Not selected"}`,
      `Notes: ${data.notes || "None"}`,
      `Name: ${data.name || "Not provided"}`,
      `Email: ${data.email || "Not provided"}`,
      `Company: ${data.company || "Not provided"}`,
      `Preferred Contact: ${data.contactMethod || "Not selected"}`,
    ].join("\n");
  }, [data]);

  const goToStep = (next: StepId) => setActiveStep(next);

  const goNext = () => {
    if (activeIndex >= STEP_ORDER.length - 1) return;
    const nextStep = STEP_ORDER[activeIndex + 1];
    if (nextStep) setActiveStep(nextStep);
  };

  const goBack = () => {
    if (activeIndex <= 0) return;
    const prevStep = STEP_ORDER[activeIndex - 1];
    if (prevStep) setActiveStep(prevStep);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setEmailError("");
  };

  const handleSubmit = () => {
    if (!data.email.trim()) {
      setEmailError("Email is required.");
      return;
    }

    setEmailError("");
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 850);
  };

  const renderStepContent = () => {
    if (activeStep === "goals") return <GoalsStep data={data} onUpdate={setData} />;
    if (activeStep === "scope") return <ScopeStep data={data} onUpdate={setData} />;
    if (activeStep === "timeline") return <TimelineStep data={data} onUpdate={setData} />;
    return (
      <ContactStep
        data={data}
        onUpdate={setData}
        emailError={emailError}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        isSubmitting={isSubmitting}
      />
    );
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <BriefBuilderTrigger
          className={cn(
            "border-accent-foreground/45 text-accent-foreground",
            "hover:bg-accent-foreground/10 focus-visible:ring-offset-accent",
            triggerClassName,
          )}
        />
      </DialogPrimitive.Trigger>

      <AnimatePresence>
        {open ? (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                className="fixed inset-x-3 top-1/2 z-50 mx-auto w-full max-w-[960px] -translate-y-1/2 outline-none md:inset-x-6"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.985 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                <DialogPrimitive.Title className="sr-only">Brief Builder</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Guided multi-step brief builder with live summary preview.
                </DialogPrimitive.Description>

                <motion.div
                  layoutId="brief-builder-shell"
                  className="cc-card-solid relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-b from-card to-background p-4 shadow-[var(--shadow-float)] md:p-6"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary/10 to-transparent" />

                  <header className="relative mb-5 border-b border-border/40 pb-4 md:mb-6 md:pb-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Creative Core
                    </p>
                    <h3 className="mt-2 font-playfair text-[34px] leading-[1.06] text-primary md:text-[46px]">
                      Brief Builder
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base">
                      Shape your project brief in four short steps with a live summary view.
                    </p>

                    <DialogPrimitive.Close asChild>
                      <button
                        type="button"
                        aria-label="Close brief builder"
                        className={cn(
                          "absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-full",
                          "border border-border/60 bg-card/80 text-foreground/75 transition-colors hover:text-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        )}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </DialogPrimitive.Close>
                  </header>

                  <div className="relative grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:gap-5">
                    <aside className="hidden lg:block">
                      <nav aria-label="Brief steps" className="space-y-2">
                        {STEP_ITEMS.map((step) => {
                          const active = step.id === activeStep;
                          return (
                            <button
                              key={step.id}
                              type="button"
                              onClick={() => goToStep(step.id)}
                              className={cn(
                                "w-full rounded-2xl border border-border/50 bg-card/60 p-3 text-left transition-all",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                active ? "scale-[1.01] ring-1 ring-ring/30 shadow-[var(--shadow-soft)]" : "",
                              )}
                            >
                              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                {step.index}
                              </p>
                              <p className="mt-1 text-sm font-medium text-foreground">{step.label}</p>
                            </button>
                          );
                        })}
                      </nav>
                    </aside>

                    <main className="space-y-4">
                      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                        {STEP_ITEMS.map((step) => {
                          const active = step.id === activeStep;
                          return (
                            <button
                              key={step.id}
                              type="button"
                              onClick={() => goToStep(step.id)}
                              className={cn(
                                "min-h-10 rounded-full border border-border/50 px-3 text-sm whitespace-nowrap",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                active ? "bg-primary text-primary-foreground" : "bg-card/70 text-foreground/80",
                              )}
                            >
                              {step.index} {step.label}
                            </button>
                          );
                        })}
                      </div>

                      <section className="cc-card-solid space-y-2 border-border/50 p-4 md:p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Step {activeItem.index}
                        </p>
                        <h4 className="font-playfair text-[30px] leading-[1.06] text-primary md:text-[36px]">
                          {activeItem.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
                          {activeItem.description}
                        </p>
                      </section>

                      {renderStepContent()}

                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={goBack}
                          disabled={activeIndex === 0}
                          className="btn-outline disabled:pointer-events-none disabled:opacity-40"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Back
                        </button>
                        {activeStep !== "contact" ? (
                          <button type="button" onClick={goNext} className="btn-primary">
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>

                      {submitSuccess ? (
                        <div className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-sm text-foreground/85">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Brief submitted successfully. We will reply shortly.</span>
                        </div>
                      ) : null}
                    </main>

                    <aside className="hidden lg:block">
                      <div className="sticky top-3">
                        <SummaryBlock data={data} onCopy={handleCopy} copied={copied} />
                      </div>
                    </aside>
                  </div>

                  <div className="mt-4 lg:hidden">
                    <details className="cc-card border-border/50 bg-card/70 p-4">
                      <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                        Review Summary
                      </summary>
                      <div className="mt-3">
                        <SummaryBlock data={data} onCopy={handleCopy} copied={copied} />
                      </div>
                    </details>
                  </div>
                </motion.div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
