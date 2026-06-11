import { useState } from "react";
import { Send, MapPin, Mail, Phone, Heart, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const contactInfo = [
  {
    icon: MapPin,
    label: "Mission Hub",
    value: "Tamil Nadu, India",
    sub: "Serving communities across the state",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-gold",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "contact@iraithuligal.org",
    sub: "We reply within 24 hours",
    bg: "bg-sky-50",
    border: "border-sky-200",
    iconColor: "text-sky-500",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 9 AM to 6 PM",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 9 AM – 6 PM",
    sub: "Sundays: Community service",
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconColor: "text-rose-500",
  },
];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-white py-16 md:py-24 overflow-hidden">

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-amber-50/70 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-sky-50/50 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8">

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full border border-gold/30 bg-amber-50 text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
              <Heart className="h-3 w-3 fill-gold" />
              Connect With Us
            </div>
            <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-tight">
              Be the <span className="italic text-gold">Change.</span>
            </h2>
            <div className="mx-auto mt-5 h-px w-14 bg-gold/40" />
            <p className="mt-5 text-base font-light text-muted-foreground max-w-lg mx-auto">
              Whether you want to volunteer, partner with us, or simply know more —
              every conversation plants a seed of hope.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Contact info cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {contactInfo.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.1} direction="up">
              <div className={`group flex flex-col gap-3 rounded-2xl border ${item.border} ${item.bg} p-5 hover:shadow-lg transition-all duration-500 hover:-translate-y-1`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white border ${item.border} shadow-sm group-hover:scale-110 transition-transform duration-400`}>
                  <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-primary leading-snug">{item.value}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5">{item.sub}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Main grid: quote + form ── */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">

          {/* LEFT — quote + map placeholder */}
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-8">

              {/* Quote card */}
              <div className="rounded-2xl border border-border bg-[#faf8f5] p-8 shadow-sm">
                <span className="font-display text-6xl text-gold/15 leading-none block -mb-4">"</span>
                <p className="font-display text-xl italic text-primary/70 leading-relaxed">
                  Alone we can do so little; together we can do so much.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-10 bg-gold/40" />
                  <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold">Foundation Belief</p>
                </div>
              </div>

              {/* Stats strip */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50 font-bold mb-5">Our Reach</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "500+",  label: "Meals" },
                    { value: "1,200+",label: "Lives" },
                    { value: "50+",   label: "Volunteers" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-display text-2xl font-medium text-gold">{s.value}</p>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social / CTA */}
              <div className="rounded-2xl border border-gold/20 bg-amber-50/60 p-6">
                <p className="text-sm font-light text-muted-foreground mb-4">
                  Want to make an immediate difference?
                </p>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-primary text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all duration-400"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Donate Now
                </a>
              </div>

            </div>
          </ScrollReveal>

          {/* RIGHT — Form */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl border border-border bg-[#faf8f5] shadow-lg overflow-hidden">

              {/* Form header */}
              <div className="px-8 py-6 border-b border-border bg-white flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
                  <Send className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-primary">Send a Message</h3>
                  <p className="text-[10px] text-muted-foreground/60">We read every message personally.</p>
                </div>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                    <Heart className="h-7 w-7 fill-gold text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-primary mb-3">Message Received</h3>
                  <p className="text-sm font-light text-muted-foreground max-w-xs">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold font-bold hover:text-primary transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="p-8 space-y-5"
                >
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                    />
                  </div>

                  {/* Phone */}
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                  />

                  {/* Subject */}
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-foreground/70 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>I want to… (select)</option>
                      <option value="volunteer">Volunteer with the team</option>
                      <option value="donate">Make a donation</option>
                      <option value="partner">Partner / Collaborate</option>
                      <option value="info">Learn more about missions</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-xs">▼</div>
                  </div>

                  {/* Message */}
                  <textarea
                    placeholder="Your message…"
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-xl bg-gold px-8 py-4 text-[11px] font-bold uppercase tracking-[0.5em] text-primary transition-all duration-500 hover:shadow-[0_8px_30px_rgba(204,153,51,0.3)] hover:scale-[1.01]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Send Message
                      <Send className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
                    <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-[11px] uppercase tracking-[0.5em]">
                      Send Message <Send className="h-3.5 w-3.5" />
                    </span>
                  </button>

                  <p className="text-center text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold">
                    Privacy Guaranteed · No Spam · Ever
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
