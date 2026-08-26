"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import { gsap } from "@/lib/gsap";
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
          end: () => `+=${totalScroll * 1.2}`,
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
      className="relative w-full bg-[#05050A] py-24 md:py-40 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Background Volumetric Ambient Glow */}
      <div className="absolute left-[-10%] top-[25%] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.06)_0%,transparent_70%)] blur-[160px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto mb-16">
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#F4F1EC]/10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-3 font-mono">
                Selected Cases
              </p>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#F4F1EC]">
                Featured Client Work
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs font-mono uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                    activeFilter === cat
                      ? "border-[#E0432B] bg-[#E0432B]/10 text-[#F4F1EC] shadow-[0_0_15px_rgba(224,67,43,0.2)]"
                      : "border-[#F4F1EC]/10 bg-transparent text-[#8A8A93] hover:border-[#F4F1EC]/30 hover:text-[#F4F1EC]"
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
            className="flex gap-10 pl-6 pr-20 w-max items-center h-[72vh]"
          >
            {filteredProjects.map((project, idx) => {
              const projectNumber = `0${idx + 1}`;

              return (
                <div
                  key={project.slug}
                  onClick={() => setSelectedProject(project)}
                  className="group relative w-[620px] h-[500px] flex-shrink-0 bg-[#0B0B12] rounded-2xl border border-[#F4F1EC]/10 overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#E0432B]/40 hover:shadow-[0_0_35px_rgba(224,67,43,0.1)] flex flex-col justify-between"
                >
                  {/* Top Bar */}
                  <div className="p-8 pb-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-medium text-[#8A8A93]">
                        {projectNumber}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B]">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#8A8A93] border border-[#F4F1EC]/10 px-3 py-1 rounded-full bg-[#05050A]/60">
                      {project.year || "2026"}
                    </span>
                  </div>

                  {/* Project Image Showcase with 700ms scale-105 zoom & dark overlay fade-in */}
                  <div className="relative mx-8 h-[240px] rounded-xl overflow-hidden bg-[#05050A]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="620px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Bottom Information & Soft Ghost View Project Link */}
                  <div className="p-8 pt-4 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#8A8A93] font-normal mt-2 max-w-sm line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B] flex-shrink-0 transition-transform duration-300">
                      <span>View Project</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-mono">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* MOBILE & FILTERED GRID VIEW */}
      <div
        className={`${
          activeFilter === "ALL" ? "block lg:hidden" : "block"
        } max-w-[1400px] mx-auto`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.slug} delay={idx * 0.08} y={30}>
              <div
                onClick={() => setSelectedProject(project)}
                className="group relative bg-[#0B0B12] rounded-2xl border border-[#F4F1EC]/10 overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#E0432B]/40 hover:shadow-[0_0_35px_rgba(224,67,43,0.1)] flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#05050A]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-85" />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#05050A]/70 backdrop-blur-md border border-[#F4F1EC]/10 text-[#8A8A93]">
                      {project.year || "2026"}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B]">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white transition-colors duration-300 mt-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#8A8A93] font-normal mt-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#F4F1EC]/5">
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A93]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#E0432B]">
                      <span>View Project</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-mono">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0B12] border border-[#F4F1EC]/15 p-6 sm:p-10 text-[#F4F1EC] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-xs font-mono uppercase tracking-widest text-[#8A8A93] hover:text-white px-3 py-1.5 rounded-full border border-[#F4F1EC]/10 hover:border-white/30 transition-colors cursor-pointer"
            >
              Close ✕
            </button>

            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E0432B]">
              {selectedProject.category}
            </span>
            <h3 className="font-display text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#F4F1EC] mt-3 mb-6">
              {selectedProject.title}
            </h3>

            <div className="relative w-full h-[280px] sm:h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-base text-[#F4F1EC]/70 leading-relaxed font-normal mb-8">
              {selectedProject.summary}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
