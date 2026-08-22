"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      containerRef.current.style.display = "none";
      window.dispatchEvent(new CustomEvent("cartcode_hero_reveal"));
      window.dispatchEvent(new CustomEvent("cartcode_intro_finished"));
      return;
    }

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const num3 = container?.querySelector(".num-03");
      const num2 = container?.querySelector(".num-02");
      const num1 = container?.querySelector(".num-01");
      const numbersWrapper = container?.querySelector(".numbers-wrapper");
      const glow = glowRef.current;

      if (!container || !num3 || !num2 || !num1 || !numbersWrapper) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("cartcode_intro_finished"));
          if (container) {
            container.style.display = "none";
          }
        },
      });

      // Atmospheric Glow build-up during countdown
      if (glow) {
        tl.fromTo(
          glow,
          { opacity: 0, scale: 0.6 },
          { opacity: 0.85, scale: 1, duration: 1.1, ease: "power2.out" },
          0.05
        );
      }

      // 0.08s - 0.40s : 03
      tl.fromTo(
        num3,
        { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 22 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.32 },
        0.08
      ).to(
        num3,
        {
          opacity: 0,
          scale: 1.06,
          filter: "blur(8px)",
          y: -16,
          duration: 0.18,
          ease: "power3.in",
        },
        0.40
      );

      // 0.44s - 0.76s : 02
      tl.fromTo(
        num2,
        { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 22 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.32 },
        0.44
      ).to(
        num2,
        {
          opacity: 0,
          scale: 1.06,
          filter: "blur(8px)",
          y: -16,
          duration: 0.18,
          ease: "power3.in",
        },
        0.76
      );

      // 0.80s - 1.12s : 01
      tl.fromTo(
        num1,
        { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 22 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.32 },
        0.80
      ).to(
        num1,
        {
          opacity: 0,
          scale: 1.06,
          filter: "blur(8px)",
          y: -16,
          duration: 0.18,
          ease: "power3.in",
        },
        1.12
      );

      // 1.12s : Numbers exit, trigger the Hero CARTCODE elastic entrance immediately
      tl.add(() => {
        window.dispatchEvent(new CustomEvent("cartcode_hero_reveal"));
      }, 1.12);

      // 1.14s - 1.55s : Smooth preloader dissolve directly into live Hero
      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.42,
          ease: "power2.inOut",
        },
        1.14
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05050A] select-none pointer-events-none overflow-hidden"
    >
      {/* Background Volumetric Ember Atmosphere during Countdown */}
      <div
        ref={glowRef}
        className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[radial-gradient(circle,rgba(224,67,43,0.32)_0%,rgba(122,31,23,0.12)_45%,transparent_75%)] blur-[140px] pointer-events-none opacity-0"
      />

      {/* Center Cinematic Countdown Numbers Stack (03 -> 02 -> 01) */}
      <div className="numbers-wrapper absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="num-03 font-mono text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#F5F5F7] absolute opacity-0">
          03
        </div>
        <div className="num-02 font-mono text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#F5F5F7] absolute opacity-0">
          02
        </div>
        <div className="num-01 font-mono text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#F5F5F7] absolute opacity-0">
          01
        </div>
      </div>
    </div>
  );
}

