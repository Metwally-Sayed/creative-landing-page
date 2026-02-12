"use client";

import { Button } from "@/components/ui/button";
import { HighlightText } from "@/components/ui/highlight-text";
import type { ImageData } from "@/components/ui/image-sphere";
import ImageSphere from "@/components/ui/image-sphere";
import { Magnetic } from "@/components/ui/magnetic";
import { MagneticText } from "@/components/ui/morphing-cursor";
import { useEffect, useState } from "react";

const sphereImages: ImageData[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=200&h=200&fit=crop", alt: "Neutral packaging project" },
  { id: "2", src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop", alt: "Editorial brand texture" },
  { id: "3", src: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=200&h=200&fit=crop", alt: "Lifestyle product scene" },
  { id: "4", src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop", alt: "Minimal product branding" },
  { id: "5", src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop", alt: "Warm neutral product mockup" },
  { id: "6", src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=200&fit=crop", alt: "Creative studio detail" },
  { id: "7", src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop", alt: "Soft-light packaging" },
  { id: "8", src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200&h=200&fit=crop", alt: "Brand composition board" },
];

export function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="cc-section pt-20 md:pt-[120px]">
      <div className="cc-container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h1 className="mb-6 font-playfair text-[40px] font-bold leading-[1.15] text-[#26437A] md:text-[72px] md:leading-[1.1]">
            Ideas That
            <br />
            Orbit Your
            <br />
            <HighlightText variant="underline" color="accent" className="text-[#26437A]" strokeWidth={4}>
              Core.
            </HighlightText>
          </h1>
          <p className="mb-3 text-[16px] leading-relaxed text-[#1E335F] md:text-[20px]">
            Brand strategy, identity, content, and 3D visuals that convert.
          </p>
          <p className="mb-8 text-[16px] leading-relaxed text-[#1E335F]/80 md:text-[18px]">
            We distill your essence and build editorial brand systems that scale trust and performance.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Magnetic intensity={reducedMotion ? 0 : 0.15} range={120}>
              <Button className="h-auto rounded-xl bg-[#E8874C] px-8 py-3.5 text-base font-semibold text-[#1E335F] hover:bg-[#DE7E45]">
                Start Your Project
              </Button>
            </Magnetic>
            <Magnetic intensity={reducedMotion ? 0 : 0.1} range={100}>
              <Button variant="outline" className="h-auto rounded-xl border-[#26437A] px-8 py-3.5 text-base font-semibold text-[#26437A] hover:bg-[#26437A]/5">
                See Our Work
              </Button>
            </Magnetic>
          </div>
          <p className="mt-4 text-sm text-[#1E335F]/80 md:text-base">Branding • Packaging • Content • Ads • 3D</p>
        </div>

        <div className="relative mt-8 flex items-center justify-center md:mt-0">
          {!reducedMotion && (
            <div className="pointer-events-none absolute -top-12 right-0 hidden md:block">
              <MagneticText text="CORE" hoverText="CREATE" className="scale-50 opacity-30" />
            </div>
          )}
          <div className="hidden md:block">
            <ImageSphere images={sphereImages} sphereRadius={180} containerSize={400} autoRotate={!reducedMotion} autoRotateSpeed={0.2} />
          </div>
          <div className="md:hidden">
            <ImageSphere images={sphereImages} sphereRadius={130} containerSize={300} autoRotate={!reducedMotion} autoRotateSpeed={0.2} />
          </div>
        </div>
      </div>
    </section>
  );
}
