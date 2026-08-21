"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    tagline: "Immersive Research & Objective Alignment",
    description:
      "Uncovering core brand DNA, technical constraints, and strategic imperatives through immersive workshops, competitor analysis, and creative alignment.",
    details: [
      "Stakeholder Interviews",
      "Technical Feasibility Audit",
      "Competitive Positioning",
      "Creative Direction",
    ],
  },
  {
    number: "02",
    title: "Strategy",
    tagline: "Architectural Blueprinting",
    description:
      "Engineering precise creative blueprints, interaction models, and spatial architectural specifications prior to any production code execution.",
    details: [
      "Information Architecture",
      "Interactive Wireframing",
      "Motion Concepts",
      "Technical Stack Specification",
    ],
  },
  {
    number: "03",
    title: "Creation",
    tagline: "Haute Engineering & Craftsmanship",
    description:
      "Crafting bespoke typography, photorealistic 3D assets, custom WebGL shaders, and high-performance React application logic in disciplined iterative sprints.",
    details: [
      "3D Spatial Modeling",
      "Custom Shader Development",
      "Front-end Architecture",
      "Micro-Interaction Design",
    ],
  },
  {
    number: "04",
    title: "Launch",
    tagline: "Rigorous Deployment & Calibration",
    description:
      "Rigorous performance optimization, cross-platform validation, zero-downtime global deployment, and ongoing creative support.",
    details: [
      "Performance Benchmarking",
      "Cross-Browser Quality Audit",
      "Edge Deployment",
      "Post-Launch Refinement",
    ],
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative w-full bg-[#05050A] py-32 md:py-44 px-6 z-10"
    >
      {/* Background Volumetric Ember Rim Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.08)_0%,rgba(5,5,10,0)_70%)] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal y={30}>
          <div className="pb-16 border-b border-white/10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-3 font-mono font-medium">
              Methodology
            </p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#F5F5F7]">
              Our Process
            </h2>
          </div>
        </ScrollReveal>

        {/* Minimal Vertical Timeline */}
        <div className="relative mt-16 ml-4 md:ml-12 border-l border-white/10 space-y-16 md:space-y-24 pl-8 md:pl-16">
          {PROCESS_STEPS.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 0.1} y={35}>
              <div className="group relative">
                {/* Circular Marker on Line with Glow */}
                <div className="absolute -left-[41px] md:-left-[73px] top-3.5 w-4 h-4 rounded-full border border-[#E0432B] bg-[#05050A] group-hover:bg-[#E0432B] group-hover:shadow-[0_0_18px_#E0432B] transition-all duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E0432B] group-hover:bg-white transition-colors duration-300" />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 bg-[#08080E]/70 p-8 sm:p-10 rounded-2xl border border-white/10 group-hover:border-[#E0432B]/40 transition-all duration-500 hover:bg-[#08080E] hover:shadow-[0_0_35px_rgba(224,67,43,0.12)]">
                  {/* Left Step Header */}
                  <div>
                    <span className="font-display text-5xl sm:text-7xl font-black text-white/20 group-hover:text-[#E0432B] transition-colors duration-500 tracking-tighter">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#F5F5F7] mt-2 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#E0432B] font-mono mt-1 font-medium">
                      {step.tagline}
                    </p>
                  </div>

                  {/* Right Description & Bullet Points */}
                  <div className="max-w-xl">
                    <p className="text-sm md:text-base text-white/60 font-light leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
                      {step.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2 text-xs font-mono text-white/40 group-hover:text-white/60 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#E0432B]" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
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
