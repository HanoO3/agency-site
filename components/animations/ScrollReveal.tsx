"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  stagger?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  stagger = 0,
  className = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets = stagger
        ? containerRef.current?.children
        : containerRef.current;

      if (!targets) return;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          delay,
          stagger: stagger ? stagger : 0,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
