import { services } from "@/data/services";
import FadeIn from "@/components/animations/FadeIn";

export default function ServicesOverview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <FadeIn>
        <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">
          What We Do
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold max-w-xl">
          Services built around how modern businesses actually grow.
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {services.map((service, i) => (
          <FadeIn key={service.slug} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-white/10 bg-surface p-8 hover:border-primary/50 transition-colors">
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}