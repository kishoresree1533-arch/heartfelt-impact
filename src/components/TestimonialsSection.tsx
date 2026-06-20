import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote: "I never imagined that strangers could care this much about my son's life. They truly gave him a second chance.",
    name: "Manonmani",
    role: "Parent, Tirunelveli",
  },
  {
    quote: "The school built in our village changed everything. My daughter now dreams of becoming a doctor and serving our people.",
    name: "Muthuramalingam",
    role: "Farmer, Madurai",
  },
  {
    quote: "When the floods took everything, they were the first ones on the ground. Not with promises, but with real action.",
    name: "Arulmozhi",
    role: "Fisherman, Cuddalore",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Voices of Hope</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium md:text-5xl">
            From the People We Serve
          </h2>
        </ScrollReveal>

        <div className="mt-24 grid gap-16 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="group border-l border-gold/20 pl-10 transition-all duration-700 hover:border-gold">
                <span className="font-display text-5xl text-gold/10 transition-colors group-hover:text-gold/30">“</span>
                <p className="mt-1 font-display text-xl leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                  {t.quote}
                </p>
                <div className="mt-10">
                  <p className="font-display text-lg tracking-tight">{t.name}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">{t.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
