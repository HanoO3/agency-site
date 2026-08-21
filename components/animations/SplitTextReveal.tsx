"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface SplitTextRevealProps {
  text: string;
  type?: "chars" | "words";
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  charClassName?: string;
  triggerOnScroll?: boolean;
}

export default function SplitTextReveal({
  text,
  type = "chars",
  delay = 0,
  stagger = 0.04,
  duration = 1.1,
  className = "",
  charClassName = "",
  triggerOnScroll = true,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".split-unit");
      if (!items || items.length === 0) return;

      const anim = gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 45,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          stagger,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: triggerOnScroll
            ? {
                trigger: containerRef.current,
                start: "top 88%",
                once: true,
              }
            : undefined,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger, duration, triggerOnScroll]);

  if (type === "words") {
    const words = text.split(" ");
    return (
      <span ref={containerRef} className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
        {words.map((word, i) => (
          <span key={i} className={`split-unit inline-block ${charClassName}`}>
            {word}
          </span>
        ))}
      </span>
    );
  }

  const chars = text.split("");
  return (
    <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={`split-unit inline-block ${charClassName} ${
            char === " " ? "w-[0.3em]" : ""
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
