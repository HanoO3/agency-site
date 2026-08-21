"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (currentScrollY > 150 && currentScrollY > lastScrollY && !open) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#05050A]/85 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-[#F5F5F7] hover:text-[#E0432B] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>{SITE_NAME}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0432B] inline-block shadow-[0_0_10px_#E0432B]" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10 text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link-hover hover:text-[#F5F5F7] transition-colors py-1 inline-block cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/80 hover:border-[#E0432B]/60 hover:text-white hover:bg-[#E0432B]/10 hover:shadow-[0_0_20px_rgba(224,67,43,0.25)] transition-all duration-300 cursor-pointer"
        >
          Start a Project
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden text-white/80 p-2 text-xl focus:outline-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden px-6 py-8 flex flex-col gap-6 bg-[#05050A]/95 border-b border-white/10 backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-[#E0432B] transition-colors text-xs font-mono uppercase tracking-[0.25em] py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center rounded-full bg-[#E0432B] px-6 py-3 text-xs font-mono uppercase tracking-[0.25em] text-white text-center shadow-[0_0_20px_rgba(224,67,43,0.3)]"
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}