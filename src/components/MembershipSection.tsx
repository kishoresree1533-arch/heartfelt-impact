import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Droplets, Leaf, Users, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "1,247", label: "Active Volunteers" },
  { value: "5+",    label: "Years of Service" },
  { value: "10K+",  label: "Lives Touched" },
];

const pillars = [
  { icon: Heart,    label: "Humanitarian Aid" },
  { icon: Droplets, label: "Blood Donation" },
  { icon: Leaf,     label: "Tree Plantation" },
  { icon: Users,    label: "Community Drives" },
  { icon: Star,     label: "Volunteer Certificate" },
];

const MembershipSection = () => {
  return (
    <section className="relative bg-[#faf8f5] py-20 md:py-28 overflow-hidden">

      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-100/50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8">

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-5">
                Volunteer Membership
              </p>
              <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-[1.05]">
                Become Part of<br />
                <span className="italic text-gold">Something Greater</span>
              </h2>
            </div>
            <div className="lg:pl-10 lg:border-l border-border">
              <p className="text-base font-normal leading-relaxed text-muted-foreground max-w-md">
                Iraithuligal Iyakkam is built by ordinary people doing
                extraordinary things. Join our growing family of volunteers
                across Tamil Nadu and be the change your community needs.
              </p>
              <div className="mt-8">
                <Link
                  to="/membership"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-[10px] font-bold uppercase tracking-[0.45em] text-primary-foreground shadow-lg transition-all duration-500 hover:shadow-gold/20 hover:shadow-xl"
                >
                  <span className="relative z-10">Join the Movement</span>
                  <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Main card ── */}
        <div className="grid lg:grid-cols-5 gap-6 items-stretch">

          {/* Left — dark feature card */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl bg-primary h-full min-h-[380px] p-10 md:p-12 flex flex-col justify-between shadow-2xl">
              {/* Corner accents */}
              <div className="absolute top-6 left-6 h-px w-12 bg-gold opacity-60" />
              <div className="absolute top-6 left-6 w-px h-12 bg-gold opacity-60" />
              <div className="absolute bottom-6 right-6 h-px w-12 bg-gold opacity-60" />
              <div className="absolute bottom-6 right-6 w-px h-12 bg-gold opacity-60" />

              {/* Subtle circle pattern */}
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-white/5" />
              <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full border border-white/5" />

              <div>
                <p className="text-[9px] uppercase tracking-[0.5em] text-gold-light font-bold mb-6">
                  What You Become
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                  A Leader in<br />
                  <span className="italic text-gold">Compassion &amp; Service</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  Free membership. No fees, no barriers. Open to all ages 15 and
                  above across Tamil Nadu. Step up, serve, and lead.
                </p>
              </div>

              {/* Pillars */}
              <div className="mt-10 flex flex-wrap gap-3">
                {pillars.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                  >
                    <Icon className="h-3 w-3 text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — stats + CTA column */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Stats */}
            {stats.map(({ value, label }, i) => (
              <ScrollReveal key={label} direction="right" delay={i * 0.1}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white px-8 py-7 flex items-center justify-between shadow-sm hover:shadow-xl hover:border-gold/40 hover:-translate-y-0.5 transition-all duration-500"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <p className="font-display text-4xl font-medium text-primary group-hover:text-gold transition-colors duration-500">
                      {value}
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/70 mt-1">
                      {label}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-400">
                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  </div>
                  {/* Bottom sweep */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full opacity-50" />
                </motion.div>
              </ScrollReveal>
            ))}

            {/* CTA card */}
            <ScrollReveal direction="right" delay={0.3}>
              <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-amber-50/60 px-8 py-7 flex flex-col gap-4 hover:border-gold/60 transition-all duration-400">
                <p className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold">
                  Free to Join — Always
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No fees. No barriers. Just your heart and time.
                </p>
                <Link
                  to="/membership"
                  className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:text-gold transition-colors duration-300"
                >
                  Register Now
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                {/* Gold corner */}
                <div className="absolute top-4 right-4 h-px w-8 bg-gold opacity-50" />
                <div className="absolute top-4 right-4 w-px h-8 bg-gold opacity-50" />
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* ── Bottom quote ── */}
        <ScrollReveal delay={0.3} className="mt-16 text-center">
          <div className="h-px w-14 bg-gold/40 mx-auto mb-8" />
          <p className="font-display text-xl md:text-2xl italic text-primary/60 max-w-2xl mx-auto leading-relaxed">
            "Every great movement begins with a single person who dares to care."
          </p>
          <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold mt-4">
            — Iraithuligal Iyakkam
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default MembershipSection;
