"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import ScrollReveal from "@/components/animations/ScrollReveal";

const CATEGORIES = ["ALL", "E-COMMERCE", "APP DEVELOPMENT", "WEB DEVELOPMENT"];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "ALL" || p.category.toUpperCase() === activeFilter
  );

  return (
    <section id="work" className="relative w-full bg-[#05050A] py-32 md:py-44 px-6 z-10">
      {/* Volumetric background ambient glow */}
      <div className="absolute left-[-10%] top-[30%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.06)_0%,rgba(5,5,10,0)_70%)] blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-3 font-mono font-medium">
                Portfolio
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
                  className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 ${
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

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <ScrollReveal
                key={project.slug}
                delay={idx * 0.1}
                y={40}
                className={`${isEven ? "md:translate-y-0" : "md:translate-y-12"}`}
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-[#08080E] rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-[#E0432B]/40 hover:shadow-[0_0_40px_rgba(224,67,43,0.22)]"
                >
                  {/* Image Container with Mixed Aspect Ratio */}
                  <div
                    className={`relative w-full overflow-hidden ${
                      project.aspectRatio === "16/9"
                        ? "aspect-[16/9]"
                        : project.aspectRatio === "4/5"
                        ? "aspect-[4/5]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.08] group-hover:brightness-100"
                    />

                    {/* Dark gradient overlay & Ember Glow Rim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080E] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Hover Top Right Tag */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-[#E0432B]/40">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E0432B]">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-white/40">
                          {project.client}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/50 font-light mt-3 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Footer Tags & Arrow */}
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

                      <div className="flex items-center gap-1 text-xs font-mono text-[#E0432B] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              className="absolute top-6 right-6 text-white/50 hover:text-white text-xl font-mono p-2"
            >
              ✕
            </button>

            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E0432B]">
              {selectedProject.category} — {selectedProject.year}
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
                className="rounded-full bg-[#E0432B] px-6 py-2.5 text-xs font-mono uppercase tracking-widest text-white hover:bg-[#FF7048] transition-colors"
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
