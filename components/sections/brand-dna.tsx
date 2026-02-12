"use client";

import SegmentedButton from "@/components/ui/segmented-button";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const options = [
  { id: "logo", label: "Logo" },
  { id: "palette", label: "Palette" },
  { id: "typography", label: "Typography" },
  { id: "packaging", label: "Packaging" },
  { id: "social", label: "Social Templates" },
];

const content = {
  logo: {
    title: "Core Mark",
    description: "Lockups and variants that hold recognition across every format.",
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=900&h=700&fit=crop",
  },
  palette: {
    title: "Color System",
    description: "Intentional color hierarchy designed for premium editorial contrast.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=700&fit=crop",
  },
  typography: {
    title: "Type Pairing",
    description: "A serif-led display with clean UI type for clarity and rhythm.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=900&h=700&fit=crop",
  },
  packaging: {
    title: "Packaging Set",
    description: "Mockups and dieline-ready visuals built for shelf impact.",
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=900&h=700&fit=crop",
  },
  social: {
    title: "Social Templates",
    description: "Reusable modular templates for launch and always-on campaigns.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=900&h=700&fit=crop",
  },
};

export function BrandDNA() {
  const [activeTab, setActiveTab] = useState("logo");
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeContent = content[activeTab as keyof typeof content];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="cc-section bg-[#E5E5E3]">
      <div className="cc-container">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-playfair text-[30px] font-bold text-[#26437A] md:text-[48px]">Brand DNA Layers</h2>
          <p className="mt-2 text-base text-[#1E335F]/80 md:text-lg">Explore how each layer contributes to the final system composition.</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-10 md:gap-10">
          <div className="order-2 md:order-1 md:col-span-6">
            <motion.div
              key={activeTab}
              initial={reducedMotion ? false : { opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#CBD2DC]/50 bg-white shadow-[0px_4px_20px_rgba(30,51,95,0.08)]"
            >
              <Image src={activeContent.image} alt={activeContent.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E335F]/20 to-transparent" />
            </motion.div>
          </div>

          <div className="order-1 md:order-2 md:col-span-4">
            <SegmentedButton buttons={options} defaultActive="logo" onChange={setActiveTab} className="w-full bg-white p-1" />
            <div className="mt-5 rounded-[20px] border border-[#CBD2DC]/50 bg-white/70 p-5">
              <h3 className="font-playfair text-2xl text-[#26437A]">{activeContent.title}</h3>
              <p className="mt-2 text-base text-[#1E335F]/80">{activeContent.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
