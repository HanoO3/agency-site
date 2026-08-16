import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-display text-lg font-bold">{SITE_NAME}</p>
          <p className="text-sm text-foreground/60 mt-2 max-w-xs">
            We design and build digital products — from web and app
            development to full e-commerce experiences.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-sm font-medium mb-3 text-foreground/90">Site</p>
            <ul className="space-y-2 text-sm text-foreground/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium mb-3 text-foreground/90">Follow</p>
            <ul className="space-y-2 text-sm text-foreground/60">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-primary transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-foreground/40">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}