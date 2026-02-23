"use client";

import { HoverPreviewProvider } from "@/components/ui/hover-preview";
import SegmentedButton from "@/components/ui/segmented-button";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const options = [
  { id: "strategy", label: "Strategy" },
  { id: "creative", label: "Creative" },
  { id: "technology", label: "Technology" },
];

const content = {
  strategy: {
    title: "Insight driven.",
    description: "We dig deep to find the truth of your brand. No fluff, just foundational strategy that positions you to win.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    features: ["Market Analysis", "Brand Positioning", "User Research"]
  },
  creative: {
    title: "Design led.",
    description: "Visuals that stop the scroll. We craft distinct identities and interfaces that feel like a breath of fresh air.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    features: ["Visual Identity", "UI/UX Design", "Motion Graphics"]
  },
  technology: {
    title: "Code powered.",
    description: "Pixel-perfect implementation. We build robust, scalable platforms that perform as good as they look.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    features: ["Web Development", "App Development", "Performance Optimization"]
  }
};

const previewData = {
  strategy: {
    title: "Strategy",
    subtitle: "The Foundation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  creative: {
    title: "Creative",
    subtitle: "The Expression",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop"
  },
  technology: {
    title: "Technology",
    subtitle: "The Engine",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"
  }
};

export function BrandDNA() {
  const [activeTab, setActiveTab] = useState("strategy");
  const activeContent = content[activeTab as keyof typeof content];

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">

          {/* Left: Controls & Text */}
          <div className="flex-1 space-y-8">
            <h2 className="font-playfair text-[36px] font-bold leading-[1.1] text-primary md:text-[56px]">
              The layers of<br />your brand DNA.
            </h2>

            {/* Desktop: Hover Preview Integration */}
            <div className="hidden md:block">
              <HoverPreviewProvider data={previewData} className="inline-block">
                <div className="flex flex-col gap-2 items-start">
                  <p className="mb-4 text-foreground/60">Explore our capabilities:</p>
                  {/* We wrap the segmented button but HoverPreviewLink needs to wrap specific text. 
                       Actually, the SegmentedButton handles clicks. We want hover preview on the BUTTON labels? 
                       SegmentedButton component doesn't easily expose children for wrapping. 
                       Let's just use SegmentedButton for functionality and HoverPreview for a separate list or just skip HoverPreview here to keep it simple as per "Brand DNA Layers" spec which emphasizes the switch.
                       Actually, spec says "Segmented Button controls".
                       Let's stick to just SegmentedButton interactions changing the content.
                   */}
                  <SegmentedButton
                    buttons={options}
                    defaultActive="strategy"
                    onChange={setActiveTab}
                    className=""
                  />
                </div>
              </HoverPreviewProvider>
            </div>

            {/* Mobile: Simple Segmented Button */}
            <div className="block md:hidden">
              <SegmentedButton
                buttons={options}
                defaultActive="strategy"
                onChange={setActiveTab}
                className="w-full max-w-sm"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 min-h-[200px]"
              >
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-secondary">{activeContent.title}</h3>
                  <p className="max-w-md text-lg leading-relaxed text-foreground">
                    {activeContent.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {activeContent.features.map(feature => (
                    <li key={feature} className="flex items-center text-foreground/80">
                      <div className="mr-3 h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Visual */}
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl"
              >
                <Image
                  src={activeContent.image}
                  alt={activeContent.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
