import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What does a typical engagement look like?",
    answer:
      "Most projects begin with a 2-week discovery phase, followed by 6–10 weeks of strategy and production. We tailor scope and timeline to your goals.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. We've helped pre-seed to Series B companies define their brand from zero. Early clarity compounds.",
  },
  {
    question: "Can you handle just one piece (e.g., only packaging)?",
    answer:
      "Absolutely. While we excel at full-system builds, we're happy to scope a single deliverable.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We're industry-agnostic but have deep experience in tech, consumer goods, hospitality, and professional services.",
  },
  {
    question: "How do you price projects?",
    answer:
      "We quote per project based on scope, not hourly. You'll get a fixed price after our discovery call.",
  },
  {
    question: "What's included in brand strategy?",
    answer:
      "Market research, competitive audit, positioning statement, messaging framework, verbal identity guide, and creative brief.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-5 md:px-20">
        <h2 className="font-playfair font-bold text-[30px] md:text-[48px] text-[#26437A] mb-12 text-center">
          Common Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-[#CBD2DC]/50 py-1"
            >
              <AccordionTrigger className="text-left font-medium text-base md:text-lg text-[#1E335F] hover:no-underline py-5 [&>svg]:text-[#26437A]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#1E335F]/70 pb-5 pt-1 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
