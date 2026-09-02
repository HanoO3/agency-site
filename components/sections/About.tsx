"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";

export default function About() {
  const stats = [
    { number: "40+", label: "Projects Delivered" },
    { number: "4+", label: "Years Experience" },
    { number: "25+", label: "Happy Clients" },
  ];

  const supportingPoints = [
    {
      title: "Engineering Precision",
      description: "Clean code architecture, high performance, and future-proof scalability.",
    },
    {
      title: "Design Intuition",
      description: "Motion-driven interfaces, custom spatial interactions, and unforgettable brand touchpoints.",
    },
    {
      title: "Business Impact",
      description: "Clear communication, realistic timelines, and digital products engineered to convert.",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full bg-[#05050A] py-24 md:py-40 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Very subtle ember radial glow, low opacity */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.06)_0%,transparent_70%)] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Tag */}
        <ScrollReveal y={30}>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-4 font-mono">
            About Us
          </p>
        </ScrollReveal>

        {/* One Strong Statement */}
        <ScrollReveal delay={0.08} y={35}>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#F4F1EC] uppercase leading-[1.05] tracking-tight max-w-4xl">
            We&apos;re a creative technology studio building{" "}
            <span className="text-[#E0432B]">fast, thoughtful</span> digital products.
          </h2>
        </ScrollReveal>

        {/* 2–3 Supporting Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-[#F4F1EC]/10 items-stretch">
          {supportingPoints.map((point, i) => (
            <ScrollReveal key={i} delay={0.15 + i * 0.08} y={30} className="h-full">
              <div className="h-full p-8 rounded-2xl bg-[#F4F1EC]/[0.015] border border-[#F4F1EC]/10 flex flex-col justify-between">
                <div>
                  <span className="w-2 h-2 rounded-full bg-[#E0432B] inline-block mb-4" />
                  <h3 className="font-display text-xl font-light uppercase text-[#F4F1EC] mb-2 tracking-tight">
                    {point.title}
                  </h3>
                </div>
                <p className="text-sm text-[#8A8A93] leading-relaxed font-normal mt-2">
                  {point.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Animated Statistics Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-12 items-stretch">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={0.25 + i * 0.08} y={30} className="h-full">
              <div className="h-full p-8 md:p-10 rounded-2xl bg-[#F4F1EC]/[0.015] border border-[#F4F1EC]/10 flex flex-col justify-between min-h-[160px]">
                <p className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#F4F1EC] tracking-tight">
                  <CountUp value={stat.number} duration={2.2} />
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] font-mono mt-3">
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
