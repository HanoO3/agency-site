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
      className="relative w-full bg-[#05050A] py-32 md:py-44 px-6 z-10 overflow-hidden"
    >
      {/* Background Volumetric Center Ember Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(224,67,43,0.12)_0%,rgba(122,31,23,0.05)_45%,rgba(5,5,10,0)_75%)] blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Section Tag & Headline */}
        <ScrollReveal y={30}>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E0432B] mb-4 font-mono font-medium">
            Contact
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#F5F5F7] leading-[0.95] mb-6">
            Let&apos;s start a project.
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl mb-16">
            Fill out the form below and we&apos;ll get back to you within a day or two.
          </p>
        </ScrollReveal>

        {/* Minimal Dark Form */}
        <ScrollReveal delay={0.12} y={30}>
          {submitted ? (
            <div className="p-12 md:p-16 rounded-2xl bg-[#08080E] border border-[#E0432B]/45 text-center shadow-[0_0_60px_rgba(224,67,43,0.25)]">
              <span className="text-4xl mb-4 inline-block animate-pulse">✨</span>
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-3">
                Inquiry Sent
              </h3>
              <p className="text-white/60 font-light max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to Cartcode. We have received your message and will review your project details promptly.
              </p>
              <button
                onClick={() => {
                  setFormData({ name: "", email: "", details: "" });
                  setSubmitted(false);
                }}
                className="mt-8 text-xs font-mono uppercase tracking-widest text-[#E0432B] hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Name Field */}
                <div className="relative group">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3 group-focus-within:text-[#E0432B] transition-colors"
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
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#E0432B] transition-colors duration-300 rounded-none font-light"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E0432B] group-focus-within:w-full transition-all duration-500 pointer-events-none shadow-[0_0_10px_#E0432B]" />
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3 group-focus-within:text-[#E0432B] transition-colors"
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
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#E0432B] transition-colors duration-300 rounded-none font-light"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E0432B] group-focus-within:w-full transition-all duration-500 pointer-events-none shadow-[0_0_10px_#E0432B]" />
                </div>
              </div>

              {/* Message Details */}
              <div className="relative group pt-4">
                <label
                  htmlFor="details"
                  className="block text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3 group-focus-within:text-[#E0432B] transition-colors"
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
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#E0432B] transition-colors duration-300 resize-none rounded-none font-light"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E0432B] group-focus-within:w-full transition-all duration-500 pointer-events-none shadow-[0_0_10px_#E0432B]" />
              </div>

              {/* Large CTA Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-4 rounded-full bg-[#E0432B] px-10 py-5 text-xs font-mono uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#FF7048] hover:shadow-[0_0_40px_rgba(224,67,43,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Send Inquiry</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 font-mono text-sm">
                    →
                  </span>
                </button>
              </div>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
