"use client";

import { testimonials } from "@/data/testimonials";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#05050A] py-24 md:py-40 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Background Volumetric Left Ember Glow */}
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.06)_0%,transparent_70%)] blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal y={30}>
          <div className="pb-12 border-b border-[#F4F1EC]/10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-3 font-mono">
              Client Endorsements
            </p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#F4F1EC]">
              What Partners Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} y={30}>
              <div className="group relative p-8 sm:p-10 rounded-2xl bg-[#F4F1EC]/[0.015] border border-[#F4F1EC]/10 hover:border-[#E0432B]/35 transition-all duration-400 ease-out hover:-translate-y-1 flex flex-col justify-between h-full">
                <div>
                  <span className="text-4xl text-[#E0432B]/60 font-serif leading-none block mb-4 select-none">
                    “
                  </span>
                  <p className="text-base sm:text-lg text-[#F4F1EC]/80 font-normal leading-relaxed italic mb-8">
                    {t.quote}
                  </p>
                </div>

                {/* Author Metadata */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#F4F1EC]/5">
                  <div className="w-9 h-9 rounded-full bg-[#E0432B]/15 border border-[#E0432B]/40 flex items-center justify-center font-mono text-xs font-bold text-[#E0432B]">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-light uppercase text-[#F4F1EC] tracking-wide">
                      {t.name}
                    </h4>
                    <p className="text-xs font-mono text-[#8A8A93] mt-0.5">
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
