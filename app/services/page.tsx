import { services } from "@/data/services";
import FadeIn from "@/components/animations/FadeIn";

export default function ServicesPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-40 pb-28">
      <FadeIn>
        <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
          Our Services
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
          Everything you need to launch and grow, in one place.
        </h1>
        <p className="mt-6 text-foreground/60 max-w-xl">
          From first line of code to a fully launched product — here's what
          we help businesses build.
        </p>
      </FadeIn>

      <div className="mt-20 space-y-6">
        {services.map((service, i) => (
          <FadeIn key={service.slug} delay={i * 0.05}>
            <div className="rounded-2xl border border-white/10 bg-surface p-8 md:p-10 hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold">
                    {service.title}
                  </h2>
                </div>
              </div>
              <p className="text-foreground/60 leading-relaxed mt-4 max-w-2xl">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}