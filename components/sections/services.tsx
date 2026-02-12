import {
  Film,
  Lightbulb,
  Monitor,
  Palette,
  PenTool,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    title: "Brand Strategy",
    description:
      "Positioning, messaging, and market differentiation that anchors every touchpoint.",
    icon: <Lightbulb className="w-8 h-8" />,
    featured: true,
  },
  {
    title: "Digital Experience",
    description:
      "Interfaces that feel intuitive, look premium, and drive measurable engagement.",
    icon: <Monitor className="w-8 h-8" />,
  },
  {
    title: "Content Direction",
    description:
      "Editorial systems and visual storytelling aligned to your brand voice.",
    icon: <PenTool className="w-8 h-8" />,
  },
  {
    title: "Motion & 3D",
    description:
      "Product visualization, explainer animation, and spatial design for modern media.",
    icon: <Film className="w-8 h-8" />,
  },
  {
    title: "Growth Strategy",
    description:
      "Data-informed campaigns that scale reach without diluting brand equity.",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    title: "Visual Identity",
    description:
      "Logo systems, typography, color, and guidelines built for longevity.",
    icon: <Palette className="w-8 h-8" />,
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#E5E5E3]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20">
        <h2 className="font-playfair font-bold text-[30px] md:text-[48px] text-[#26437A] mb-16 text-center">
          Our Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group rounded-[20px] p-8 transition-shadow duration-300 hover:shadow-xl ${service.featured
                  ? "bg-[#1E335F] shadow-[0px_4px_20px_rgba(30,51,95,0.15)]"
                  : "bg-white/65 border border-[#CBD2DC]/50 shadow-[0px_4px_20px_rgba(30,51,95,0.08)]"
                }`}
            >
              <div
                className={`mb-4 ${service.featured ? "text-white/60" : "text-[#26437A]/40"
                  }`}
              >
                {service.icon}
              </div>
              <h3
                className={`font-medium text-xl mb-2 ${service.featured ? "text-white" : "text-[#1E335F]"
                  }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-base leading-relaxed ${service.featured ? "text-white/70" : "text-[#1E335F]/70"
                  }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
