"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile (< 768px) / prefers-reduced-motion
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasTouch || isMobile || prefersReducedMotion) {
      return;
    }

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentRingX = mouseX;
    let currentRingY = mouseY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant precision dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Detect clickable interactive element hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a, button, [role='button'], input, textarea, .cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const render = () => {
      // Damped smooth trailing lag for the subtle follower ring
      currentRingX += (mouseX - currentRingX) * 0.14;
      currentRingY += (mouseY - currentRingY) * 0.14;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentRingX}px, ${currentRingY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Precision Core Brand Dot with Subtle Micro Glow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform transition-opacity duration-300 flex items-center justify-center"
      >
        <div
          className={`rounded-full bg-[#E0432B] transition-all duration-200 ${
            isHovered ? "w-2.5 h-2.5 bg-[#FF7048] shadow-[0_0_12px_#E0432B]" : "w-1.5 h-1.5 shadow-[0_0_8px_#E0432B]"
          }`}
        />
        {/* Soft Micro Glow Ambient (very subtle & controlled) */}
        <div className="absolute w-8 h-8 rounded-full bg-[radial-gradient(circle,rgba(224,67,43,0.35)_0%,transparent_70%)] blur-[6px] pointer-events-none" />
      </div>

      {/* Elegant Decent Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full will-change-transform transition-all duration-300 ease-out border backdrop-blur-[0.5px] ${
          isHovered
            ? "w-11 h-11 border-[#E0432B]/60 bg-white/[0.04] shadow-[0_0_20px_rgba(224,67,43,0.2)]"
            : "w-7 h-7 border-white/20 bg-white/[0.02]"
        }`}
      />
    </div>
  );
}
