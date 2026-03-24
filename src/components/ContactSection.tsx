import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-warm-alt py-28 md:py-40">
      <div className="mx-auto max-w-2xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Get in Touch</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium md:text-5xl">
            We'd Love to Hear From You
          </h2>
          <p className="mt-6 text-center font-light text-muted-foreground">
            Have questions, ideas, or want to volunteer? Reach out.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {submitted ? (
            <div className="mt-16 text-center">
              <p className="font-display text-2xl text-gold">Thank you ♡</p>
              <p className="mt-2 text-muted-foreground">We'll be in touch soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="mt-16 space-y-6"
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full border-b border-border bg-transparent py-4 text-sm font-light outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full border-b border-border bg-transparent py-4 text-sm font-light outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                className="w-full resize-none border-b border-border bg-transparent py-4 text-sm font-light outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold"
              />
              <div className="pt-4">
                <button
                  type="submit"
                  className="border border-primary bg-primary px-12 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 hover:bg-transparent hover:text-primary"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
