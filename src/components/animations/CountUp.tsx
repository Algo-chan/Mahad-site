"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2.5,
  suffix = "",
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      const frame = requestAnimationFrame(() => setValue(end));
      return () => cancelAnimationFrame(frame);
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reduceMotion, end, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
