import ScrollReveal from "./ScrollReveal";

const steps = [
  { number: "01", title: "You Donate",                  desc: "Choose a cause and contribute any amount." },
  { number: "02", title: "We Identify Real Needs",      desc: "Our ground team assesses where help is needed most." },
  { number: "03", title: "Support Reaches Communities", desc: "Resources delivered directly — no detours." },
  { number: "04", title: "Lives Are Improved",          desc: "Families nourished, children learn, hope restored." },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#0A0A0A] py-14 md:py-20 overflow-hidden border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-8">

        <ScrollReveal>
          {/* Compact inline header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-3">
                How It Works
              </p>
              <h2 className="font-display text-3xl font-medium text-white md:text-4xl leading-tight">
                Your Contribution <span className="italic text-gold">Journey</span>
              </h2>
            </div>
            {/* Connector rule */}
            <div className="hidden sm:block h-px flex-1 mx-10 bg-white/8 self-center" />
            <p className="text-sm font-light text-white/35 max-w-[220px] text-right hidden sm:block">
              From your heart to their hands — in 4 steps.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.12} direction="up" className="h-full">
              <div className="group relative flex flex-col h-full rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-7 hover:border-gold/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(204,153,51,0.08)] transition-all duration-500">

                {/* Number circle */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-white/5 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500 mb-6">
                  <span className="font-display text-sm font-medium text-gold">{step.number}</span>
                </div>

                {/* Title — fixed min-height so all align */}
                <h3 className="font-display text-base text-white mb-3 group-hover:text-gold transition-colors duration-400 leading-snug min-h-[2.8rem] flex items-start">
                  {step.title}
                </h3>

                {/* Desc */}
                <p className="text-xs font-light leading-relaxed text-white/35 flex-1">
                  {step.desc}
                </p>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold rounded-full transition-all duration-700 group-hover:w-full opacity-50" />

                {i < steps.length - 1 && (
                  <span className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/15 text-xs z-10">›</span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
