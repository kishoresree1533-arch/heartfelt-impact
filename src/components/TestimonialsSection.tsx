import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote: "I never believed a stranger could care this much. They gave my son a second chance at life.",
    name: "Sunita Devi",
    role: "Mother of 3, Rajasthan",
  },
  {
    quote: "The school they built in our village changed everything. My daughters now dream of becoming doctors.",
    name: "Ramesh Kumar",
    role: "Farmer, Bihar",
  },
  {
    quote: "When the floods took everything, they were the first ones there. Not with promises — with action.",
    name: "Fatima Begum",
    role: "Flood Survivor, Assam",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Voices of Hope</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium md:text-5xl">
            What They Say
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="border-t border-gold/30 pt-8">
                <p className="font-display text-lg italic leading-relaxed text-muted-foreground">
                  "{t.quote}"
                </p>
                <div className="mt-6">
                  <p className="font-display text-base">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{t.role}</p>
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
