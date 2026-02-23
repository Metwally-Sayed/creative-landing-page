"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type SparkStreak = {
  id: number;
  angleDeg: number;
  distance: number;
  length: number;
  thickness: number;
  glow: number;
  duration: number;
  delay: number;
  color: string;
};

type SparkEmber = {
  id: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
};

type Spark = {
  id: number;
  x: number;
  y: number;
  streaks?: SparkStreak[];
  embers?: SparkEmber[];
};

const STREAK_COUNT = 11;
const EMBER_COUNT = 7;
const SPARK_DURATION_MS = 560;
const SPARK_COLORS = [
  "rgba(255, 245, 214, 1)",
  "rgba(255, 216, 143, 1)",
  "rgba(239, 154, 86, 1)",
  "rgba(255, 198, 112, 1)",
] as const;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

function createStreaks(seed: number): SparkStreak[] {
  return Array.from({ length: STREAK_COUNT }, (_, index) => {
    const baseAngle = (index / STREAK_COUNT) * 360;
    const angleDeg = baseAngle + randomBetween(-12, 12);

    return {
      id: seed * 100 + index,
      angleDeg,
      distance: randomBetween(20, 52),
      length: randomBetween(16, 30),
      thickness: randomBetween(1.2, 2.4),
      glow: randomBetween(8, 15),
      duration: randomBetween(0.32, 0.55),
      delay: randomBetween(0, 0.04),
      color: SPARK_COLORS[Math.floor(randomBetween(0, SPARK_COLORS.length))],
    };
  });
}

function createEmbers(seed: number): SparkEmber[] {
  return Array.from({ length: EMBER_COUNT }, (_, index) => {
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(8, 28);

    return {
      id: seed * 100 + index,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size: randomBetween(1.2, 3.2),
      duration: randomBetween(0.24, 0.45),
      delay: randomBetween(0, 0.06),
      color: SPARK_COLORS[Math.floor(randomBetween(0, SPARK_COLORS.length))],
    };
  });
}

export function GlobalClickSpark() {
  const reduceMotion = useReducedMotion();
  const [sparks, setSparks] = React.useState<Spark[]>([]);
  const sparkId = React.useRef(0);
  const timeoutIds = React.useRef<number[]>([]);

  React.useEffect(() => {
    if (reduceMotion) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      sparkId.current += 1;
      const nextSpark: Spark = {
        id: sparkId.current,
        x: event.clientX,
        y: event.clientY,
        streaks: createStreaks(sparkId.current),
        embers: createEmbers(sparkId.current + 17),
      };

      setSparks((prev) => [...prev, nextSpark]);

      const timeoutId = window.setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.id !== nextSpark.id));
        timeoutIds.current = timeoutIds.current.filter((id) => id !== timeoutId);
      }, SPARK_DURATION_MS);

      timeoutIds.current.push(timeoutId);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      timeoutIds.current.forEach((id) => window.clearTimeout(id));
      timeoutIds.current = [];
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <AnimatePresence>
        {sparks.map((spark) => (
          <React.Fragment key={spark.id}>
            <motion.span
              className="absolute rounded-full"
              style={{
                left: spark.x,
                top: spark.y,
                width: 12,
                height: 12,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,231,180,0.8) 35%, rgba(255,171,93,0) 75%)",
              }}
              initial={{ opacity: 0.95, scale: 0.4, x: -6, y: -6 }}
              animate={{ opacity: 0, scale: 2.2, x: -6, y: -6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />

            {(spark.streaks ?? []).map((streak) => {
              const angleRad = (streak.angleDeg * Math.PI) / 180;
              const dx = Math.cos(angleRad) * streak.distance;
              const dy = Math.sin(angleRad) * streak.distance;

              return (
                <motion.span
                  key={`${spark.id}-streak-${streak.id}`}
                  className="absolute block"
                  style={{
                    left: spark.x,
                    top: spark.y,
                    rotate: streak.angleDeg,
                    transformOrigin: "0% 50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scaleX: 0.5, scaleY: 1 }}
                  animate={{ x: dx, y: dy, opacity: 0, scaleX: 1.1, scaleY: 0.85 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: streak.duration,
                    delay: streak.delay,
                    ease: [0.12, 0.64, 0.24, 1],
                  }}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: streak.length,
                      height: streak.thickness,
                      background: `linear-gradient(90deg, rgba(255,255,255,0.96) 0%, ${streak.color} 45%, rgba(255,255,255,0) 100%)`,
                      boxShadow: `0 0 ${streak.glow}px ${streak.color}`,
                    }}
                  />
                </motion.span>
              );
            })}

            {(spark.embers ?? []).map((ember) => (
              <motion.span
                key={`${spark.id}-ember-${ember.id}`}
                className="absolute rounded-full"
                style={{
                  left: spark.x,
                  top: spark.y,
                  width: ember.size,
                  height: ember.size,
                  background: ember.color,
                  boxShadow: `0 0 8px ${ember.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                animate={{ x: ember.dx, y: ember.dy, opacity: 0, scale: 0.35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ember.duration, delay: ember.delay, ease: "easeOut" }}
              />
            ))}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
}
