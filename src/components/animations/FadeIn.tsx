"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const { x, y } = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
