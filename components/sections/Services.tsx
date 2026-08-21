"use client";

import { services } from "@/data/services";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#05050A] py-32 md:py-44 px-6 z-10 overflow-hidden"
    >
      {/* Background Volumetric Ember Rim Glow */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.09)_0%,rgba(5,5,10,0)_70%)] blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-3 font-mono font-medium">
                Capabilities
              </p>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#F5F5F7] leading-[0.95]">
                Core Practice Areas
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-white/40 max-w-xs uppercase tracking-widest leading-relaxed">
              Engineered for modern digital impact & performance.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Services List */}
        <div className="divide-y divide-white/10 mt-2">
          {services.map((service, idx) => {
            return (
              <ScrollReveal key={service.slug} delay={idx * 0.08} y={35}>
                <div className="group relative py-12 md:py-16 px-4 md:px-8 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl hover:bg-white/[0.015]">
                  {/* Warm Ember Light Sweep Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E0432B]/[0.09] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {/* Subtle Ember Left Border Indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E0432B] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_#E0432B]" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                    {/* Left Column: Number & Large Service Title */}
                    <div className="flex items-start md:items-center gap-6 md:gap-14">
                      <span className="text-xs md:text-sm font-mono text-[#E0432B]/60 tracking-widest group-hover:text-[#E0432B] group-hover:scale-110 transition-all duration-300 font-semibold pt-2 md:pt-0">
                        {service.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#F5F5F7] group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                            {service.title}
                          </h3>
                          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[#E0432B] font-mono text-xl md:text-2xl hidden sm:inline-block">
                            →
                          </span>
                        </div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#E0432B]/80 font-mono mt-2">
                          {service.category}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Description & Deliverables Tags */}
                    <div className="max-w-xl lg:text-right flex flex-col lg:items-end gap-4">
                      <p className="text-sm md:text-base text-[#F5F5F7]/60 font-light leading-relaxed group-hover:text-[#F5F5F7]/95 transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Deliverables pill tags */}
                      <div className="flex flex-wrap lg:justify-end gap-2 pt-2">
                        {(service.deliverables ?? []).map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-[10px] uppercase font-mono tracking-wider px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/50 group-hover:border-[#E0432B]/40 group-hover:text-white/90 group-hover:bg-[#E0432B]/[0.04] transition-all duration-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
