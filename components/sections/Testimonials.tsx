"use client";

import { testimonials } from "@/data/testimonials";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#05050A] py-28 md:py-36 px-6 z-10 overflow-hidden"
    >
      {/* Background Volumetric Left Ember Glow */}
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.07)_0%,rgba(5,5,10,0)_70%)] blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal y={30}>
          <div className="pb-12 border-b border-white/10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-3 font-mono font-medium">
              Client Endorsements
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#F5F5F7]">
              What Partners Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-14">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.12} y={35}>
              <div className="group relative p-8 sm:p-12 rounded-2xl bg-[#08080E] border border-white/10 hover:border-[#E0432B]/45 transition-all duration-500 hover:bg-[#08080E]/95 hover:shadow-[0_0_40px_rgba(224,67,43,0.18)] flex flex-col justify-between h-full">
                {/* Large Editorial Quotation Mark */}
                <div>
                  <span className="text-5xl md:text-6xl text-[#E0432B]/50 font-serif leading-none block mb-6 select-none group-hover:text-[#E0432B] transition-colors duration-300">
                    “
                  </span>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed italic mb-8">
                    {t.quote}
                  </p>
                </div>

                {/* Author Metadata */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#E0432B]/15 border border-[#E0432B]/50 flex items-center justify-center font-mono text-sm font-bold text-[#E0432B] group-hover:bg-[#E0432B] group-hover:text-white transition-all duration-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold uppercase text-white tracking-wide">
                      {t.name}
                    </h4>
                    <p className="text-xs font-mono text-white/40 mt-0.5">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
