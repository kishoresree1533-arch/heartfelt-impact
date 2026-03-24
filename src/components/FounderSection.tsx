import ScrollReveal from "./ScrollReveal";

const FounderSection = () => {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">A Personal Note</p>
          <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
            From the Founder
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 space-y-6 text-left">
            <p className="font-display text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
              "When I first walked into that village, I saw something that changed me forever —
              a child drinking from a puddle because that was her only option.
            </p>
            <p className="font-display text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
              That moment became my mission. Not because I had the resources, but because
              I couldn't look away. And I believe neither can you."
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-12">
            <div className="h-px w-16 mx-auto bg-gold" />
            <p className="mt-6 font-display text-lg italic text-gold">With hope and gratitude,</p>
            <p className="mt-2 font-display text-2xl">Arjun Mehta</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Founder & Chairman
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FounderSection;
