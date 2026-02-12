"use client";

import { RichTooltip } from "@/components/ui/animated-tooltip";
import { StatCounter } from "@/components/ui/number-counter";

const logos = [
  "NOTION",
  "FIGMA",
  "FRAMER",
  "SLACK",
  "LAYERS",
];

const stats = [
  { value: 50, suffix: "+", label: "Brands Transformed", detail: "50+ (placeholder) engagements across categories." },
  { value: 4.9, suffix: "★", label: "Client Satisfaction", detail: "4.9★ (placeholder) average partner rating." },
  { value: 12, suffix: "+", label: "Years of Expertise", detail: "12+ (placeholder) years in strategy and production." },
];

export function SocialProof() {
  return (
    <section className="cc-strip border-y border-[#CBD2DC]/30 bg-white">
      <div className="cc-container">
        <div className="flex items-center gap-8 overflow-x-auto pb-2 md:justify-center md:gap-16 md:pb-0">
          {logos.map((logo) => (
            <div key={logo} className="shrink-0 text-sm font-semibold tracking-[0.22em] text-[#1E335F] opacity-50 transition-opacity hover:opacity-100" aria-label={logo}>
              {logo}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 grid max-w-[900px] grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {stats.map((stat) => (
            <RichTooltip key={stat.label} title={stat.label} description={stat.detail}>
              <div className="rounded-[20px] border border-[#CBD2DC]/50 bg-white/65 p-5 text-center shadow-[0px_4px_20px_rgba(30,51,95,0.08)]">
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 ? 1 : 0}
                  label={stat.label}
                  className="[&_span]:text-[#26437A] [&_span]:text-4xl [&_span]:font-playfair [&_p]:mt-1 [&_p]:text-sm [&_p]:font-medium [&_p]:text-[#1E335F]/70"
                />
                <p className="mt-2 text-xs text-[#1E335F]/60">{stat.detail}</p>
              </div>
            </RichTooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
