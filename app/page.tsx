import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

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

      {/* Process Section with Cartcode 4-step workflow */}
      <Process />

      {/* Testimonials Section with Cartcode client endorsements */}
      <Testimonials />

      {/* Contact Section with Cartcode inquiry form */}
      <Contact />
    </div>
  );
}