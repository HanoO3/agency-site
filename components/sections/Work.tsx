"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ScrollReveal from "@/components/animations/ScrollReveal";

const CATEGORIES = ["ALL", "E-COMMERCE", "APP DEVELOPMENT", "WEB DEVELOPMENT"];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "ALL" || p.category.toUpperCase() === activeFilter
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Only apply pinned horizontal scroll on desktop screens with standard filters
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop || prefersReducedMotion || activeFilter !== "ALL") {
      return;
    }

    const ctx = gsap.context(() => {
      const track = horizontalTrackRef.current;
      const trigger = triggerRef.current;
      if (!track || !trigger) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${totalScroll * 1.25}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-[#05050A] py-24 md:py-36 z-10 overflow-hidden"
    >
      {/* Background Volumetric Ambient Glow */}
      <div className="absolute left-[-10%] top-[25%] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.08)_0%,rgba(5,5,10,0)_70%)] blur-[160px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-3 font-mono font-medium">
                Selected Cases
              </p>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#F5F5F7]">
                Featured Client Work
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                    activeFilter === cat
                      ? "border-[#E0432B] bg-[#E0432B]/10 text-white shadow-[0_0_15px_rgba(224,67,43,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* DESKTOP PINNED HORIZONTAL SHOWCASE (When filter is 'ALL') */}
      {activeFilter === "ALL" ? (
        <div ref={triggerRef} className="hidden lg:block relative w-full overflow-hidden">
          <div
            ref={horizontalTrackRef}
            className="flex gap-12 pl-12 pr-24 w-max items-center h-[75vh]"
          >
            {filteredProjects.map((project, idx) => {
              const projectNumber = `0${idx + 1}`;

              return (
                <div
                  key={project.slug}
                  onClick={() => setSelectedProject(project)}
                  className="group relative w-[680px] h-[540px] flex-shrink-0 bg-[#08080E] rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#E0432B]/50 hover:shadow-[0_0_45px_rgba(224,67,43,0.25)] flex flex-col justify-between"
                >
                  {/* Top Bar inside Card */}
                  <div className="p-8 pb-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-bold text-[#E0432B]">
                        {projectNumber}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/40 border border-white/10 px-3 py-1 rounded-full bg-black/40">
                      {project.year || "2026"}
                    </span>
                  </div>

                  {/* Project Image Showcase with Internal Parallax Zoom */}
                  <div className="relative mx-8 h-[270px] rounded-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="680px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.05] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080E]/90 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom Information */}
                  <div className="p-8 pt-4 z-10">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/50 font-light mt-2 max-w-md line-clamp-2 leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E0432B] group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0">
                        <span>VIEW</span>
                        <span className="text-sm">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* RESPONSIVE STACKED GRID (Mobile & Filtered Views) */}
      <div
        className={`${
          activeFilter === "ALL" ? "block lg:hidden" : "block"
        } max-w-7xl mx-auto px-6`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, idx) => {
            return (
              <ScrollReveal key={project.slug} delay={idx * 0.1} y={40}>
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-[#08080E] rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#E0432B]/40 hover:shadow-[0_0_40px_rgba(224,67,43,0.22)]"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.08] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080E] via-transparent to-transparent opacity-85" />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
                        {project.year || "2026"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E0432B]">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors duration-300 mt-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50 font-light mt-2 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {(project.tags ?? []).map((t, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono uppercase tracking-wider text-white/40"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono text-[#E0432B]">
                        <span>VIEW</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#08080E] border border-white/15 rounded-2xl p-6 sm:p-10 overflow-y-auto max-h-[90vh] shadow-[0_0_60px_rgba(224,67,43,0.3)]"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-xl font-mono p-2 cursor-pointer"
            >
              ✕
            </button>

            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E0432B]">
              {selectedProject.category} — {selectedProject.year || "2026"}
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#F5F5F7] tracking-tight mt-2 mb-6">
              {selectedProject.title}
            </h2>

            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-base text-white/80 font-light leading-relaxed mb-6">
              {selectedProject.summary} Designed and engineered by Cartcode in close collaboration with {selectedProject.client}. Delivered with high performance standards, custom interaction logic, and scalable architecture.
            </p>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex gap-2">
                {(selectedProject.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-white/60 bg-white/[0.02]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-full bg-[#E0432B] px-6 py-2.5 text-xs font-mono uppercase tracking-widest text-white hover:bg-[#FF7048] transition-colors cursor-pointer"
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
