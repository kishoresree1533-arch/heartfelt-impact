import { useState } from "react";
import { Send, MapPin, Mail, Phone, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const contactInfo = [
  { icon: MapPin, label: "Mission Hub", value: "Chennai, Tamil Nadu, India" },
  { icon: Mail,   label: "Email Us",    value: "contact@iraithuligal.org" },
  { icon: Phone,  label: "Call Us",     value: "+91 98765 43210" },
];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0E1117] mt-0">

      {/* ── Decorative background glows ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      </div>

      {/* ── Top accent line ── */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* ── Premium stats ticker strip ── */}
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-2 md:justify-between">
            {[
              { value: "500+",  label: "Meals Served" },
              { value: "1,200+", label: "Lives Touched" },
              { value: "300+",  label: "Trees Planted" },
              { value: "5+",    label: "Years of Service" },
              { value: "50+",   label: "Volunteers" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="font-display text-xl font-medium text-gold">{s.value}</span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-white/25">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-12 md:py-20">

        {/* ── Section label ── */}
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.5em] text-gold backdrop-blur-sm">
              <Heart className="h-3 w-3 fill-gold text-gold" />
              Connect With Us
            </span>
          </div>
        </ScrollReveal>

        {/* ── Main grid ── */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">

          {/* ─── LEFT: Narrative ─── */}
          <ScrollReveal direction="left">
            <div className="flex flex-col">
              <h2 className="font-display text-5xl font-medium tracking-tighter md:text-7xl text-white leading-[0.95]">
                Be the <br />
                <span className="italic text-gold">Change.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-white/50">
                Whether you want to volunteer, partner with us, or simply know more about our mission — we would love to hear from you. Every conversation plants a seed of hope.
              </p>

              {/* Contact info cards */}
              <div className="mt-14 space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-center gap-5 rounded-sm border border-white/5 bg-white/[0.03] px-6 py-5 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:bg-gold/5 hover:translate-x-1"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/10">
                      <item.icon className="h-4 w-4 text-white/40 transition-colors duration-500 group-hover:text-gold" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-white/25 mb-0.5">{item.label}</p>
                      <p className="text-sm font-light text-white/70 group-hover:text-white transition-colors duration-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider quote */}
              <div className="mt-16 border-l-2 border-gold/30 pl-6">
                <p className="font-display text-xl italic text-white/40 leading-relaxed">
                  "Alone we can do so little; together we can do so much."
                </p>
                <p className="mt-3 text-[9px] uppercase tracking-[0.4em] text-gold/50 font-bold">— Foundation Belief</p>
              </div>
            </div>
          </ScrollReveal>

          {/* ─── RIGHT: Form ─── */}
          <ScrollReveal direction="right">
            <div className="relative">
              {/* Glow behind form */}
              <div className="absolute -inset-6 bg-gold/5 blur-[80px] rounded-xl pointer-events-none" />

              <div className="relative rounded-sm border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 md:p-14 shadow-[0_40px_120px_rgba(0,0,0,0.4)]">

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-700">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                      <Heart className="h-8 w-8 fill-gold text-gold" />
                    </div>
                    <h3 className="font-display text-3xl text-white tracking-tight">Message Received</h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-white/50 max-w-xs">
                      Thank you for reaching out. Our team will respond to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-10 text-[10px] uppercase tracking-[0.4em] text-gold font-bold hover:text-white transition-colors"
                    >
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                    className="space-y-8"
                  >
                    <div className="mb-2">
                      <h3 className="font-display text-2xl text-white tracking-tight">Send a Message</h3>
                      <p className="mt-1 text-xs font-light text-white/30">We read every message personally.</p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid gap-6 md:grid-cols-2">
                      {[
                        { type: "text",  placeholder: "Your Name",      required: true },
                        { type: "email", placeholder: "Email Address",  required: true },
                      ].map((field) => (
                        <div key={field.placeholder} className="group relative">
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="peer w-full rounded-sm border border-white/10 bg-white/5 px-5 py-4 text-sm font-light text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-gold/50 focus:bg-white/[0.07]"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Phone Number (optional)"
                        className="w-full rounded-sm border border-white/10 bg-white/5 px-5 py-4 text-sm font-light text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-gold/50 focus:bg-white/[0.07]"
                      />
                    </div>

                    {/* Subject */}
                    <div className="relative">
                      <select
                        className="w-full rounded-sm border border-white/10 bg-white/5 px-5 py-4 text-sm font-light text-white/60 outline-none transition-all duration-500 focus:border-gold/50 focus:bg-white/[0.07] appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#0E1117]">I want to… (select)</option>
                        <option value="volunteer" className="bg-[#0E1117]">Volunteer with the team</option>
                        <option value="donate"    className="bg-[#0E1117]">Make a donation</option>
                        <option value="partner"   className="bg-[#0E1117]">Partner / Collaborate</option>
                        <option value="info"      className="bg-[#0E1117]">Learn more about missions</option>
                        <option value="other"     className="bg-[#0E1117]">Other</option>
                      </select>
                      <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/30 text-xs">▼</div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        placeholder="Your message…"
                        rows={4}
                        required
                        className="peer w-full resize-none rounded-sm border border-white/10 bg-white/5 px-5 py-4 text-sm font-light text-white placeholder:text-white/25 outline-none transition-all duration-500 focus:border-gold/50 focus:bg-white/[0.07]"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-sm bg-gold px-10 py-5 text-[11px] font-bold uppercase tracking-[0.5em] text-[#0E1117] transition-all duration-700 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:scale-[1.01]"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Send Message
                        <Send className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-0" />
                    </button>

                    <p className="text-center text-[9px] font-bold uppercase tracking-[0.4em] text-white/15">
                      Privacy Guaranteed · No Spam · Ever
                    </p>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
};

export default ContactSection;
