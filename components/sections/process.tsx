const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Deep-dive audit of your market, audience, and current brand landscape.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "Define positioning, messaging hierarchy, and creative direction.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Design, build, and produce every deliverable to spec.",
  },
  {
    number: "04",
    title: "Amplify",
    description:
      "Launch, measure, iterate. Scale what works across all channels.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24 bg-[#E5E5E3]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20">
        <h2 className="font-playfair font-bold text-[30px] md:text-[48px] text-[#26437A] mb-16 text-center">
          How We Work
        </h2>

        {/* Desktop: horizontal 4-col */}
        <div className="hidden md:grid grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="absolute top-5 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-[#CBD2DC]/40" />

          {steps.map((step) => (
            <div key={step.number} className="text-center relative">
              <div className="w-10 h-10 rounded-full border border-[#CBD2DC]/50 bg-white flex items-center justify-center mx-auto mb-4 relative z-10">
                <span className="font-playfair font-bold text-base text-[#26437A]">
                  {step.number}
                </span>
              </div>
              <h3 className="font-medium text-lg text-[#1E335F] mb-2">
                {step.title}
              </h3>
              <p className="text-base text-[#1E335F]/70 max-w-[200px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#CBD2DC]/40" />
          {steps.map((step) => (
            <div key={step.number} className="relative pb-8 last:pb-0">
              <div className="absolute left-[-21px] w-10 h-10 rounded-full border border-[#CBD2DC]/50 bg-white flex items-center justify-center">
                <span className="font-playfair font-bold text-base text-[#26437A]">
                  {step.number}
                </span>
              </div>
              <div className="pl-6">
                <h3 className="font-medium text-lg text-[#1E335F] mb-1">
                  {step.title}
                </h3>
                <p className="text-base text-[#1E335F]/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
