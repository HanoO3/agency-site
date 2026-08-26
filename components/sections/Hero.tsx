"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
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

    // Mouse tracking for fluid soft ambient haze & 3D tilt
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
        targetTiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        targetTiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      }
    };

    const renderLoop = () => {
      currentSmokeX += (mouseX - currentSmokeX) * 0.05;
      currentSmokeY += (mouseY - currentSmokeY) * 0.05;

      if (ambientSmokeRef.current) {
        ambientSmokeRef.current.style.transform = `translate3d(${currentSmokeX}px, ${currentSmokeY}px, 0) translate(-50%, -50%)`;
      }

      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

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
          y: -110,
          opacity: 0.2,
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
            y: 70,
            opacity: 0.25,
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
            y: -50,
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#05050A] select-none py-24 md:py-40 px-6 md:px-12"
    >
      {/* 3D Atmospheric Background Canvas */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <HeroCanvas />
      </div>

      {/* Soft, wide, low-opacity haze behind text (blur ~140px, opacity ~0.25) */}
      <div
        ref={ambientSmokeRef}
        className="fixed top-0 left-0 w-[550px] h-[550px] md:w-[750px] md:h-[750px] rounded-full pointer-events-none z-0 transition-opacity duration-700 will-change-transform opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(224,67,43,0.18) 0%, rgba(122,31,23,0.06) 45%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />

      {/* Static Center Subtle Base Haze */}
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] pointer-events-none z-0 bg-[radial-gradient(circle,rgba(224,67,43,0.08)_0%,transparent_70%)] blur-[140px] opacity-25" />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col justify-between h-full flex-grow gap-12">
        {/* Top Status Pill / Subtag */}
        <div
          ref={subtagRef}
          className="w-full flex items-center justify-between opacity-100"
        >
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8A8A93]/20 bg-[#F4F1EC]/[0.02] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0432B] shadow-[0_0_8px_#E0432B]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] font-normal">
              Shipping Ideas Into Reality.
            </span>
          </div>
        </div>

        {/* Center Title & Tagline Hierarchy */}
        <div
          ref={titleParallaxRef}
          className="w-full flex flex-col items-center justify-center my-auto py-4 overflow-visible opacity-100 will-change-transform"
        >
          <div
            ref={titleTiltRef}
            className="w-full flex flex-col items-center justify-center overflow-visible transition-transform duration-150 ease-out"
          >
            {/* Tagline in glowing ember red color */}
            <p className="text-xs sm:text-[13px] font-mono font-medium uppercase tracking-[0.25em] text-[#E0432B] drop-shadow-[0_0_18px_rgba(224,67,43,0.7)] mb-6 text-center">
              Crafting Interfaces That People Remember.
            </p>

            {/* Headline: thin/elegant (weight 200-300), tight leading-[0.9], slight negative letter-spacing */}
            <div className="w-full max-w-[1050px] h-[100px] sm:h-[135px] md:h-[165px] lg:h-[195px] relative flex items-center justify-center">
              <TextPressure
                text={SITE_NAME}
                flex={true}
                stroke={false}
                width={true}
                weight={true}
                italic={false}
                alpha={false}
                minFontSize={36}
                textColor="#F4F1EC"
              />
            </div>
          </div>
        </div>

        {/* Bottom Editorial Content & Button Hierarchy */}
        <div
          ref={contentRef}
          className="w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-8 pt-4 opacity-100"
        >
          {/* Left description text: text-base, leading-relaxed, max-w-md, ~70% foreground */}
          <p className="text-base text-[#F4F1EC]/70 max-w-md leading-relaxed font-normal text-center md:text-left">
            {SITE_TAGLINE}
          </p>

          {/* Right Action Buttons: Explore Work -> #work, Let's Talk -> #contact */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 flex-shrink-0">
            <Link
              href="/#work"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  const el = document.getElementById("work");
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#E0432B] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-[#05050A] font-semibold transition-all duration-300 hover:bg-[#FF7048] hover:shadow-[0_0_25px_rgba(224,67,43,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Work</span>
              <span className="ml-2.5 font-mono">→</span>
            </Link>

            <Link
              href="/#contact"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  const el = document.getElementById("contact");
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="inline-flex items-center justify-center rounded-full border border-[#8A8A93]/30 bg-transparent px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-[#F4F1EC] transition-all duration-300 hover:bg-[#F4F1EC]/[0.05] hover:border-[#F4F1EC]/50 active:scale-[0.98] cursor-pointer"
            >
              Let&apos;s Talk →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}