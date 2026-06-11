import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Flame, Award, Heart } from "lucide-react";
import founderImg from "@/assets/services_tamil_volunteers.png";

const milestones = [
  { icon: Flame,  label: "Founded By",     value: "S. Karthikeyan" },
  { icon: Award,  label: "Inaugurated By", value: "Sandeep Nanduri IAS" },
  { icon: Heart,  label: "Core Mission",   value: "Blood Donation & Humanity" },
];

const IntroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden py-16 md:py-24">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-50/80 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-rose-50/50 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT — image with badge overlay ── */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src={founderImg}
                  alt="Irai Thuligal Iyakkam inauguration"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Inauguration badge — bottom left */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl border border-white/20 bg-black/50 backdrop-blur-md px-5 py-4">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold mb-1">
                      Formally Inaugurated By
                    </p>
                    <p className="font-display text-white text-lg leading-tight">
                      Sandeep Nanduri <span className="text-gold italic">IAS</span>
                    </p>
                    <p className="text-[10px] text-white/50 mt-0.5">
                      District Collector · Tamil Nadu
                    </p>
                  </div>
                </div>

                {/* Gold corner accents */}
                <div className="absolute top-5 left-5 h-px w-10 bg-gold opacity-70" />
                <div className="absolute top-5 left-5 w-px h-10 bg-gold opacity-70" />
              </div>

              {/* Floating stat card */}
              <motion.div
                className="absolute -right-6 top-10 bg-white rounded-2xl shadow-xl border border-border px-5 py-4 hidden md:block"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <p className="font-display text-3xl font-medium text-gold">2021</p>
                <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60 mt-1">
                  Year Founded
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* ── RIGHT — content ── */}
          <ScrollReveal direction="right">
            <div className="flex flex-col">

              {/* Label */}
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-5">
                Our Origin
              </p>

              {/* Heading */}
              <h2 className="font-display text-4xl font-medium text-primary md:text-5xl leading-[1.1] mb-6">
                Born From a <br />
                <span className="italic text-gold">Single Act of Care</span>
              </h2>

              {/* Gold rule */}
              <div className="h-px w-12 bg-gold/40 mb-8" />

              {/* Story text — split into digestible paragraphs */}
              <div className="space-y-5 text-base font-light leading-relaxed text-muted-foreground max-w-lg">
                <p>
                  Recognising the challenges faced by pregnant women from rural
                  communities in securing blood donors during medical emergencies
                  at government hospitals, <span className="font-medium text-primary">Mr. S. Karthikeyan</span> established
                  the <span className="font-medium text-gold">Irai Thuligal Foundation</span> with a vision to provide
                  timely blood donation support and humanitarian assistance.
                </p>
                <p>
                  The initiative was formally inaugurated by the then District
                  Collector, <span className="font-medium text-primary">Mr. Sandeep Nanduri IAS</span>, who ceremonially
                  lit the traditional lamp and launched the movement.
                </p>
                <p>
                  Since then, Irai Thuligal has been dedicated to serving society
                  through voluntary blood donation and various humanitarian activities
                  — reaching the furthest corners of Tamil Nadu.
                </p>
              </div>

              {/* Milestone pills */}
              <div className="mt-10 flex flex-col gap-3">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-[#faf8f5] px-5 py-4 hover:border-gold/40 hover:bg-amber-50/60 transition-all duration-400 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-all duration-400">
                      <m.icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/50 mb-0.5">{m.label}</p>
                      <p className="text-sm font-medium text-primary">{m.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;
