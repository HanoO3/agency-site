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
  const subtagRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mouse-following ember glow with damped lerp
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
    };

    const renderMouseGlow = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(renderMouseGlow);
    };

    if (!prefersReducedMotion && window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      rafId = requestAnimationFrame(renderMouseGlow);
    }

    // GSAP Entry & Parallax Context
    const ctx = gsap.context(() => {
      const chars = headingRef.current?.querySelectorAll(".hero-char");
      const subtag = subtagRef.current;
      const content = contentRef.current;
      const ambientGlow = ambientGlowRef.current;

      if (!prefersReducedMotion && chars && chars.length > 0) {
        // Initial setup for character physical spring state
        gsap.set(chars, {
          opacity: 0,
          y: 120,
          rotateX: -65,
          scale: 0.88,
          transformOrigin: "50% 100% -30px",
        });

        if (subtag) {
          gsap.set(subtag, { opacity: 0, y: 15 });
        }

        if (content) {
          gsap.set(content.children, { opacity: 0, y: 22 });
        }

        if (ambientGlow) {
          gsap.set(ambientGlow, { opacity: 0, scale: 0.7 });
        }

        let hasTriggered = false;

        const playHeroAnimation = () => {
          if (hasTriggered) return;
          hasTriggered = true;

          const heroTl = gsap.timeline({
            onComplete: () => {
              // Ensure characters and elements remain permanently visible and rock-solid
              if (chars) {
                gsap.set(chars, { opacity: 1, y: 0, rotateX: 0, scale: 1 });
              }
            },
          });

          // 1. Ambient Volumetric Glow expansion
          if (ambientGlow) {
            heroTl.to(
              ambientGlow,
              { opacity: 0.85, scale: 1, duration: 1.4, ease: "power2.out" },
              0
            );
          }

          // 2. Strong elastic / spring character entrance with overshoot & physical bounce
          heroTl.to(
            chars,
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.25,
              ease: "elastic.out(1.05, 0.42)",
              stagger: 0.045,
            },
            0
          );

          // 3. Supporting Subtitle Tag entrance
          if (subtag) {
            heroTl.to(
              subtag,
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
              },
              0.35
            );
          }

          // 4. Description Tagline & CTA Action Buttons entrance as CARTCODE settles
          if (content) {
            heroTl.to(
              content.children,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
              },
              0.5
            );
          }
        };

        // Listen for preloader countdown climax or completion
        window.addEventListener("cartcode_hero_reveal", playHeroAnimation);
        window.addEventListener("cartcode_intro_finished", playHeroAnimation);

        // Fallback in case preloader is bypassed or already finished
        const fallbackTimer = setTimeout(playHeroAnimation, 1200);

        // Cleanup event listener on unmount
        return () => {
          window.removeEventListener("cartcode_hero_reveal", playHeroAnimation);
          window.removeEventListener("cartcode_intro_finished", playHeroAnimation);
          clearTimeout(fallbackTimer);
        };
      }

      // Multi-layer Cinematic Scroll Parallax (after settled)
      if (sectionRef.current && !prefersReducedMotion) {
        // Foreground: Hero Typography speeds up & fades into distance
        gsap.to(headingRef.current, {
          y: -160,
          opacity: 0.04,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Midground: 3D floating sculpture moves down slightly creating depth
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

        // Background / Content fade
        gsap.to(contentRef.current, {
          y: -70,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "65% top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
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
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <HeroCanvas />
      </div>

      {/* Interactive Mouse-Following Ember Glow (Desktop) */}
      <div
        ref={mouseGlowRef}
        className="hidden md:block absolute top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-0 opacity-45 blur-[130px] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(224,67,43,0.30) 0%, rgba(255,112,72,0.12) 40%, transparent 70%)",
        }}
      />

      {/* Static Volumetric Right Ambient Rim Glow */}
      <div
        ref={ambientGlowRef}
        className="absolute right-[-8%] top-[12%] w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.22)_0%,rgba(122,31,23,0.10)_45%,rgba(5,5,10,0)_75%)] blur-[150px] pointer-events-none z-0"
      />

      {/* Hero Central Editorial Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Supporting Subheadline Tag */}
        <p
          ref={subtagRef}
          className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-[#E0432B] mb-4 sm:mb-6 font-mono font-medium"
        >
          Creative Technology Studio
        </p>

        {/* Massive Dominant Editorial Agency Typography */}
        <div className="hero-char-wrapper w-full flex justify-center py-2 overflow-visible">
          <h1
            ref={headingRef}
            className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[14vw] xl:text-[12.5rem] 2xl:text-[14.5rem] font-black tracking-tighter text-[#F5F5F7] leading-[0.85] select-none text-center w-full uppercase flex items-center justify-center"
            aria-label={headlineText}
          >
            {letters.map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div
          ref={contentRef}
          className="flex flex-col items-center mt-6 sm:mt-10"
        >
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
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-mono">
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

      {/* Minimal Animated Scroll Indicator */}
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