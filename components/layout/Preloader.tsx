"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check sessionStorage
    const hasSeenIntro = sessionStorage.getItem("cartcode_intro_viewed");

    if (prefersReducedMotion || hasSeenIntro) {
      containerRef.current.style.display = "none";
      return;
    }

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const rollTrack = container?.querySelector(".preloader-roll-track");
      const brandEl = container?.querySelector(".preloader-brand");
      const lineEl = container?.querySelector(".preloader-line");
      const contentWrapper = container?.querySelector(".preloader-content");

      if (!container || !rollTrack || !brandEl || !lineEl || !contentWrapper) return;

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("cartcode_intro_viewed", "true");
          if (container) {
            container.style.display = "none";
          }
        },
      });

      // Progress bar entrance
      tl.fromTo(
        lineEl,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
        0
      )
        // Roll from 01 -> 02 -> 03 with subtle snap and blur
        .fromTo(
          contentWrapper,
          { opacity: 0, scale: 0.94, filter: "blur(8px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.35,
            ease: "power3.out",
          },
          0.05
        )
        .to(
          rollTrack,
          {
            yPercent: -33.333,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.4
        )
        .to(
          rollTrack,
          {
            yPercent: -66.666,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.75
        )
        .fromTo(
          brandEl,
          { opacity: 0, letterSpacing: "0.6em" },
          {
            opacity: 1,
            letterSpacing: "0.35em",
            duration: 0.45,
            ease: "power2.out",
          },
          0.65
        )
        // Curtain Exit Reveal
        .to(
          contentWrapper,
          {
            opacity: 0,
            y: -24,
            filter: "blur(10px)",
            duration: 0.4,
            ease: "power3.in",
          },
          1.05
        )
        .to(
          container,
          {
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          1.15
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05050A] select-none pointer-events-none"
    >
      {/* Background Volumetric Ember Atmosphere */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(224,67,43,0.18)_0%,transparent_70%)] blur-[120px]" />

      <div className="preloader-content relative flex flex-col items-center z-10">
        {/* Rolling Odometer Numbers (Safe for React reconciliation) */}
        <div className="relative h-[60px] sm:h-[80px] overflow-hidden mb-4 flex items-center justify-center">
          <div className="preloader-roll-track flex flex-col items-center">
            <div className="h-[60px] sm:h-[80px] flex items-center font-mono text-5xl sm:text-7xl font-bold tracking-tight text-[#F5F5F7]">
              01
            </div>
            <div className="h-[60px] sm:h-[80px] flex items-center font-mono text-5xl sm:text-7xl font-bold tracking-tight text-[#F5F5F7]">
              02
            </div>
            <div className="h-[60px] sm:h-[80px] flex items-center font-mono text-5xl sm:text-7xl font-bold tracking-tight text-[#F5F5F7]">
              03
            </div>
          </div>
        </div>

        {/* Brand Micro-Label */}
        <div className="preloader-brand text-[10px] sm:text-xs font-mono uppercase text-[#E0432B] font-semibold tracking-[0.4em]">
          CARTCODE
        </div>

        {/* Minimal Progress Line */}
        <div className="w-28 h-[1px] bg-white/10 mt-6 overflow-hidden">
          <div className="preloader-line w-full h-full bg-[#E0432B] origin-left" />
        </div>
      </div>
    </div>
  );
}
