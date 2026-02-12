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
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-[#CBD2DC]/30 bg-[#E5E5E3]/80 backdrop-blur-lg">
      <div className="cc-container h-full flex items-center justify-between">
        <a href="#" className="font-playfair text-2xl font-bold tracking-tight text-[#26437A]">
          Creative Core
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Magnetic key={link.href} intensity={0.1} range={90}>
              <a
                href={link.href}
                className="rounded-md px-1 py-1 text-base font-medium text-[#1E335F] transition-colors hover:text-[#26437A] focus-visible:ring-2 focus-visible:ring-[#E8874C] focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        <div className="hidden md:block">
          <Magnetic intensity={0.15} range={110}>
            <Button className="h-auto rounded-xl bg-[#E8874C] px-6 py-2.5 text-base font-semibold text-[#1E335F] hover:bg-[#DE7E45] focus-visible:ring-2 focus-visible:ring-[#E8874C] focus-visible:ring-offset-2">
              Let&apos;s Talk
            </Button>
          </Magnetic>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              className="rounded-lg p-2 text-[#1E335F] focus-visible:ring-2 focus-visible:ring-[#E8874C]"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] border-l border-[#CBD2DC]/30 bg-[#E5E5E3]">
            <div className="flex flex-col gap-2 pt-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-[#1E335F] transition-colors hover:bg-[#26437A]/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6 px-4">
                <Button className="h-12 w-full rounded-xl bg-[#E8874C] text-base font-semibold text-[#1E335F] hover:bg-[#DE7E45]">
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
