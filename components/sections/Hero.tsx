"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { SITE_NAME } from "@/lib/constants";
import HeroCanvas from "@/components/three/HeroCanvas";
import TextPressure from "@/components/ui/TextPressure";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const titleParallaxRef = useRef<HTMLDivElement>(null);
  const titleTiltRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ambientSmokeRef = useRef<HTMLDivElement>(null);
  const subtagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mouse tracking for fluid smoke haze & 3D tilt
    let mouseX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let mouseY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
    let currentSmokeX = mouseX;
    let currentSmokeY = mouseY;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        targetTiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        targetTiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
      }
    };

    const renderLoop = () => {
      // Smooth damped lerp for volumetric smoke aura
      currentSmokeX += (mouseX - currentSmokeX) * 0.07;
      currentSmokeY += (mouseY - currentSmokeY) * 0.07;

      if (ambientSmokeRef.current) {
        ambientSmokeRef.current.style.transform = `translate3d(${currentSmokeX}px, ${currentSmokeY}px, 0) translate(-50%, -50%)`;
      }

      // Smooth 3D tilt on separate inner title container (no conflict with GSAP parallax)
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      if (titleTiltRef.current && window.innerWidth >= 768 && !prefersReducedMotion) {
        titleTiltRef.current.style.transform = `perspective(1200px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      rafId = requestAnimationFrame(renderLoop);
    }

    // Scroll Parallax Scrub
    const ctx = gsap.context(() => {
      if (sectionRef.current && titleParallaxRef.current) {
        gsap.to(titleParallaxRef.current, {
          y: -130,
          opacity: 0.15,
          filter: "blur(6px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (canvasContainerRef.current) {
          gsap.to(canvasContainerRef.current, {
            y: 90,
            scale: 1.08,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -60,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "60% top",
              scrub: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#05050A] select-none pt-24 pb-12 px-4 sm:px-6 md:px-12"
    >
      {/* 3D Atmospheric Canvas (Particles & Fluid Ambient Light) */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <HeroCanvas />
      </div>

      {/* Floating Volumetric Red Smoke Haze Orb Tracking Mouse (Subtle & Decent) */}
      <div
        ref={ambientSmokeRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] md:w-[680px] md:h-[680px] rounded-full pointer-events-none z-0 transition-opacity duration-700 will-change-transform opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(224,67,43,0.16) 0%, rgba(255,112,72,0.08) 35%, rgba(122,31,23,0.03) 60%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      {/* Subtle Static Center Base Ember Haze */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none z-0 bg-[radial-gradient(circle,rgba(224,67,43,0.10)_0%,rgba(122,31,23,0.03)_40%,transparent_75%)] blur-[100px]" />

      {/* Top Status Pill / Subtag */}
      <div
        ref={subtagRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-2 opacity-100"
      >
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#E0432B] animate-pulse shadow-[0_0_10px_#E0432B]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/80 font-medium">
            Shipping Ideas Into Reality.
          </span>
        </div>
      </div>

      {/* Outer Parallax Wrapper (GSAP ScrollTrigger handles y & opacity cleanly on scroll) */}
      <div
        ref={titleParallaxRef}
        className="relative z-10 w-full max-w-[720px] md:max-w-[920px] lg:max-w-[1150px] mx-auto flex flex-col items-center justify-center my-auto py-6 overflow-visible drop-shadow-[0_0_20px_rgba(224,67,43,0.12)] opacity-100 will-change-transform"
      >
        {/* Inner Tilt Wrapper (3D Mouse Perspective Tilt) */}
        <div
          ref={titleTiltRef}
          className="w-full flex flex-col items-center justify-center overflow-visible transition-transform duration-150 ease-out"
        >
          {/* Kinetic Variable Typography */}
          <div className="w-full h-[110px] sm:h-[140px] md:h-[180px] lg:h-[220px] relative flex items-center justify-center scale-y-[1.12] transform-gpu">
            <TextPressure
              text={SITE_NAME}
              flex={true}
              stroke={true}
              width={true}
              weight={true}
              italic={false}
              alpha={false}
              minFontSize={42}
              textColor="rgba(255, 255, 255, 0.95)"
              strokeColor="#E0432B"
            />
          </div>

          {/* Central Red-Orange Tagline directly under letters */}
          <div className="mt-4 sm:mt-6 text-center z-20">
            <p className="hero-line text-[clamp(0.72rem,1.1vw,0.95rem)] font-extrabold tracking-[0.3em] uppercase text-[#E0432B] drop-shadow-[0_0_22px_rgba(224,67,43,0.85)] font-mono">
              Crafting Interfaces That People Remember.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Content & Magnetic Actions */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-6 opacity-100"
      >
        {/* Left Studio Bio */}
        <p className="text-white/60 max-w-sm text-xs sm:text-sm leading-relaxed font-light tracking-wide text-center md:text-left">
          Creative Technology Studio engineering fast, immersive, and motion-driven digital products.
        </p>

        {/* Right CTA Action Buttons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/contact"
            className="group relative rounded-full bg-[#E0432B] px-7 py-3.5 text-xs font-mono uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#FF7048] hover:shadow-[0_0_35px_rgba(224,67,43,0.45)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Work
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-mono">
                →
              </span>
            </span>
          </Link>

          <Link
            href="/services"
            className="rounded-full border border-white/15 px-6 py-3.5 text-xs font-mono uppercase tracking-[0.25em] text-[#F5F5F7]/80 backdrop-blur-md transition-all duration-300 hover:border-[#E0432B]/50 hover:bg-white/[0.04] hover:text-white hover:scale-[1.03] active:scale-[0.98]"
          >
            Let&apos;s Talk →
          </Link>
        </div>
      </div>

      {/* Minimal Scroll Pill Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none opacity-40">
        <span className="text-[8px] uppercase tracking-[0.35em] text-[#F5F5F7]/50 font-mono">
          Scroll
        </span>
        <div className="w-[1px] h-5 bg-gradient-to-b from-[#E0432B] to-transparent animate-pulse" />
      </div>
    </section>
  );
}