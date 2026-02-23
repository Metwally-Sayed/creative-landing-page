import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { RichTooltip } from "@/components/ui/animated-tooltip";
import { StatCounter } from "@/components/ui/number-counter";
import { Apple, Figma } from "lucide-react";

const logos = [
  { name: "Spotify", icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg> },
  { name: "Apple", icon: <Apple className="w-8 h-8" /> },
  { name: "Google", icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> },
  { name: "Figma", icon: <Figma className="w-8 h-8" /> },
  { name: "Slack", icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" /></svg> },
];

const stats = [
  { value: "50+", label: "Brands Transformed", detail: "From startups to Fortune 500 companies" },
  { value: "4.9★", label: "Client Satisfaction", detail: "Average rating across all projects" },
  { value: "12+", label: "Years of Expertise", detail: "In brand strategy and creative direction" },
];

export function SocialProof() {
  return (
    <section className="border-y border-border/30 bg-card py-10 md:py-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20">
        {/* Logos Row */}
        <div className="mb-12">
          <InfiniteSlider gap={24} speed={100} speedOnHover={50}>
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center w-[120px] text-foreground opacity-50 transition-opacity duration-300 hover:opacity-100"
                aria-label={logo.name}
              >
                {logo.icon}
              </div>
            ))}
            {logos.map((logo) => (
              <div
                key={`${logo.name}-duplicate`}
                className="flex items-center justify-center w-[120px] text-foreground opacity-50 transition-opacity duration-300 hover:opacity-100"
                aria-label={logo.name}
              >
                {logo.icon}
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 max-w-[900px] mx-auto">
          {stats.map((stat) => {
            // Parse value strings (e.g., "50+" -> 50, "4.9★" -> 4.9)
            const numValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
            const suffix = stat.value.replace(/[0-9.]/g, "");
            const decimals = stat.value.includes(".") ? 1 : 0;

            return (
              <RichTooltip
                key={stat.label}
                title={stat.label}
                description={stat.detail}
              >
                <div className="cursor-default">
                  <StatCounter
                    value={numValue}
                    label={stat.label}
                    suffix={suffix}
                    decimals={decimals}
                    className="[&_span]:text-primary [&_p]:mt-0 [&_p]:font-medium [&_p]:text-foreground/60"
                  />
                </div>
              </RichTooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}
