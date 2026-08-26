"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    tagline: "Research & Alignment",
    description: "Uncovering core brand DNA, technical constraints, and strategic imperatives.",
  },
  {
    number: "02",
    title: "Strategy",
    tagline: "Architecture & Design",
    description: "Engineering precise creative wireframes, motion concepts, and technical specifications.",
  },
  {
    number: "03",
    title: "Creation",
    tagline: "Engineering & Craft",
    description: "Building custom 3D assets, dynamic animations, and high-performance frontend logic.",
  },
  {
    number: "04",
    title: "Launch",
    tagline: "Deploy & Calibrate",
    description: "Performance optimization, cross-browser audits, and zero-downtime deployment.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative w-full bg-[#05050A] py-24 md:py-40 px-6 md:px-12 z-10"
    >
      {/* Background Volumetric Ember Rim Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.05)_0%,transparent_70%)] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <ScrollReveal y={30}>
          <div className="pb-12 border-b border-[#F4F1EC]/10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-3 font-mono">
              Methodology
            </p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#F4F1EC]">
              Our Process
            </h2>
          </div>
        </ScrollReveal>

        {/* Clean Numbered Layout (Horizontal on desktop, stacked on mobile) with Staggered Slide-up */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mt-12">
          {PROCESS_STEPS.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 0.1} y={35}>
              <div className="group p-8 rounded-2xl bg-[#F4F1EC]/[0.015] border border-[#F4F1EC]/10 flex flex-col justify-between min-h-[260px] transition-all duration-500 hover:-translate-y-1 hover:border-[#E0432B]/40 hover:shadow-[0_0_30px_rgba(224,67,43,0.08)]">
                <div>
                  <span className="font-display text-4xl sm:text-5xl font-extralight text-[#8A8A93] tracking-tight group-hover:text-[#E0432B] transition-colors duration-300">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-light uppercase tracking-tight text-[#F4F1EC] mt-4 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#E0432B] font-mono mt-1">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#8A8A93] font-normal leading-relaxed mt-6">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
