"use client";

import * as React from "react";
import {
  BadgeCheck,
  Film,
  Lightbulb,
  Monitor,
  Palette,
  PenTool,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/landing/Container";
import { MotionSafe } from "@/components/landing/MotionSafe";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { Highlighter } from "@/components/ui/highlighter";
import { NumberCounter } from "@/components/ui/number-counter";
import { cn } from "@/lib/utils";

type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  bullets?: string[];
  proofValue?: number;
  proofSuffix?: string;
  proofLabel?: string;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Brand Strategy",
    description:
      "Positioning, messaging, and market differentiation that anchors every touchpoint.",
    icon: Lightbulb,
    featured: true,
    bullets: ["Positioning map", "Messaging hierarchy"],
    proofValue: 124,
    proofSuffix: "%",
    proofLabel: "lift in campaign recall",
  },
  {
    title: "Digital Experience",
    description:
      "Interfaces that feel intuitive, look premium, and drive measurable engagement.",
    icon: Monitor,
  },
  {
    title: "Content Direction",
    description:
      "Editorial systems and visual storytelling aligned to your brand voice.",
    icon: PenTool,
  },
  {
    title: "Motion & 3D",
    description:
      "Product visualization, explainer animation, and spatial design for modern media.",
    icon: Film,
  },
  {
    title: "Growth Strategy",
    description:
      "Data-informed campaigns that scale reach without diluting brand equity.",
    icon: TrendingUp,
  },
  {
    title: "Visual Identity",
    description:
      "Logo systems, typography, color, and guidelines built for longevity.",
    icon: Palette,
  },
];

function InView({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 14 }
      }
      transition={{ duration: 0.34, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [coarsePointer, setCoarsePointer] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [tilt, setTilt] = React.useState({ rotateX: 0, rotateY: 0 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const updatePointer = () => setCoarsePointer(mediaQuery.matches);
    updatePointer();

    mediaQuery.addEventListener("change", updatePointer);
    return () => mediaQuery.removeEventListener("change", updatePointer);
  }, []);

  const disabled = reduceMotion || coarsePointer;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    const rotateY = (offsetX - 0.5) * 5;
    const rotateX = (0.5 - offsetY) * 5;

    setTilt({ rotateX, rotateY });
  };

  return (
    <motion.div
      className={cn(className)}
      onMouseEnter={disabled ? undefined : () => setHovered(true)}
      onMouseMove={disabled ? undefined : handleMove}
      onMouseLeave={
        disabled
          ? undefined
          : () => {
              setHovered(false);
              setTilt({ rotateX: 0, rotateY: 0 });
            }
      }
      animate={
        disabled
          ? { rotateX: 0, rotateY: 0, y: 0 }
          : hovered
            ? { rotateX: tilt.rotateX, rotateY: tilt.rotateY, y: -4 }
            : { rotateX: 0, rotateY: 0, y: 0 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.7 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedGroup<T>({
  items,
  className,
  renderItem,
}: {
  items: T[];
  className?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const ref = React.useRef<HTMLUListElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView || reduceMotion ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.05,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={{
            hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderItem(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function FeaturedServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <article className="cc-card-navy h-full p-7 md:p-8">
      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-foreground/20 bg-primary-foreground/10">
        <Icon className="h-5 w-5 text-accent-foreground" />
      </div>

      <h3 className="text-[30px] font-semibold tracking-tight text-accent-foreground md:text-[34px]">
        {service.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-accent-foreground/80 md:text-lg">
        {service.description}
      </p>

      <ul className="mt-6 space-y-2">
        {(service.bullets ?? []).map((bullet) => (
          <li key={bullet} className="flex items-center gap-2 text-sm text-accent-foreground/85 md:text-base">
            <BadgeCheck className="h-4 w-4 text-secondary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <InView className="mt-7 border-t border-primary-foreground/20 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground/65">Proof</p>
        <div className="mt-2 flex items-baseline gap-2">
          <NumberCounter
            value={service.proofValue ?? 0}
            suffix={service.proofSuffix ?? ""}
            className="font-playfair text-[36px] leading-none text-accent-foreground"
            duration={1.8}
            once
          />
          <span className="text-sm text-accent-foreground/75">{service.proofLabel}</span>
        </div>
      </InView>
    </article>
  );
}

function StandardServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <article className="cc-card h-full p-7 md:p-8">
      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card/85">
        <Icon className="h-5 w-5 text-primary/75" />
      </div>

      <h3 className="text-[30px] font-semibold tracking-tight text-primary md:text-[34px]">
        {service.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-foreground/80 md:text-lg">
        {service.description}
      </p>
    </article>
  );
}

export function ExpertiseCreative() {
  return (
    <section id="services" className="cc-section">
      <Container>
        <MotionSafe>
          <SectionTitle
            title="Our Expertise"
            subtitle={
              <>
                We shape{" "}
                <Highlighter action="underline" color="#ef9a56" strokeWidth={2.5} isView>
                  conversion-ready
                </Highlighter>{" "}
                systems that make each touchpoint feel{" "}
                <Highlighter action="underline" color="#ef9a56" strokeWidth={2.5} isView>
                  distinctly premium
                </Highlighter>
                .
              </>
            }
          />
        </MotionSafe>

        <AnimatedGroup
          items={SERVICES}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          renderItem={(service) => {
            if (service.featured) {
              return (
                <Tilt className="h-full">
                  <FeaturedServiceCard service={service} />
                </Tilt>
              );
            }

            return (
              <Tilt className="h-full">
                <StandardServiceCard service={service} />
              </Tilt>
            );
          }}
        />
      </Container>
    </section>
  );
}
