import { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "web-development",
    number: "01",
    title: "Web Development",
    category: "Engineering & Architecture",
    description:
      "Custom, high-performance websites built with modern frameworks — fast, scalable, and made to convert.",
    icon: "code",
    deliverables: ["Next.js / React", "Performance Tuning", "Headless CMS Integration", "API Architecture"],
  },
  {
    slug: "app-development",
    number: "02",
    title: "App Development",
    category: "Cross-Platform Engineering",
    description:
      "Cross-platform mobile and web apps designed around real user needs, from concept to launch.",
    icon: "smartphone",
    deliverables: ["iOS & Android Apps", "React Native", "Web Applications", "User Flow Architecture"],
  },
  {
    slug: "e-commerce",
    number: "03",
    title: "E-commerce Solutions",
    category: "Digital Commerce",
    description:
      "Full-featured online stores with smooth checkout flows, product management, and growth-ready architecture.",
    icon: "shopping-cart",
    deliverables: ["Custom Storefronts", "Checkout Optimization", "Inventory Sync", "Payment Gateways"],
  },
  {
    slug: "ui-ux-design",
    number: "04",
    title: "UI/UX Design",
    category: "Interface & Experience",
    description:
      "Interfaces that look sharp and feel effortless — research-driven design across every screen size.",
    icon: "layout",
    deliverables: ["Interface Design", "User Research", "Design Systems", "Interactive Prototypes"],
  },
  {
    slug: "branding",
    number: "05",
    title: "Branding & Identity",
    category: "Visual Language",
    description:
      "Logos, visual systems, and brand guidelines that give a business a voice worth remembering.",
    icon: "sparkles",
    deliverables: ["Brand Identity", "Logo Systems", "Typography Guidelines", "Visual Strategy"],
  },
  {
    slug: "3d-interactive",
    number: "06",
    title: "3D & Interactive Experiences",
    category: "Creative Technology",
    description:
      "Immersive, animated 3D elements that turn a website into something people actually want to explore.",
    icon: "box",
    deliverables: ["WebGL / Three.js", "Interactive Animations", "3D Asset Modeling", "Custom Shaders"],
  },
];
