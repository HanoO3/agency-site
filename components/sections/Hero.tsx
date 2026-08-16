"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // glow rises up behind the text first
    tl.fromTo(
      glowRef.current,
      { opacity: 0, y: 60, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2 }
    );

    // heading letters fade + rise in
    if (headingRef.current) {
      const letters = headingRef.current.querySelectorAll(".letter");
      tl.fromTo(
        letters,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.05,
        },
        "-=0.8"
      );
    }
  }, []);

  const letters = SITE_NAME.split("");

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* glow effect behind heading */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/30 blur-[120px]"
      />

      <div className="relative z-10 text-center px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent mb-6">
          Digital Agency
        </p>

        <h1
          ref={headingRef}
          className="font-display text-6xl md:text-8xl font-bold tracking-tight"
        >
          {letters.map((char, i) => (
            <span key={i} className="letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="mt-6 text-foreground/60 max-w-md mx-auto">
          {SITE_TAGLINE}
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-7 py-3 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Start a Project
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium hover:border-white/40 transition-colors"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}