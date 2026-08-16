"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";

export default function About() {
  const stats = [
    { number: "40+", label: "Projects Delivered" },
    { number: "6+", label: "Years Combined Experience" },
    { number: "25+", label: "Happy Clients" },
  ];

  return (
    <section id="about" className="relative w-full bg-[#05050A] py-32 md:py-44 px-6 z-10 overflow-hidden">
      {/* Background Volumetric Ember Rim Glow */}
      <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.14)_0%,rgba(122,31,23,0.06)_45%,rgba(5,5,10,0)_75%)] blur-[150px] pointer-events-none -z-10" />

      {/* Abstract Metallic Wire Ring Backdrop SVG */}
      <div className="absolute right-[-5%] top-1/4 w-[500px] h-[500px] opacity-15 pointer-events-none -z-10 animate-[spin_60s_linear_infinite]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#E0432B]">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <polygon points="100,10 180,150 20,150" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.25" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <ScrollReveal y={30}>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-6 font-mono font-medium">
            About Us
          </p>
        </ScrollReveal>

        {/* Manifesto Large Body Text */}
        <ScrollReveal delay={0.1} y={40}>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F7] uppercase leading-[1.12] tracking-tight max-w-5xl">
            We&apos;re a small team that builds <span className="text-[#E0432B] italic">fast, thoughtful</span> digital products.
          </h2>
        </ScrollReveal>

        {/* Sub-Manifesto Paragraph (Original Content) */}
        <ScrollReveal delay={0.2} y={30} className="mt-12 max-w-3xl space-y-6">
          <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
            We started this agency to work with businesses who care about craft — clean code, thoughtful design, and interfaces that feel alive. Whether it&apos;s a marketing site, a full e-commerce store, or an interactive product experience, we treat every project like it&apos;s going to be someone&apos;s favorite thing they&apos;ve launched.
          </p>
          <p className="text-sm md:text-base text-white/45 font-light leading-relaxed border-l border-[#E0432B]/50 pl-6">
            Every project starts with understanding what actually moves the needle for your business — not just what looks good. We keep communication tight, timelines realistic, and code clean enough that it&apos;s easy to hand off or build on later.
          </p>
        </ScrollReveal>

        {/* Animated Statistics Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mt-24 pt-16 border-t border-white/10">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.1} y={30}>
              <div className="group relative p-8 rounded-xl bg-white/[0.015] border border-white/10 hover:border-[#E0432B]/40 hover:bg-white/[0.03] transition-all duration-500">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[radial-gradient(circle_at_top_right,rgba(224,67,43,0.15),transparent)] rounded-tr-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <p className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#F5F5F7] tracking-tight group-hover:text-white transition-colors duration-300">
                  <CountUp value={stat.number} duration={2.4} />
                </p>

                <p className="text-xs uppercase tracking-[0.25em] text-[#E0432B] font-mono mt-4 font-medium">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
