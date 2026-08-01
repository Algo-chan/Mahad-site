"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.5,
}: StaggerContainerProps) {
  const reduceMotion = useReducedMotion();
  const items = React.Children.toArray(children);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: "easeOut",
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
