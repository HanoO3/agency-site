"use client";

import { useState } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", details: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#05050A] py-24 md:py-40 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Background Volumetric Center Ember Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.08)_0%,transparent_70%)] blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Section Tag & Strong Thin Headline */}
        <ScrollReveal y={30}>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-3 font-mono">
            Contact
          </p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#F4F1EC] leading-[0.95] mb-4">
            Let&apos;s start a project.
          </h2>
          <p className="text-[#8A8A93] text-base leading-relaxed font-normal max-w-xl mb-16">
            Fill out the form below and we&apos;ll get back to you within a day or two.
          </p>
        </ScrollReveal>

        {/* Minimal Underline-Style Form */}
        <ScrollReveal delay={0.12} y={30}>
          {submitted ? (
            <div className="p-10 md:p-12 rounded-2xl bg-[#0B0B12] border border-[#E0432B]/30 text-center shadow-[0_0_50px_rgba(224,67,43,0.15)]">
              <span className="text-3xl mb-3 inline-block">✨</span>
              <h3 className="font-display text-2xl md:text-3xl font-light uppercase text-[#F4F1EC] mb-2">
                Inquiry Sent
              </h3>
              <p className="text-[#8A8A93] font-normal max-w-md mx-auto leading-relaxed text-sm">
                Thank you for reaching out. We have received your message and will review your project details promptly.
              </p>
              <button
                onClick={() => {
                  setFormData({ name: "", email: "", details: "" });
                  setSubmitted(false);
                }}
                className="mt-6 text-xs font-mono uppercase tracking-[0.15em] text-[#E0432B] hover:text-[#F4F1EC] underline underline-offset-4 cursor-pointer transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* Name Field */}
                <div className="relative group">
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-2 group-focus-within:text-[#E0432B] transition-colors"
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-[#F4F1EC]/20 px-0 py-3 text-base text-[#F4F1EC] placeholder:text-[#8A8A93]/40 focus:outline-none focus:border-[#E0432B] transition-colors duration-300 rounded-none font-normal"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E0432B] group-focus-within:w-full transition-all duration-500 pointer-events-none shadow-[0_0_8px_#E0432B]" />
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-2 group-focus-within:text-[#E0432B] transition-colors"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[#F4F1EC]/20 px-0 py-3 text-base text-[#F4F1EC] placeholder:text-[#8A8A93]/40 focus:outline-none focus:border-[#E0432B] transition-colors duration-300 rounded-none font-normal"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E0432B] group-focus-within:w-full transition-all duration-500 pointer-events-none shadow-[0_0_8px_#E0432B]" />
                </div>
              </div>

              {/* Message Details */}
              <div className="relative group pt-2">
                <label
                  htmlFor="details"
                  className="block text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-2 group-focus-within:text-[#E0432B] transition-colors"
                >
                  Project Details *
                </label>
                <textarea
                  id="details"
                  rows={4}
                  required
                  placeholder="Scope, objectives, and rough timeline..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F4F1EC]/20 px-0 py-3 text-base text-[#F4F1EC] placeholder:text-[#8A8A93]/40 focus:outline-none focus:border-[#E0432B] transition-colors duration-300 resize-none rounded-none font-normal"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E0432B] group-focus-within:w-full transition-all duration-500 pointer-events-none shadow-[0_0_8px_#E0432B]" />
              </div>

              {/* Prominent Primary Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#E0432B] px-9 py-4 text-xs font-mono uppercase tracking-[0.2em] text-[#05050A] font-semibold transition-all duration-300 hover:bg-[#FF7048] hover:shadow-[0_0_30px_rgba(224,67,43,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  <span>Send Inquiry</span>
                  <span className="ml-2.5 font-mono text-sm">→</span>
                </button>
              </div>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
