"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import HeroCanvas from "@/components/three/HeroCanvas";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Soft ember ambient illumination rises
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 0.9, scale: 1, duration: 2.2 }
      );

      // Hero letters stagger entrance with subtle blur reveal
      if (headingRef.current) {
        const letters = headingRef.current.querySelectorAll(".letter");
        tl.fromTo(
          letters,
          { opacity: 0, y: 60, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.25,
            stagger: 0.04,
            clearProps: "filter",
          },
          "-=1.8"
        );
      }

      // Subheadline and actions stagger reveal
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.14 },
          "-=0.8"
        );
      }

      // Smooth scroll parallax depth
      if (sectionRef.current) {
        gsap.to(headingRef.current, {
          y: -140,
          opacity: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(canvasContainerRef.current, {
          y: 70,
          scale: 1.05,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineText = SITE_NAME.toUpperCase();
  const letters = headlineText.split("");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#05050A] select-none pt-16"
    >
      {/* 3D Atmospheric Background Canvas Container */}
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* Atmospheric Soft Volumetric Light Glow on the Right */}
      <div
        ref={glowRef}
        className="absolute right-[-5%] top-[15%] w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.22)_0%,rgba(122,31,23,0.12)_45%,rgba(5,5,10,0)_75%)] blur-[150px] pointer-events-none z-0"
      />

      {/* Hero Central Editorial Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Supporting Subheadline Tag */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-[#E0432B] mb-4 sm:mb-6 font-mono font-medium">
          Creative Technology Studio
        </p>

        {/* Massive Dominant Editorial Agency Typography */}
        <h1
          ref={headingRef}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[14vw] xl:text-[12.5rem] 2xl:text-[14.5rem] font-black tracking-tighter text-[#F5F5F7] leading-[0.85] select-none text-center w-full overflow-hidden uppercase"
        >
          {letters.map((char, i) => (
            <span key={i} className="letter inline-block">
              {char}
            </span>
          ))}
        </h1>

        <div ref={contentRef} className="flex flex-col items-center mt-6 sm:mt-10">
          <p className="text-[#F5F5F7]/60 max-w-lg mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-light px-4 tracking-wide">
            {SITE_TAGLINE}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-5">
            <Link
              href="/contact"
              className="group relative rounded-full bg-[#E0432B] px-8 py-4 text-xs font-mono uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#FF7048] hover:shadow-[0_0_35px_rgba(224,67,43,0.4)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start a Project
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-mono">
                  →
                </span>
              </span>
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-white/15 px-8 py-4 text-xs font-mono uppercase tracking-[0.25em] text-[#F5F5F7]/80 backdrop-blur-md transition-all duration-300 hover:border-[#E0432B]/50 hover:bg-white/[0.04] hover:text-white hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-40">
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#F5F5F7]/50 font-mono">
          Scroll
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E0432B] animate-bounce" />
        </div>
      </div>
    </section>
  );
}