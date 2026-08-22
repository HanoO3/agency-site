"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";

interface TeamMember {
  name: string;
  role: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Hassan Tehami",
    role: "E-commerce Specialist",
  },
  {
    name: "Soban Amjad",
    role: "Full-Stack Developer",
  },
  {
    name: "Saim Khan",
    role: "QA Tester",
  },
  {
    name: "Hana Nasir",
    role: "Backend Developer",
  },
  {
    name: "M. Zeeshan",
    role: "UI/UX Designer",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative w-full bg-[#05050A] py-32 md:py-44 px-6 z-10 overflow-hidden"
      aria-label="Our Team"
    >
      {/* Background Volumetric Ember Rim Glow */}
      <div className="absolute right-[-10%] top-1/3 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.11)_0%,rgba(122,31,23,0.04)_45%,rgba(5,5,10,0)_75%)] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 md:pb-20 border-b border-white/10">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-3 font-mono font-medium">
                The Team
              </p>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#F5F5F7] leading-[0.95]">
                People behind the work.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-white/60 font-light max-w-md leading-relaxed">
              A multidisciplinary team combining design, technology and digital expertise to build meaningful experiences.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Showcase Roster */}
        <div className="divide-y divide-white/10">
          {TEAM_MEMBERS.map((member, idx) => (
            <ScrollReveal key={member.name} delay={idx * 0.07} y={30}>
              <div
                tabIndex={0}
                className="group relative py-12 md:py-16 px-4 md:px-8 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl hover:bg-white/[0.015] focus:outline-none focus:bg-white/[0.02]"
              >
                {/* Warm Ember Light Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E0432B]/[0.07] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Left Subtle Ember Hairline Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E0432B] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_#E0432B]" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 relative z-10">
                  {/* Large Editorial Name */}
                  <div className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E0432B] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:inline-block shadow-[0_0_8px_#E0432B]" />
                    <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#F5F5F7] group-hover:text-white group-hover:translate-x-2 sm:group-hover:translate-x-1 transition-transform duration-300 leading-none">
                      {member.name}
                    </h3>
                  </div>

                  {/* Secondary Role & Subtle Directional Arrow */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/50 group-hover:text-[#E0432B] font-mono transition-colors duration-300 font-medium">
                      {member.role}
                    </p>
                    <span className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#E0432B] font-mono text-lg sm:text-xl hidden sm:inline-block">
                      →
                    </span>
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
