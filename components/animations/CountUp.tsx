"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ value, duration = 2, className = "" }: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse numeric portion and prefix/suffix
  // E.g. "40+" -> numeric: 40, prefix: "", suffix: "+"
  // "10M+" -> numeric: 10, prefix: "", suffix: "M+"
  const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericTarget = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : value;

  useEffect(() => {
    const el = elementRef.current;
    if (!el || isNaN(numericTarget)) return;

    // Set initial text without triggering a React re-render
    el.textContent = `${prefix}0${suffix}`;

    const ctx = gsap.context(() => {
      const obj = { count: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            count: numericTarget,
            duration: duration || 2.2,
            ease: "power3.out",
            onUpdate: () => {
              // Direct DOM mutation — bypasses React reconciler entirely (~130 re-renders eliminated)
              if (el) el.textContent = `${prefix}${Math.floor(obj.count)}${suffix}`;
            },
          });
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [numericTarget, duration, prefix, suffix]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
