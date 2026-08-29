"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import { gsap } from "@/lib/gsap";
import ScrollReveal from "@/components/animations/ScrollReveal";

const CATEGORIES = ["ALL", "SELECTED WORK", "WORDPRESS / CLIENT"];


export default function Work() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter((p) => p.tier === "selected");
  const wordpressProjects = projects.filter((p) => p.tier === "wordpress");

  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : activeFilter === "SELECTED WORK"
      ? featuredProjects
      : wordpressProjects;

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
      className="relative w-full bg-[#05050A] py-24 md:py-36 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Background Volumetric Ambient Glow */}
      <div className="absolute left-[-10%] top-[25%] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.06)_0%,transparent_70%)] blur-[160px] pointer-events-none -z-10" />

      {/* Main Section Header */}
      <div className="max-w-[1400px] mx-auto mb-14">
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#F4F1EC]/10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-3 font-mono">
                Portfolio &amp; Case Studies
              </p>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#F4F1EC]">
                Selected Work
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

      {/* SECTION 1: SELECTED WORK (Featured Flagship Showcase) */}
      <div className={activeFilter === "ALL" ? "block" : "hidden"}>
        {/* Desktop Pinned Horizontal Showcase for 4 Featured Projects */}
        <div ref={triggerRef} className="hidden lg:block relative w-full overflow-hidden">
          <div
            ref={horizontalTrackRef}
            className="flex gap-8 pl-4 pr-16 w-max items-center py-6"
          >
            {featuredProjects.map((project, idx) => {
              const projectNumber = `0${idx + 1}`;

              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group relative w-[540px] xl:w-[580px] h-[450px] flex-shrink-0 bg-[#0B0B12] rounded-2xl border border-[#F4F1EC]/10 overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#E0432B]/40 hover:shadow-[0_0_35px_rgba(224,67,43,0.1)] flex flex-col justify-between block"
                >
                  {/* Top Bar */}
                  <div className="p-6 pb-2 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-medium text-[#8A8A93]">
                        {projectNumber}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B]">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#8A8A93] border border-[#F4F1EC]/10 px-3 py-0.5 rounded-full bg-[#05050A]/60">
                      {project.year || "2026"}
                    </span>
                  </div>

                  {/* Project Image Showcase */}
                  <div className="relative mx-6 h-[220px] rounded-xl overflow-hidden bg-[#05050A] border border-[#F4F1EC]/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1280px) 540px, 580px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Bottom Info & CTA */}
                  <div className="p-6 pt-2 z-10 flex items-end justify-between gap-4">
                    <div className="max-w-[340px]">
                      <h3 className="font-display text-xl xl:text-2xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#8A8A93] font-normal mt-1.5 line-clamp-2 leading-relaxed">
                        {project.shortDescription || project.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B] flex-shrink-0 transition-all duration-300 group-hover:text-white group/btn py-1">
                      <span>View Project</span>
                      <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1 font-mono">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>


        {/* Mobile / Tablet Featured Showcase */}
        <div className="block lg:hidden max-w-[1400px] mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.slug} delay={idx * 0.08} y={30} className="h-full">
                <Link
                  href={`/work/${project.slug}`}
                  className="group relative h-full bg-[#0B0B12] rounded-2xl border border-[#F4F1EC]/10 overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#E0432B]/40 hover:shadow-[0_0_35px_rgba(224,67,43,0.1)] flex flex-col justify-between block"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#05050A]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#05050A]/70 backdrop-blur-md border border-[#F4F1EC]/10 text-[#8A8A93]">
                        {project.year || "2026"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B]">
                        {project.category}
                      </span>
                      <h3 className="font-display text-2xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white transition-colors duration-300 mt-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#8A8A93] font-normal mt-2 leading-relaxed">
                        {project.shortDescription || project.summary}
                      </p>
                    </div>

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

                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#E0432B] group-hover:text-white transition-colors">
                        <span>View Project</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-mono">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 2: WORDPRESS / CLIENT WORK (Secondary Collection) */}
        <div className="max-w-[1400px] mx-auto mt-20 md:mt-28">
          <ScrollReveal y={30}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#F4F1EC]/10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2 font-mono">
                  Broader Studio Experience
                </p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight text-[#F4F1EC]">
                  WordPress / Client Work
                </h3>
              </div>
              <p className="text-xs font-mono text-[#8A8A93] max-w-md">
                Structured digital solutions, institutional portals, and business platforms.
              </p>
            </div>
          </ScrollReveal>

          {/* 3-Column Grid for WordPress / Client Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {wordpressProjects.map((project, idx) => {
              const projectNum = `0${idx + 5}`;
              return (
                <ScrollReveal key={project.slug} delay={idx * 0.06} y={30} className="h-full">
                  <Link
                    href={`/work/${project.slug}`}
                    className="group relative h-full bg-[#0B0B12] rounded-xl border border-[#F4F1EC]/10 overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#E0432B]/40 hover:shadow-[0_0_30px_rgba(224,67,43,0.08)] flex flex-col justify-between block"
                  >
                    {/* Card Thumbnail */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#05050A]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9] group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="font-mono text-xs font-medium text-[#8A8A93] px-2.5 py-1 rounded bg-[#05050A]/70 backdrop-blur-md border border-[#F4F1EC]/10">
                          {projectNum}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 z-10">
                        <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#05050A]/70 backdrop-blur-md border border-[#F4F1EC]/10 text-[#8A8A93]">
                          {project.year || "2025"}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#E0432B]">
                          {project.category}
                        </span>
                        <h4 className="font-display text-xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white transition-colors duration-300 mt-1.5">
                          {project.title}
                        </h4>
                        <p className="text-xs text-[#8A8A93] font-normal mt-2 leading-relaxed line-clamp-3">
                          {project.shortDescription || project.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#F4F1EC]/5">
                        <div className="flex flex-wrap gap-1.5">
                          {(project.tags || []).slice(0, 2).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] font-mono uppercase tracking-wider text-[#8A8A93]/80 bg-[#F4F1EC]/5 px-2 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-[#E0432B] group-hover:text-white transition-colors flex-shrink-0">
                          <span>View Project</span>
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-mono">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filtered Grid View */}
      <div className={activeFilter !== "ALL" ? "block max-w-[1400px] mx-auto" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.slug} delay={idx * 0.06} y={30} className="h-full">
              <Link
                href={`/work/${project.slug}`}
                className="group relative h-full bg-[#0B0B12] rounded-2xl border border-[#F4F1EC]/10 overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#E0432B]/40 hover:shadow-[0_0_35px_rgba(224,67,43,0.1)] flex flex-col justify-between block"
              >

                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#05050A]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#05050A]/70 backdrop-blur-md border border-[#F4F1EC]/10 text-[#8A8A93]">
                      {project.year || "2026"}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B]">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white transition-colors duration-300 mt-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#8A8A93] font-normal mt-2 leading-relaxed">
                      {project.shortDescription || project.summary}
                    </p>
                  </div>

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

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#E0432B] group-hover:text-white transition-colors">
                      <span>View Project</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-mono">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
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

            <div className="relative w-full h-[280px] sm:h-[420px] rounded-xl overflow-hidden mb-8 border border-[#F4F1EC]/10">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover object-top"
              />
            </div>

            <p className="text-base text-[#F4F1EC]/80 leading-relaxed font-normal mb-8">
              {selectedProject.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#F4F1EC]/10">
              <div className="flex flex-wrap gap-2">
                {(selectedProject.tags || []).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono text-[#8A8A93] bg-[#F4F1EC]/5 px-3 py-1 rounded-full border border-[#F4F1EC]/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E0432B] text-white text-xs font-mono uppercase tracking-[0.15em] font-medium hover:bg-[#c93822] transition-colors shadow-[0_0_20px_rgba(224,67,43,0.3)]"
              >
                <span>Visit Live Website</span>
                <span className="font-mono">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
