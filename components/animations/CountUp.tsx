"use client";

import { useEffect, useRef, useState } from "react";
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

  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    if (!elementRef.current || isNaN(numericTarget)) return;

    const ctx = gsap.context(() => {
      const obj = { count: 0 };
      ScrollTrigger.create({
        trigger: elementRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            count: numericTarget,
            duration: duration || 2.2,
            ease: "power3.out",
            onUpdate: () => {
              setCurrentCount(Math.floor(obj.count));
            },
          });
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [numericTarget, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {currentCount}
      {suffix}
    </span>
  );
}
