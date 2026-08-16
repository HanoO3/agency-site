import FadeIn from "@/components/animations/FadeIn";

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-40 pb-28">
      <FadeIn>
        <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">
          Contact
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
          Let's start a project.
        </h1>
        <p className="text-foreground/60 max-w-lg mb-12">
          Fill out the form below and we'll get back to you within a day or
          two.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* NOTE: form abhi non-functional hai — koi onSubmit ya backend nahi hai */}
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-foreground/70 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-foreground/70 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-foreground/70 mb-2">
              Project details
            </label>
            <textarea
              rows={5}
              placeholder="Tell us a bit about what you need..."
              className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              disabled
            />
          </div>

          <button
            type="button"
            disabled
            className="rounded-full bg-primary/50 px-8 py-3 text-sm font-medium cursor-not-allowed"
            title="Form submission abhi wired nahi hai"
          >
            Send Message (coming soon)
          </button>
        </form>
      </FadeIn>
    </section>
  );
}