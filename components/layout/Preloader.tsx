"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE_NAME } from "@/lib/constants";

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
      return;
    }

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const num1 = container?.querySelector(".num-01");
      const num2 = container?.querySelector(".num-02");
      const num3 = container?.querySelector(".num-03");
      const numbersWrapper = container?.querySelector(".numbers-wrapper");
      const brandWrapper = container?.querySelector(".brand-wrapper");
      const brandChars = container?.querySelectorAll(".intro-char");
      const brandTag = container?.querySelector(".intro-tag");
      const glow = glowRef.current;

      if (
        !container ||
        !num1 ||
        !num2 ||
        !num3 ||
        !brandChars ||
        !numbersWrapper ||
        !brandWrapper
      )
        return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("cartcode_intro_finished"));
          if (container) {
            container.style.display = "none";
          }
        },
      });

      // 0.10s - 0.45s : 01
      tl.fromTo(
        num1,
        { opacity: 0, scale: 0.92, filter: "blur(10px)", y: 20 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.35 },
        0.1
      ).to(
        num1,
        {
          opacity: 0,
          scale: 1.05,
          filter: "blur(8px)",
          y: -15,
          duration: 0.22,
          ease: "power3.in",
        },
        0.45
      );

      // 0.48s - 0.83s : 02
      tl.fromTo(
        num2,
        { opacity: 0, scale: 0.92, filter: "blur(10px)", y: 20 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.35 },
        0.48
      ).to(
        num2,
        {
          opacity: 0,
          scale: 1.05,
          filter: "blur(8px)",
          y: -15,
          duration: 0.22,
          ease: "power3.in",
        },
        0.83
      );

      // 0.86s - 1.21s : 03
      tl.fromTo(
        num3,
        { opacity: 0, scale: 0.92, filter: "blur(10px)", y: 20 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.35 },
        0.86
      ).to(
        num3,
        {
          opacity: 0,
          scale: 1.05,
          filter: "blur(8px)",
          y: -15,
          duration: 0.22,
          ease: "power3.in",
        },
        1.21
      );

      // 1.25s : Fade out numbers wrapper & fade in brand wrapper
      tl.to(numbersWrapper, { opacity: 0, duration: 0.15 }, 1.25);

      // 1.25s : Ember Atmospheric Glow illumination
      if (glow) {
        tl.fromTo(
          glow,
          { opacity: 0, scale: 0.55 },
          { opacity: 0.9, scale: 1, duration: 0.6, ease: "power2.out" },
          1.25
        );
      }

      // 1.28s : CARTCODE Character Split Stagger Reveal
      tl.fromTo(
        brandChars,
        { opacity: 0, y: 35, filter: "blur(10px)", scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.42,
          stagger: 0.04,
          ease: "power3.out",
          clearProps: "filter",
        },
        1.28
      );

      // 1.55s : Brand Studio Tag
      if (brandTag) {
        tl.fromTo(
          brandTag,
          { opacity: 0, y: 10 },
          { opacity: 0.85, y: 0, duration: 0.3, ease: "power2.out" },
          1.55
        );
      }

      // 1.80s : Smooth Dissolve into live Hero
      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        },
        1.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const brandText = SITE_NAME.toUpperCase();
  const letters = brandText.split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05050A] select-none pointer-events-none overflow-hidden"
    >
      {/* Background Volumetric Ember Atmosphere behind CARTCODE */}
      <div
        ref={glowRef}
        className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[radial-gradient(circle,rgba(224,67,43,0.30)_0%,rgba(122,31,23,0.12)_45%,transparent_75%)] blur-[140px] pointer-events-none opacity-0"
      />

      {/* Center Editorial Numbers Stack (01 -> 02 -> 03) */}
      <div className="numbers-wrapper absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="num-01 font-mono text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#F5F5F7] absolute opacity-0">
          01
        </div>
        <div className="num-02 font-mono text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#F5F5F7] absolute opacity-0">
          02
        </div>
        <div className="num-03 font-mono text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#F5F5F7] absolute opacity-0">
          03
        </div>
      </div>

      {/* Confident Editorial Brand Reveal */}
      <div className="brand-wrapper relative z-30 flex flex-col items-center text-center px-4">
        <h1 className="font-display text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10.5rem] font-black tracking-tighter text-[#F5F5F7] leading-none uppercase">
          {letters.map((char, i) => (
            <span key={i} className="intro-char inline-block opacity-0">
              {char}
            </span>
          ))}
        </h1>
        <p className="intro-tag text-[9px] sm:text-[11px] uppercase tracking-[0.45em] text-[#E0432B] font-mono font-medium mt-4 opacity-0">
          Creative Technology Studio
        </p>
      </div>
    </div>
  );
}
