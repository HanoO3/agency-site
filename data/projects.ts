import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "nova-store",
    title: "Nova Store",
    client: "Nova Retail",
    category: "E-commerce",
    summary: "A modern fashion storefront with a 12% lift in checkout completion.",
    image: "/images/noirfold_fashion.jpg",
    year: "2026",
    aspectRatio: "4/5",
    tags: ["E-commerce", "Next.js", "UX Design"],
  },
  {
    slug: "orbit-app",
    title: "Orbit",
    client: "Orbit Mobility",
    category: "App Development",
    summary: "A cross-platform booking app built for a growing logistics startup.",
    image: "/images/noirfold_digital.jpg",
    year: "2025",
    aspectRatio: "4/3",
    tags: ["React Native", "App Development", "UI System"],
  },
  {
    slug: "lumen-saas",
    title: "Lumen",
    client: "Lumen Analytics",
    category: "Web Development",
    summary: "A marketing site + dashboard for a B2B SaaS analytics product.",
    image: "/images/noirfold_arch.jpg",
    year: "2025",
    aspectRatio: "16/9",
    tags: ["Web Development", "SaaS Dashboard", "Interactive"],
  },
];