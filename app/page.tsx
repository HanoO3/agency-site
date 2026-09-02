import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Below-fold sections loaded lazily — reduces initial JS parse time
const Services = dynamic(() => import("@/components/sections/Services"));
const Work = dynamic(() => import("@/components/sections/Work"));
const About = dynamic(() => import("@/components/sections/About"));
const Team = dynamic(() => import("@/components/sections/Team"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <div className="relative bg-[#05050A] text-[#F5F5F7] min-h-screen selection:bg-[#E0432B] selection:text-white">
      {/* Hero Section with 3D canvas and Cartcode brand messaging */}
      <Hero />

      {/* Services Section with Cartcode 6 actual services */}
      <Services />

      {/* Work Section with Cartcode actual portfolio projects */}
      <Work />

      {/* About Section with Cartcode actual manifesto and stats */}
      <About />

      {/* Team Section with Cartcode multidisciplinary talent */}
      <Team />

      {/* Process Section with Cartcode 4-step workflow */}
      <Process />

      {/* Testimonials Section with Cartcode client endorsements */}
      <Testimonials />

      {/* Contact Section with Cartcode inquiry form */}
      <Contact />
    </div>
  );
}
