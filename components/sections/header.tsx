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
    <header className="sticky top-0 z-50 h-20 bg-[#E5E5E3]/80 backdrop-blur-lg border-b border-[#CBD2DC]/30">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-playfair text-2xl font-bold text-[#26437A] tracking-tight">
          Creative Core
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Magnetic key={link.href} intensity={0.1} range={100}>
              <a
                href={link.href}
                className="text-[#1E335F] font-medium text-base hover:text-[#26437A] transition-colors focus-visible:ring-2 focus-visible:ring-[#E8874C] focus-visible:ring-offset-2 rounded-md px-1 py-0.5"
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
              className="border-[#26437A] text-[#26437A] hover:bg-[#26437A]/5 rounded-xl px-6 py-2.5 font-semibold text-base focus-visible:ring-2 focus-visible:ring-[#E8874C] focus-visible:ring-offset-2"
            >
              Let&apos;s Talk
            </Button>
          </Magnetic>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              className="p-2 text-[#1E335F] focus-visible:ring-2 focus-visible:ring-[#E8874C] rounded-lg"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#E5E5E3] border-l border-[#CBD2DC]/30 w-[300px]">
            <div className="flex flex-col pt-12 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[#1E335F] font-medium text-lg py-4 px-4 hover:bg-[#26437A]/5 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6 px-4">
                <Button className="w-full bg-[#E8874C] text-[#1E335F] hover:bg-[#DE7E45] rounded-xl py-3 font-semibold text-base">
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
