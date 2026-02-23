"use client";

import * as React from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BriefBuilderDialog } from "@/components/brief-builder/BriefBuilderDialog";
import { Container } from "@/components/landing/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

const SERVICE_LINKS = [
  "Brand Strategy",
  "Digital Experience",
  "Content Direction",
  "Motion & 3D",
] as const;

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "X / Twitter", href: "https://x.com" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
] as const;

const STAGGER_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Spark = {
  id: number;
  x: number;
  y: number;
};

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground/70">{title}</h4>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm text-accent-foreground/70 transition-colors",
        "hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-accent",
      )}
    >
      {children}
      {external ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
    </a>
  );
}

export function FooterRefactor() {
  const reduceMotion = useReducedMotion();
  const [spark, setSpark] = React.useState<Spark | null>(null);
  const sparkId = React.useRef(0);
  const ctaRef = React.useRef<HTMLDivElement | null>(null);
  const columnVariants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  React.useEffect(() => {
    if (!spark) return;
    const timer = window.setTimeout(() => setSpark(null), 420);
    return () => window.clearTimeout(timer);
  }, [spark]);

  const handlePrimaryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ctaRef.current) return;
    const containerRect = ctaRef.current.getBoundingClientRect();
    const targetRect = event.currentTarget.getBoundingClientRect();
    sparkId.current += 1;
    setSpark({
      id: sparkId.current,
      x: targetRect.left - containerRect.left + targetRect.width / 2,
      y: targetRect.top - containerRect.top + targetRect.height / 2,
    });
  };

  return (
    <footer className="relative overflow-hidden bg-accent text-accent-foreground">
      <section className="relative border-t border-accent-foreground/15">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-accent to-secondary/15" />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-accent to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-accent to-transparent" />

        <Container className="relative py-12 md:py-16">
          <motion.div
            ref={ctaRef}
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.32, ease: STAGGER_EASE }}
            className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-10"
          >
            <div className="space-y-3">
              <h2 className="font-playfair text-[36px] leading-[1.08] text-accent-foreground md:text-[58px]">
                Built to make your brand unmistakable.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-accent-foreground/80 md:text-lg">
                One focused engagement to align strategy, design, and launch momentum.
              </p>
            </div>

            <div className="relative flex flex-wrap items-center gap-3 md:justify-end">
              <AnimatePresence>
                {spark
                  ? Array.from({ length: 8 }).map((_, index) => {
                      const angle = (index / 8) * Math.PI * 2;
                      const distance = 14 + (index % 2) * 6;
                      return (
                        <motion.span
                          key={`${spark.id}-${index}`}
                          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-secondary"
                          style={{ left: spark.x, top: spark.y }}
                          initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                          animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: 0,
                            scale: 0.7,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      );
                    })
                  : null}
              </AnimatePresence>

              <a
                href="#faq"
                className="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                onClick={handlePrimaryClick}
              >
                Start Project
              </a>
              <BriefBuilderDialog triggerClassName="border-accent-foreground/45 text-accent-foreground hover:bg-accent-foreground/10 focus-visible:ring-offset-accent" />
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="relative">
        <Container className="py-10 md:py-12">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, ease: STAGGER_EASE }}
            className="grid gap-8 md:hidden"
          >
            <FooterColumn title="Creative Core">
              <p className="text-sm leading-relaxed text-accent-foreground/70">
                Strategy-first creative partner for premium growth brands.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-accent-foreground/70">
                  <Mail className="h-4 w-4 text-secondary" />
                  <a
                    href="mailto:hello@creativecore.studio"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                  >
                    hello@creativecore.studio
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-accent-foreground/70">
                  <Phone className="h-4 w-4 text-secondary" />
                  <a
                    href="tel:+966538639332"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                  >
                    +966 53 863 9332
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-accent-foreground/70">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>Riyadh, Saudi Arabia</span>
                </li>
              </ul>
            </FooterColumn>

            <div className="cc-divider bg-accent-foreground/20" />

            <FooterColumn title="Navigation">
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Services">
              <ul className="space-y-2.5">
                {SERVICE_LINKS.map((service) => (
                  <li key={service} className="text-sm text-accent-foreground/70">
                    {service}
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Social">
              <ul className="space-y-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <FooterLink href={social.href} external>
                      {social.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Legal">
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map((legal) => (
                  <li key={legal.href}>
                    <FooterLink href={legal.href}>{legal.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.06,
                },
              },
            }}
            className="hidden gap-10 md:grid md:grid-cols-5"
          >
            <motion.li
              variants={columnVariants}
              transition={{ duration: 0.26, ease: STAGGER_EASE }}
              className="space-y-4"
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground/70">
                Creative Core
              </h4>
              <p className="text-sm leading-relaxed text-accent-foreground/70">
                Strategy-first creative partner for premium growth brands.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-accent-foreground/70">
                  <Mail className="h-4 w-4 text-secondary" />
                  <a
                    href="mailto:hello@creativecore.studio"
                    className="transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                  >
                    hello@creativecore.studio
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-accent-foreground/70">
                  <Phone className="h-4 w-4 text-secondary" />
                  <a
                    href="tel:+966538639332"
                    className="transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                  >
                    +966 53 863 9332
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-accent-foreground/70">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>Riyadh, Saudi Arabia</span>
                </li>
              </ul>
            </motion.li>

            <motion.li
              variants={columnVariants}
              transition={{ duration: 0.26, ease: STAGGER_EASE }}
            >
              <FooterColumn title="Navigation">
                <ul className="space-y-2.5">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.li>

            <motion.li
              variants={columnVariants}
              transition={{ duration: 0.26, ease: STAGGER_EASE }}
            >
              <FooterColumn title="Services">
                <ul className="space-y-2.5">
                  {SERVICE_LINKS.map((service) => (
                    <li key={service} className="text-sm text-accent-foreground/70">
                      {service}
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.li>

            <motion.li
              variants={columnVariants}
              transition={{ duration: 0.26, ease: STAGGER_EASE }}
            >
              <FooterColumn title="Social">
                <ul className="space-y-2.5">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.label}>
                      <FooterLink href={social.href} external>
                        {social.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.li>

            <motion.li
              variants={columnVariants}
              transition={{ duration: 0.26, ease: STAGGER_EASE }}
            >
              <FooterColumn title="Legal">
                <ul className="space-y-2.5">
                  {LEGAL_LINKS.map((legal) => (
                    <li key={legal.href}>
                      <FooterLink href={legal.href}>{legal.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.li>
          </motion.ul>

          <div className="mt-9 border-t border-accent-foreground/20 pt-5">
            <div className="flex flex-col gap-3 text-sm text-accent-foreground/55 md:flex-row md:items-center md:justify-between">
              <p>© 2026 Creative Core. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <FooterLink href="/privacy">Privacy</FooterLink>
                <FooterLink href="/terms">Terms</FooterLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}

export function StickyMobileCTARefactor() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-secondary/95 shadow-[var(--shadow-float)] backdrop-blur-sm md:hidden">
      <Button className="h-14 w-full touch-manipulation rounded-none bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/90">
        Book a Call
      </Button>
    </div>
  );
}
