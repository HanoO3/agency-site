"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { services } from "@/data/services";

export default function Footer() {
  const watermarkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/#hero" || href === "/") {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        e.preventDefault();
        scrollToTop();
      }
    } else if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el && typeof window !== "undefined" && window.location.pathname === "/") {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;
    let isHovering = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (watermarkRef.current) {
        const rect = watermarkRef.current.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        isHovering = true;
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetX = -999;
      targetY = -999;
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const render = () => {
      if (isHovering) {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
      } else {
        currentX += (-999 - currentX) * 0.1;
        currentY += (-999 - currentY) * 0.1;
      }

      if (revealRef.current) {
        revealRef.current.style.setProperty("--watermark-x", `${currentX}px`);
        revealRef.current.style.setProperty("--watermark-y", `${currentY}px`);
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    const el = watermarkRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove, { passive: true });
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
      rafId = requestAnimationFrame(render);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer className="relative w-full bg-[#05050A] border-t border-[#F4F1EC]/10 z-10 overflow-hidden">
      {/* Background Volumetric Ember Atmosphere */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-[radial-gradient(circle_at_bottom,rgba(224,67,43,0.08)_0%,transparent_70%)] blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-12">
        {/* Pre-Footer Action Banner */}
        <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-[#0B0B12] border border-[#F4F1EC]/10 overflow-hidden mb-20 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-[#E0432B]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(224,67,43,0.1)]">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E0432B] block mb-3">
              Ready to Collaborate
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-[#F4F1EC] leading-[1.05]">
              Have an ambitious project in mind?
            </h3>
            <p className="text-[#8A8A93] text-sm md:text-base font-normal mt-3 leading-relaxed">
              We design and engineer high-performance digital experiences for brands that prioritize craft over compromise.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="inline-flex items-center gap-3 rounded-full bg-[#E0432B] px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] text-[#05050A] font-semibold transition-all duration-300 hover:bg-[#FF7048] hover:shadow-[0_0_30px_rgba(224,67,43,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <span>Start a Project</span>
              <span className="font-mono">→</span>
            </Link>
          </div>
        </div>

        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-[#F4F1EC]/10">
          {/* Column 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/#hero"
              onClick={(e) => handleNavClick(e, "/#hero")}
              className="font-display text-2xl font-light uppercase tracking-tight text-[#F4F1EC] hover:text-[#E0432B] transition-colors inline-flex items-center gap-2"
            >
              <span>{SITE_NAME}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0432B] inline-block shadow-[0_0_8px_#E0432B]" />
            </Link>

            <p className="text-sm font-normal text-[#8A8A93] leading-relaxed max-w-sm">
              Creative technology studio crafting high-performance websites, web applications, and immersive 3D digital experiences.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#F4F1EC]/10 bg-[#F4F1EC]/[0.02] text-xs font-mono uppercase tracking-wider text-[#8A8A93] whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] flex-shrink-0" />
                <span>Available for Select 2026 Projects</span>
              </div>
            </div>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#E0432B] mb-5">
              Practice Areas
            </p>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-wider text-[#8A8A93]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/#services"
                    onClick={(e) => handleNavClick(e, "/#services")}
                    className="hover:text-[#F4F1EC] transition-colors duration-200 block truncate"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Navigation */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#E0432B] mb-5">
              Navigation
            </p>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-widest text-[#8A8A93]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-[#F4F1EC] transition-colors duration-200 block cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#E0432B] mb-5">
              Connect
            </p>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-widest text-[#8A8A93]">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F4F1EC] transition-colors duration-200 inline-flex items-center gap-1 group/link"
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Watermark */}
        <div
          ref={watermarkRef}
          className="relative select-none overflow-hidden my-8 sm:my-12 text-center cursor-default group/watermark"
        >
          <div
            ref={glowRef}
            className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 bg-[radial-gradient(circle,rgba(224,67,43,0.22)_0%,rgba(255,112,72,0.10)_35%,transparent_75%)] blur-[70px] will-change-transform z-0"
          />

          <span className="relative z-10 font-display text-[15vw] font-extralight uppercase text-[#F4F1EC]/[0.035] tracking-tight leading-none block whitespace-nowrap transition-colors duration-500 group-hover/watermark:text-[#F4F1EC]/[0.06]">
            {SITE_NAME}
          </span>

          <div
            ref={revealRef}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 240px at var(--watermark-x, -999px) var(--watermark-y, -999px), black 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.2) 65%, transparent 100%)",
              maskImage:
                "radial-gradient(circle 240px at var(--watermark-x, -999px) var(--watermark-y, -999px), black 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.2) 65%, transparent 100%)",
            }}
          >
            <span className="font-display text-[15vw] font-extralight uppercase tracking-tight leading-none block whitespace-nowrap bg-gradient-to-b from-[#F4F1EC] via-[#FF7048] to-[#E0432B] bg-clip-text text-transparent filter drop-shadow-[0_0_25px_rgba(224,67,43,0.8)]">
              {SITE_NAME}
            </span>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.15em] text-[#8A8A93]">
          <p>© {new Date().getFullYear()} {SITE_NAME}. ALL RIGHTS RESERVED.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-[#E0432B] transition-colors duration-300 flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}