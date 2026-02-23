"use client";


import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
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
    <section className="relative pt-20 pb-16 md:pt-[120px] md:pb-24 overflow-hidden">

      <div className="max-w-[1280px] mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div>
          <h1 className="mb-6 font-playfair text-[42px] font-bold leading-[1.15] text-primary md:text-[72px] md:leading-[1.1]">
            Ideas That
            <br />
            Orbit Your
            <br />
            <Highlighter
              action="highlight"
              color="#ef9a56"
              strokeWidth={5}
              animationDuration={750}
            >
              Core.
            </Highlighter>
          </h1>
          <p className="mb-4 text-base leading-relaxed text-foreground md:text-lg">
            Brand strategy, identity, content, and 3D visuals that convert.
          </p>
          <p className="mb-10 text-base leading-relaxed text-foreground/80 md:text-lg">
            We distill your essence and amplify your reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Magnetic intensity={0.15} range={120}>
              <Button className="h-auto rounded-xl bg-secondary px-8 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Start Your Project
              </Button>
            </Magnetic>
            <Magnetic intensity={0.1} range={100}>
              <Button
                variant="outline"
                className="h-auto rounded-xl border-primary px-8 py-3.5 text-base font-semibold text-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              autoRotate={true}
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
