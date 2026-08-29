"use client";

import { services } from "@/data/services";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#05050A] py-24 md:py-40 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Background Volumetric Ember Rim Glow */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.08)_0%,transparent_70%)] blur-[140px] pointer-events-none -z-10" />
      <div className="absolute left-[-10%] bottom-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.05)_0%,transparent_70%)] blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#F4F1EC]/10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#E0432B] mb-3 font-mono font-medium">
                Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#F4F1EC] leading-[1.05]">
                Core Practice Areas
              </h2>
            </div>
            <p className="text-sm font-normal text-[#8A8A93] max-w-xs leading-relaxed">
              Engineered for modern digital impact, craft, and performance.
            </p>
          </div>
        </ScrollReveal>

        {/* All Capabilities Cards Grid with Progressive Hover & Micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 items-stretch">
          {services.map((service, idx) => (
            <ScrollReveal key={service.slug} delay={idx * 0.07} y={30} className="h-full">
              <div className="group relative h-full p-8 sm:p-10 rounded-2xl bg-[#F4F1EC]/[0.015] border border-[#F4F1EC]/10 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#E0432B]/40 hover:bg-[#F4F1EC]/[0.025] hover:shadow-[0_10px_35px_rgba(224,67,43,0.12)] flex flex-col justify-between min-h-[300px] overflow-hidden">
                {/* Radial Glow Highlight on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(224,67,43,0.15),transparent_70%)] rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />


                <div>
                  {/* Card Top: Number & Category */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#F4F1EC]/5">
                    <span className="text-xs font-mono text-[#8A8A93] group-hover:text-[#E0432B] transition-colors duration-300">
                      {service.number}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#E0432B]">
                      {service.category}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <div className="pt-5">
                    <h3 className="font-display text-xl sm:text-2xl font-light uppercase tracking-tight text-[#F4F1EC] mb-2.5 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#8A8A93] leading-relaxed font-normal group-hover:text-[#F4F1EC]/80 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Deliverables pill tags */}
                {service.deliverables && (
                  <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-[#F4F1EC]/5">
                    {service.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full border border-[#F4F1EC]/10 bg-[#F4F1EC]/[0.02] text-[#8A8A93] group-hover:border-[#E0432B]/30 group-hover:text-[#F4F1EC] transition-all duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
