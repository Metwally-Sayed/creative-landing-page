"use client";

import { HighlightText } from "@/components/ui/highlight-text";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Film, Lightbulb, Palette, PenTool, Shapes, TrendingUp } from "lucide-react";

const services = [
  {
    title: "Brand Strategy",
    description: "Positioning and message architecture that keeps every channel consistent.",
    icon: <Lightbulb className="h-7 w-7" />,
    featured: true,
  },
  {
    title: "Visual Identity",
    description: "Logo, palette, and type systems built to last beyond campaign cycles.",
    icon: <Palette className="h-7 w-7" />,
  },
  {
    title: "Packaging",
    description: "Shelf-ready systems balancing storytelling, compliance, and conversion.",
    icon: <Shapes className="h-7 w-7" />,
  },
  {
    title: "Content Direction",
    description: "Editorial frameworks for social, launch, and always-on communication.",
    icon: <PenTool className="h-7 w-7" />,
  },
  {
    title: "Paid Creative",
    description: "Performance-minded ad concepts that preserve brand equity.",
    icon: <TrendingUp className="h-7 w-7" />,
  },
  {
    title: "3D Visuals",
    description: "Premium renders and motion assets with warm-neutral consistency.",
    icon: <Film className="h-7 w-7" />,
  },
];

export function Services() {
  return (
    <section id="services" className="cc-section bg-[#E5E5E3]">
      <div className="cc-container">
        <h2 className="mb-14 text-center font-playfair text-[30px] font-bold text-[#26437A] md:text-[48px]">
          Our <HighlightText variant="underline" color="accent">Expertise</HighlightText>
        </h2>
        <BentoGrid className="gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className={`rounded-[22px] border p-7 shadow-[0px_4px_20px_rgba(30,51,95,0.08)] ${
                service.featured
                  ? "border-white/10 bg-[#1E335F] text-white"
                  : "border-[#CBD2DC]/50 bg-white/65 text-[#1E335F]"
              }`}
            >
              <div className={`${service.featured ? "text-white/70" : "text-[#26437A]/60"}`}>{service.icon}</div>
              <h3 className="mt-4 text-xl font-medium">{service.title}</h3>
              <p className={`${service.featured ? "text-white/80" : "text-[#1E335F]/80"} mt-2 text-base leading-relaxed`}>
                {service.description}
              </p>
            </article>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
