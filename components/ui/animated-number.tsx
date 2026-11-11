"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  format: (n: number) => string;
  className?: string;
};

/** Counts smoothly to `value`. Counts up from zero the first time it scrolls into view. */
export function AnimatedNumber({ value, format, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // Trigger as soon as any part is visible, so the count starts before the surrounding fade-in.
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const current = useRef(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const from = started.current ? current.current : 0;
    started.current = true;
    const controls = animate(from, value, {
      duration: from === 0 ? 1.4 : 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => {
        current.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
  }, [value, inView, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  );
}
