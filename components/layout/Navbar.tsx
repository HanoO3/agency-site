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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/#hero" || href === "/") {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el && typeof window !== "undefined" && window.location.pathname === "/") {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#05050A]/85 backdrop-blur-xl border-b border-[#F4F1EC]/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link
          href="/#hero"
          onClick={(e) => handleNavClick(e, "/#hero")}
          className="font-display text-lg sm:text-xl font-light uppercase tracking-tight text-[#F4F1EC] hover:text-[#E0432B] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>{SITE_NAME}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0432B] inline-block shadow-[0_0_8px_#E0432B]" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93]">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link-hover hover:text-[#F4F1EC] transition-colors py-1 inline-block cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/#contact"
          onClick={(e) => handleNavClick(e, "/#contact")}
          className="hidden md:inline-flex items-center justify-center rounded-full border border-[#8A8A93]/30 bg-transparent px-6 py-2.5 text-xs font-mono uppercase tracking-[0.15em] text-[#F4F1EC] hover:border-[#E0432B]/60 hover:text-white hover:bg-[#E0432B]/10 hover:shadow-[0_0_20px_rgba(224,67,43,0.25)] transition-all duration-300 cursor-pointer"
        >
          Start a Project
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden text-[#F4F1EC]/80 p-2 text-xl focus:outline-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden px-6 py-8 flex flex-col gap-6 bg-[#05050A]/95 border-b border-[#F4F1EC]/10 backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[#8A8A93] hover:text-[#E0432B] transition-colors text-xs font-mono uppercase tracking-[0.2em] py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            className="mt-2 inline-flex justify-center rounded-full bg-[#E0432B] px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-[#05050A] font-semibold text-center shadow-[0_0_20px_rgba(224,67,43,0.3)]"
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}