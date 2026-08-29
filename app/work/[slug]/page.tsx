import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — CARTCODE",
      description: "The requested project case study could not be found.",
    };
  }

  const description =
    project.shortDescription ||
    project.summary ||
    project.description?.slice(0, 160) ||
    "Digital project case study by Cartcode.";

  return {
    title: `${project.title} — Case Study | CARTCODE`,
    description,
    openGraph: {
      title: `${project.title} — CARTCODE Portfolio`,
      description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);
  const projectNumber = `0${projects.findIndex((p) => p.slug === project.slug) + 1}`;
  const displayTags = project.technologies || project.tags || [];
  const displayServices = project.services || ["Web Development", "UI/UX Design"];

  return (
    <article className="relative min-h-screen bg-[#05050A] text-[#F4F1EC] pt-28 md:pt-36 pb-24 md:pb-40 px-6 md:px-12 overflow-hidden z-10">
      {/* Background Volumetric Ember Atmosphere */}
      <div className="absolute right-[-15%] top-1/4 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.07)_0%,transparent_70%)] blur-[160px] pointer-events-none -z-10" />
      <div className="absolute left-[-10%] bottom-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.05)_0%,transparent_70%)] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1300px] mx-auto">
        {/* Back Navigation Bar */}
        <ScrollReveal y={20}>
          <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#F4F1EC]/10">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] hover:text-[#E0432B] transition-colors"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              <span>Back to Projects</span>
            </Link>

            <span className="text-xs font-mono text-[#8A8A93] tracking-widest">
              PROJECT {projectNumber} / 0{projects.length}
            </span>
          </div>
        </ScrollReveal>

        {/* Project Header: Category & Large Editorial Title */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <ScrollReveal delay={0.05} y={25}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E0432B]" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#E0432B]">
                {project.category}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} y={30}>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight text-[#F4F1EC] leading-[0.95] mb-6">
              {project.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} y={30}>
            <p className="text-base sm:text-xl text-[#8A8A93] font-normal leading-relaxed max-w-2xl">
              {project.shortDescription || project.summary}
            </p>
          </ScrollReveal>
        </div>

        {/* Project Metadata Grid & Action */}
        <ScrollReveal delay={0.2} y={30}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-[#0B0B12] border border-[#F4F1EC]/10 mb-12 items-center">
            <div>
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-1">
                Client / Org
              </p>
              <p className="text-sm sm:text-base font-medium text-[#F4F1EC]">
                {project.client || project.title}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-1">
                Year
              </p>
              <p className="text-sm sm:text-base font-medium text-[#F4F1EC]">
                {project.year || "2025"}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-1">
                Category
              </p>
              <p className="text-sm sm:text-base font-medium text-[#F4F1EC] truncate">
                {project.category}
              </p>
            </div>

            <div className="flex justify-start sm:justify-end">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E0432B] text-white text-xs font-mono uppercase tracking-[0.15em] font-medium hover:bg-[#c93822] transition-colors shadow-[0_0_20px_rgba(224,67,43,0.25)] flex-shrink-0"
              >
                <span>Visit Website</span>
                <span className="font-mono">↗</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Large Hero Website Preview Showcase */}
        <ScrollReveal delay={0.25} y={35}>
          <div className="group relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[700px] rounded-2xl overflow-hidden bg-[#0B0B12] border border-[#F4F1EC]/15 mb-16 shadow-2xl">
            <Image
              src={project.image}
              alt={`${project.title} Homepage Showcase`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1300px"
              className="object-cover object-top filter brightness-[0.95] group-hover:brightness-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 right-6 z-10">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05050A]/80 backdrop-blur-md border border-[#F4F1EC]/20 text-xs font-mono uppercase tracking-widest text-[#F4F1EC] hover:border-[#E0432B] hover:text-[#E0432B] transition-colors"
              >
                <span>View Live Site</span>
                <span className="font-mono">↗</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* In-depth Overview Section & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 pb-16 border-t border-[#F4F1EC]/10">
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.1} y={30}>
              <p className="text-xs uppercase tracking-[0.2em] text-[#E0432B] mb-2 font-mono">
                Project Overview
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-[#F4F1EC]">
                Strategy & Execution
              </h2>
            </ScrollReveal>

            {/* Scope / Services Delivered */}
            <ScrollReveal delay={0.15} y={30}>
              <div className="mt-8 pt-6 border-t border-[#F4F1EC]/10">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#8A8A93] mb-3">
                  Scope of Work
                </p>
                <ul className="space-y-2">
                  {displayServices.map((service, sIdx) => (
                    <li
                      key={sIdx}
                      className="text-sm font-sans text-[#F4F1EC]/90 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E0432B]" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Technologies Applied */}
            <ScrollReveal delay={0.2} y={30}>
              <div className="mt-8 pt-6 border-t border-[#F4F1EC]/10">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#8A8A93] mb-3">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {displayTags.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono text-[#8A8A93] bg-[#0B0B12] px-3 py-1 rounded-full border border-[#F4F1EC]/10"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8">
            <ScrollReveal delay={0.15} y={30}>
              <div className="prose prose-invert max-w-none">
                <p className="text-base sm:text-lg text-[#F4F1EC]/90 font-normal leading-relaxed mb-6">
                  {project.description || project.summary}
                </p>
                <p className="text-sm sm:text-base text-[#8A8A93] leading-relaxed mb-8">
                  From architecture through deployment, the system was calibrated for high-speed performance, clean interaction responsiveness, and seamless brand consistency. Every component was developed with scalability and accessibility as top priorities.
                </p>
              </div>

              {/* Live Website Direct Banner */}
              <div className="p-8 rounded-2xl bg-[#0B0B12] border border-[#F4F1EC]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8">
                <div>
                  <h3 className="font-display text-xl uppercase font-light text-[#F4F1EC]">
                    Experience the Live Platform
                  </h3>
                  <p className="text-xs text-[#8A8A93] font-mono mt-1">
                    Direct access to the production website ({project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")})
                  </p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E0432B] text-white text-xs font-mono uppercase tracking-[0.15em] font-medium hover:bg-[#c93822] transition-colors shadow-[0_0_25px_rgba(224,67,43,0.3)] flex-shrink-0"
                >
                  <span>Launch Website</span>
                  <span className="font-mono">↗</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Optional Gallery Showcase if present */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="pt-12 mb-16 border-t border-[#F4F1EC]/10">
            <ScrollReveal y={30}>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-4 font-mono">
                Visual Gallery
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img, gIdx) => (
                  <div
                    key={gIdx}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0B0B12] border border-[#F4F1EC]/10"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} Gallery visual ${gIdx + 1}`}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* Next / Previous Project Navigation */}
        <div className="mt-16 pt-12 border-t border-[#F4F1EC]/10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-6">
            Continue Exploring
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Project Card */}
            <Link
              href={`/work/${prev.slug}`}
              className="group p-6 sm:p-8 rounded-2xl bg-[#0B0B12] border border-[#F4F1EC]/10 hover:border-[#E0432B]/40 transition-all duration-400 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8A8A93] group-hover:text-[#E0432B] transition-colors">
                  ← Previous Project
                </span>
                <h4 className="font-display text-2xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white mt-2">
                  {prev.title}
                </h4>
              </div>
              <p className="text-xs font-mono text-[#8A8A93] mt-4">
                {prev.category}
              </p>
            </Link>

            {/* Next Project Card */}
            <Link
              href={`/work/${next.slug}`}
              className="group p-6 sm:p-8 rounded-2xl bg-[#0B0B12] border border-[#F4F1EC]/10 hover:border-[#E0432B]/40 transition-all duration-400 flex flex-col justify-between text-right"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8A8A93] group-hover:text-[#E0432B] transition-colors">
                  Next Project →
                </span>
                <h4 className="font-display text-2xl font-light uppercase tracking-tight text-[#F4F1EC] group-hover:text-white mt-2">
                  {next.title}
                </h4>
              </div>
              <p className="text-xs font-mono text-[#8A8A93] mt-4">
                {next.category}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
