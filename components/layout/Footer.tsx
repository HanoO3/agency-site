"use client";

import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { services } from "@/data/services";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#05050A] border-t border-white/10 z-10 overflow-hidden">
      {/* Background Volumetric Ember Atmosphere */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-[radial-gradient(circle_at_bottom,rgba(224,67,43,0.12)_0%,rgba(122,31,23,0.05)_45%,transparent_75%)] blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Pre-Footer Action Banner */}
        <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-[#08080E] border border-white/10 overflow-hidden mb-20 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-[#E0432B]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(224,67,43,0.15)]">
          {/* Subtle Ember Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E0432B]/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#E0432B] font-semibold block mb-3">
              Ready to Collaborate
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#F5F5F7] leading-[1.05]">
              Have an ambitious project in mind?
            </h3>
            <p className="text-white/60 text-sm md:text-base font-light mt-3 leading-relaxed">
              We design and engineer high-performance digital experiences for brands that prioritize craft over compromise.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Link
              href="/contact"
              className="group/btn relative inline-flex items-center gap-3 rounded-full bg-[#E0432B] px-8 py-4 text-xs font-mono uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#FF7048] hover:shadow-[0_0_35px_rgba(224,67,43,0.4)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>Start a Project</span>
              <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5 font-mono">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Column 1 & 2: Brand Information & Status Badge */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="font-display text-2xl font-black uppercase tracking-tight text-[#F5F5F7] hover:text-[#E0432B] transition-colors inline-flex items-center gap-2"
            >
              <span>{SITE_NAME}</span>
              <span className="w-2 h-2 rounded-full bg-[#E0432B] inline-block shadow-[0_0_8px_#E0432B]" />
            </Link>

            <p className="text-xs sm:text-sm font-light text-white/50 leading-relaxed max-w-sm">
              Creative technology studio crafting high-performance websites, web applications, and immersive 3D digital experiences.
            </p>

            {/* Live Studio Availability Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>Available for Select 2026 Projects</span>
              </div>
            </div>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E0432B] mb-5 font-semibold">
              Practice Areas
            </p>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-wider text-white/60">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors duration-200 block truncate"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Navigation */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E0432B] mb-5 font-semibold">
              Navigation
            </p>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-widest text-white/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E0432B] mb-5 font-semibold">
              Connect
            </p>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-widest text-white/60">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group/link"
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

        {/* Massive Background Watermark Typography */}
        <div className="relative select-none pointer-events-none overflow-hidden my-8 sm:my-12 text-center">
          <span className="font-display text-[15vw] font-black uppercase text-white/[0.025] tracking-tighter leading-none block whitespace-nowrap">
            {SITE_NAME}
          </span>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
          <p>© {new Date().getFullYear()} {SITE_NAME}. ALL RIGHTS RESERVED.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-[#E0432B] transition-colors duration-300 flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>

          <p className="text-white/25 hidden sm:block">ENGINEERED WITH TECHNICAL RIGOR</p>
        </div>
      </div>
    </footer>
  );
}