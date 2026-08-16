"use client";

import { testimonials } from "@/data/testimonials";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full bg-[#05050A] py-28 md:py-36 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal y={30}>
          <div className="pb-12 border-b border-white/10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-3 font-mono font-medium">
              Client Endorsements
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5F5F7]">
              What Partners Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} y={30}>
              <div className="group relative p-8 sm:p-10 rounded-2xl bg-[#08080E] border border-white/10 hover:border-[#E0432B]/40 transition-all duration-500 hover:bg-[#08080E]/90">
                <span className="text-4xl text-[#E0432B]/40 font-serif leading-none block mb-4">“</span>
                <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed italic mb-8">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-[#E0432B]/20 border border-[#E0432B]/50 flex items-center justify-center font-mono text-xs font-bold text-[#E0432B]">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase text-white">
                      {t.name}
                    </h4>
                    <p className="text-xs font-mono text-white/40">
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
