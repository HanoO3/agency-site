import FadeIn from "@/components/animations/FadeIn";

const stats = [
  { label: "Projects Delivered", value: "40+" },
  { label: "Years Combined Experience", value: "6+" },
  { label: "Happy Clients", value: "25+" },
];

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-40 pb-28">
      <FadeIn>
        <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
          About Us
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
          We're a small team that builds fast, thoughtful digital products.
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mt-8 text-foreground/60 max-w-xl leading-relaxed">
          We started this agency to work with businesses who care about
          craft — clean code, thoughtful design, and interfaces that feel
          alive. Whether it's a marketing site, a full e-commerce store, or
          an interactive product experience, we treat every project like
          it's going to be someone's favorite thing they've launched.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-surface p-8"
            >
              <p className="font-display text-4xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-foreground/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            How we work
          </h2>
          <p className="text-foreground/60 max-w-xl leading-relaxed">
            Every project starts with understanding what actually moves the
            needle for your business — not just what looks good. We keep
            communication tight, timelines realistic, and code clean enough
            that it's easy to hand off or build on later.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}