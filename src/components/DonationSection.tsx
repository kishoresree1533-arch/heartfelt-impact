import { Shield, Eye, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const DonationSection = () => {
  return (
    <section id="donate" className="bg-dark-section py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Make a Difference</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium text-primary-foreground md:text-5xl">
            Right Now, You Can Change<br />
            <span className="italic text-gold-light">Someone's Future</span>
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {/* Bank Details Card */}
          <ScrollReveal delay={0.1} direction="left">
            <div className="border border-primary-foreground/10 p-10">
              <h3 className="font-display text-2xl text-primary-foreground">Bank Transfer</h3>
              <div className="mt-8 space-y-5">
                {[
                  ["Account Name", "Hope Foundation Trust"],
                  ["Account Number", "1234 5678 9012 3456"],
                  ["IFSC Code", "HDFC0001234"],
                  ["Bank Name", "HDFC Bank"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40">{label}</p>
                    <p className="mt-1 font-display text-lg text-primary-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* UPI QR Card */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="border border-primary-foreground/10 p-10 text-center">
              <h3 className="font-display text-2xl text-primary-foreground">UPI Payment</h3>
              <div className="mt-8 mx-auto flex h-56 w-56 items-center justify-center bg-primary-foreground rounded-sm">
                <div className="text-center p-4">
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={`h-3 w-3 ${Math.random() > 0.35 ? 'bg-primary' : 'bg-transparent'}`} />
                    ))}
                  </div>
                  <p className="mt-3 text-xs font-body text-primary">Scan to Pay</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/60">
                hopefoundation@upi
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Trust Signals */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {[
              { icon: Eye, text: "100% Transparency" },
              { icon: Shield, text: "Secure Donations" },
              { icon: Heart, text: "Direct Impact" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-gold" />
                <span className="text-sm tracking-wide text-primary-foreground/70">{text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <a
              href="#donate"
              className="inline-block animate-pulse-glow rounded-none border-2 border-gold bg-gold px-14 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-500 hover:bg-transparent hover:text-gold"
            >
              Donate & Save a Life Today
            </a>
            <p className="mt-5 text-sm font-light text-primary-foreground/50">
              Even ₹100 can make a difference.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DonationSection;
