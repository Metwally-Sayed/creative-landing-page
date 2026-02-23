"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { WorkItem } from "./types";
import { cn } from "@/lib/utils";

interface CardContainerProps {
  href: string;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

function CardContainer({
  href,
  ariaLabel,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: CardContainerProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {children}
    </Link>
  );
}

function CardBody({
  children,
  className,
  transformStyle,
}: {
  children: React.ReactNode;
  className?: string;
  transformStyle?: React.CSSProperties;
}) {
  return (
    <article
      className={cn(
        "cc-card-solid relative h-full overflow-hidden transition-transform duration-300",
        "motion-reduce:transform-none md:group-hover:shadow-[var(--shadow-float)]",
        className,
      )}
      style={transformStyle}
    >
      {children}
    </article>
  );
}

function CardItem({
  active,
  depth,
  className,
  children,
}: {
  active: boolean;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("transition-transform duration-300 will-change-transform", className)}
      style={{
        transform: active ? `translateZ(${depth}px)` : "translateZ(0px)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

export function WorkCard3D({
  item,
}: {
  item: WorkItem;
}) {
  const reduceMotion = useReducedMotion();
  const [coarsePointer, setCoarsePointer] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarsePointer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const disable3D = Boolean(reduceMotion) || coarsePointer;
  const interactive = !disable3D;

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const rotateY = (relativeX - 0.5) * 10;
    const rotateX = (0.5 - relativeY) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const transformStyle: React.CSSProperties | undefined = interactive
    ? {
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(${hovered ? -6 : 0}px)`,
        transformStyle: "preserve-3d",
      }
    : undefined;

  return (
    <div className={cn("relative h-full", interactive ? "[perspective:1200px]" : "")}>
      <CardContainer
        href={item.href}
        ariaLabel={`View case study ${item.title}`}
        onMouseEnter={() => {
          if (interactive) setHovered(true);
        }}
        onMouseLeave={() => {
          if (!interactive) return;
          setHovered(false);
          setRotation({ x: 0, y: 0 });
        }}
        onMouseMove={handleMove}
      >
        <CardBody transformStyle={transformStyle}>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />

          <CardItem active={interactive && hovered} depth={44}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 md:group-hover:scale-[1.03]"
                unoptimized
              />
              <div className="absolute inset-0 bg-background/20" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </CardItem>

          <div className="space-y-2 p-6">
            <CardItem active={interactive && hovered} depth={22}>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{item.category}</p>
            </CardItem>
            <CardItem active={interactive && hovered} depth={30}>
              <h3 className="font-playfair text-[36px] leading-tight text-primary">{item.title}</h3>
            </CardItem>
            <CardItem active={interactive && hovered} depth={42}>
              <p className="inline-flex items-center gap-1.5 text-sm text-foreground/75">
                <span>View case study</span>
                <ArrowUpRight className="h-4 w-4" />
              </p>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
