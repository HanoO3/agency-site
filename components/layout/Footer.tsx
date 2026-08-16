import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#05050A] border-t border-white/10 z-10">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-12">
          {/* Brand Column */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-display text-2xl font-black uppercase tracking-tight text-[#F5F5F7] hover:text-[#E0432B] transition-colors flex items-center gap-2"
            >
              <span>{SITE_NAME}</span>
              <span className="w-2 h-2 rounded-full bg-[#E0432B] inline-block shadow-[0_0_8px_#E0432B]" />
            </Link>
            <p className="text-xs sm:text-sm font-light text-white/50 mt-4 leading-relaxed">
              We design and build digital products — from web and app development to full e-commerce experiences.
            </p>
          </div>

          {/* Nav & Connect Columns */}
          <div className="flex gap-16 sm:gap-24">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E0432B] mb-4 font-medium">
                Navigation
              </p>
              <ul className="space-y-3 text-xs font-mono uppercase tracking-widest text-white/60">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E0432B] mb-4 font-medium">
                Connect
              </p>
              <ul className="space-y-3 text-xs font-mono uppercase tracking-widest text-white/60">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} {SITE_NAME}. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
            CRAFTED WITH PRECISION
          </p>
        </div>
      </div>
    </footer>
  );
}