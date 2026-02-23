"use client";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-border/30 bg-background/80 backdrop-blur-lg">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-playfair text-2xl font-bold text-primary tracking-tight">
          Creative Core
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Magnetic key={link.href} intensity={0.1} range={100}>
              <a
                href={link.href}
                className="rounded-md px-1 py-0.5 text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Magnetic intensity={0.15} range={120}>
            <Button
              variant="outline"
              className="rounded-xl border-primary px-6 py-2.5 text-base font-semibold text-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Let&apos;s Talk
            </Button>
          </Magnetic>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              className="rounded-lg p-2 text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            title="Navigation menu"
            description="Mobile navigation links and primary call to action."
            className="w-[300px] border-l border-border/30 bg-background"
          >
            <div className="flex flex-col pt-12 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-foreground transition-colors hover:bg-primary/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6 px-4">
                <Button className="w-full rounded-xl bg-secondary py-3 text-base font-semibold text-secondary-foreground hover:bg-secondary/90">
                  Let&apos;s Talk
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
