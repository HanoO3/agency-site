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
      className="relative w-full bg-[#05050A] py-24 md:py-40 px-6 md:px-12 z-10 overflow-hidden"
      aria-label="Our Team"
    >
      {/* Background Volumetric Ember Rim Glow */}
      <div className="absolute right-[-10%] top-1/3 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.06)_0%,transparent_70%)] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 md:pb-16 border-b border-[#F4F1EC]/10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-3 font-mono">
                The Team
              </p>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#F4F1EC] leading-[0.95]">
                People behind the work.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#8A8A93] font-normal max-w-md leading-relaxed">
              A multidisciplinary team combining design, technology and digital expertise to build meaningful experiences.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Showcase Roster */}
        <div className="divide-y divide-[#F4F1EC]/10">
          {TEAM_MEMBERS.map((member, idx) => (
            <ScrollReveal key={member.name} delay={idx * 0.06} y={25}>
              <div
                tabIndex={0}
                className="group relative py-10 md:py-14 px-4 md:px-6 transition-all duration-400 ease-out cursor-pointer overflow-hidden rounded-xl hover:bg-[#F4F1EC]/[0.015] focus:outline-none focus:bg-[#F4F1EC]/[0.02]"
              >
                {/* Left Subtle Ember Hairline Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E0432B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#E0432B]" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 relative z-10">
                  {/* Large Editorial Name */}
                  <div className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E0432B] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:inline-block shadow-[0_0_8px_#E0432B]" />
                    <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white group-hover:translate-x-2 transition-transform duration-300 leading-none">
                      {member.name}
                    </h3>
                  </div>

                  {/* Role & Subtle Directional Arrow */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-[#8A8A93] group-hover:text-[#E0432B] font-mono transition-colors duration-300">
                      {member.role}
                    </p>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#E0432B] font-mono text-base hidden sm:inline-block">
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
