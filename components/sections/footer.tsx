import { Button } from "@/components/ui/button";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

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

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground/70">
        {title}
      </h4>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-accent text-accent-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-accent to-secondary/10" />
      <div className="pointer-events-none absolute -left-20 top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />

      <div className="cc-container relative py-14 md:py-20">
        <div className="grid gap-8 border-b border-accent-foreground/15 pb-10 md:grid-cols-[1.2fr_0.8fr] md:pb-12">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground/65">
              Creative Core
            </p>
            <h2 className="max-w-2xl font-playfair text-[34px] leading-[1.08] text-accent-foreground md:text-[56px]">
              Built to make your brand unmistakable.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-accent-foreground/75 md:text-lg">
              Strategy, identity, and content systems that stay coherent from first impression to full campaign rollout.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#faq" className="btn-primary">
                Start Project
              </a>
              <a
                href="#work"
                className="btn-outline border-accent-foreground/40 text-accent-foreground hover:border-accent-foreground/65 hover:bg-accent-foreground/10"
              >
                View Work
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-accent-foreground/20 bg-accent-foreground/10 p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground/65">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-3 text-sm text-accent-foreground/85 md:text-base">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:hello@creativecore.studio" className="transition-colors hover:text-accent-foreground">
                  hello@creativecore.studio
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-accent-foreground/85 md:text-base">
                <Phone className="h-4 w-4 text-secondary" />
                <a href="tel:+966538639332" className="transition-colors hover:text-accent-foreground">
                  +966 53 863 9332
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-accent-foreground/65">
              Riyadh, Saudi Arabia
              <br />
              Sun-Thu, 9:00 AM to 6:00 PM
            </p>
          </div>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-4 md:gap-10">
          <FooterColumn title="Navigation">
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-accent-foreground/65 transition-colors hover:text-accent-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Services">
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((service) => (
                <li key={service} className="text-sm text-accent-foreground/65">
                  {service}
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Social">
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-accent-foreground/65 transition-colors hover:text-accent-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Legal">
            <ul className="space-y-2.5">
              <li>
                <a href="/privacy" className="text-sm text-accent-foreground/65 transition-colors hover:text-accent-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-accent-foreground/65 transition-colors hover:text-accent-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-sm text-accent-foreground/65 transition-colors hover:text-accent-foreground">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className="border-t border-accent-foreground/15 pt-6 text-center md:text-left">
          <p className="text-sm text-accent-foreground/45">© 2026 Creative Core. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-secondary/95 shadow-[var(--shadow-float)] backdrop-blur-sm md:hidden">
      <Button className="h-14 w-full touch-manipulation rounded-none bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/90">
        Book a Call
      </Button>
    </div>
  );
}
