"use client";

import { Button } from "@/components/ui/button";
import { HighlightText } from "@/components/ui/highlight-text";
import type { ImageData } from "@/components/ui/image-sphere";
import ImageSphere from "@/components/ui/image-sphere";
import { Magnetic } from "@/components/ui/magnetic";

const sphereImages: ImageData[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=200&fit=crop", alt: "Abstract art 1" },
  { id: "2", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop", alt: "Abstract art 2" },
  { id: "3", src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop", alt: "Brand design 1" },
  { id: "4", src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop", alt: "Brand design 2" },
  { id: "5", src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop", alt: "Creative work 1" },
  { id: "6", src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop", alt: "Creative work 2" },
  { id: "7", src: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=200&h=200&fit=crop", alt: "Portfolio piece 1" },
  { id: "8", src: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=200&h=200&fit=crop", alt: "Portfolio piece 2" },
];

export function Hero() {
  return (
    <section className="pt-20 pb-16 md:pt-[120px] md:pb-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div>
          <h1 className="font-playfair font-bold text-[42px] md:text-[72px] leading-[1.15] md:leading-[1.1] text-[#26437A] mb-6">
            Ideas That
            <br />
            Orbit Your
            <br />
            <HighlightText
              variant="underline"
              color="accent"
              className="text-[#26437A]"
              strokeWidth={5}
            >
              Core.
            </HighlightText>
          </h1>
          <p className="text-[#1E335F] text-base md:text-lg leading-relaxed mb-4">
            Brand strategy, identity, content, and 3D visuals that convert.
          </p>
          <p className="text-[#1E335F]/80 text-base md:text-lg leading-relaxed mb-10">
            We distill your essence and amplify your reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Magnetic intensity={0.15} range={120}>
              <Button className="bg-[#E8874C] text-[#1E335F] hover:bg-[#DE7E45] rounded-xl px-8 py-3.5 font-semibold text-base h-auto focus-visible:ring-2 focus-visible:ring-[#E8874C] focus-visible:ring-offset-2">
                Start Your Project
              </Button>
            </Magnetic>
            <Magnetic intensity={0.1} range={100}>
              <Button
                variant="outline"
                className="border-[#26437A] text-[#26437A] hover:bg-[#26437A]/5 rounded-xl px-8 py-3.5 font-semibold text-base h-auto focus-visible:ring-2 focus-visible:ring-[#E8874C] focus-visible:ring-offset-2"
              >
                See Our Work
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Right Column — Image Sphere */}
        <div className="flex items-center justify-center mt-10 md:mt-0">
          <div className="hidden md:block">
            <ImageSphere
              images={sphereImages}
              sphereRadius={180}
              containerSize={400}
            />
          </div>
          <div className="block md:hidden">
            <ImageSphere
              images={sphereImages}
              sphereRadius={130}
              containerSize={300}
              autoRotate={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
