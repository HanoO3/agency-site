"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on touch devices / tablets / reduced motion
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasTouch || isMobile || prefersReducedMotion) {
      return;
    }

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest('[role="button"]') ||
          target.closest(".cursor-pointer"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      if (cursorDotRef.current && cursorAuraRef.current) {
        cursorDotRef.current.style.opacity = "0";
        cursorAuraRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if (cursorDotRef.current && cursorAuraRef.current) {
        cursorDotRef.current.style.opacity = "1";
        cursorAuraRef.current.style.opacity = "1";
      }
    };

    const render = () => {
      // Damped lerp for smooth aura trailing
      auraX += (mouseX - auraX) * 0.14;
      auraY += (mouseY - auraY) * 0.14;

      if (cursorAuraRef.current) {
        cursorAuraRef.current.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E0432B] pointer-events-none z-[9998] transition-[opacity,transform] duration-75 ease-out ${
          isHovered ? "scale-150 bg-[#FF7048]" : "scale-100"
        }`}
      />

      {/* Subtle Trailing Ember Light Aura */}
      <div
        ref={cursorAuraRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9997] transition-[width,height,background,border-color] duration-300 ease-out ${
          isHovered
            ? "w-11 h-11 border border-[#E0432B]/50 bg-[#E0432B]/10 shadow-[0_0_20px_rgba(224,67,43,0.35)]"
            : "w-7 h-7 border border-white/20 bg-white/[0.02]"
        }`}
      />
    </>
  );
}
