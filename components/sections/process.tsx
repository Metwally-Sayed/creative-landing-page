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
    <section id="process" className="bg-background py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20">
        <h2 className="mb-16 text-center font-playfair text-[30px] font-bold text-primary md:text-[48px]">
          How We Work
        </h2>

        {/* Desktop: horizontal 4-col */}
        <div className="hidden md:grid grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="absolute top-5 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-border/40" />

          {steps.map((step) => (
            <div key={step.number} className="text-center relative">
              <div className="relative z-10 mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card">
                <span className="font-playfair text-base font-bold text-primary">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mx-auto max-w-[200px] text-base text-foreground/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/40" />
          {steps.map((step) => (
            <div key={step.number} className="relative pb-8 last:pb-0">
              <div className="absolute left-[-21px] flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card">
                <span className="font-playfair text-base font-bold text-primary">
                  {step.number}
                </span>
              </div>
              <div className="pl-6">
                <h3 className="mb-1 text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="text-base text-foreground/70">
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
