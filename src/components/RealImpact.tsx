import ScrollReveal from "./ScrollReveal";

import fwdImage1 from "../assets/fwd/633320.jpg";
import fwdImage2 from "../assets/fwd/633321.jpg";
import fwdImage3 from "../assets/fwd/633322.jpg";
import fwdImage4 from "../assets/fwd/633323.jpg";
import fwdImage5 from "../assets/fwd/633324.jpg";
import fwdImage6 from "../assets/fwd/633325.jpg";
import fwdImage7 from "../assets/fwd/633326.jpg";
import fwdImage8 from "../assets/fwd/633327.jpg";

const realWorkImages = [
  { src: fwdImage1, title: "Humanitarian Aid", category: "Rural Development" },
  { src: fwdImage2, title: "Empowerment Program", category: "Education" },
  { src: fwdImage3, title: "Mobile Medical Care", category: "Healthcare" },
  { src: fwdImage4, title: "Nutritional Support", category: "Community" },
  { src: fwdImage5, title: "Sustainable Living", category: "Livelihood" },
  { src: fwdImage6, title: "Village Upliftment", category: "Infrastructure" },
  { src: fwdImage7, title: "Skills & Vocational Training", category: "Social Change" },
  { src: fwdImage8, title: "Dignity & Support", category: "Medical Care" },
];

const RealImpact = () => {
  return (
    <section id="real-impact" className="bg-warm-alt pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.4em] text-gold-light">Real Actions</p>
          <h2 className="mt-4 text-center font-display text-4xl font-medium tracking-tight md:text-6xl text-primary md:text-7xl">
            Our Work in the <span className="italic text-gold">Field</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-light text-muted-foreground md:text-xl">
            Transparency is at the heart of our mission. Explore the raw, authentic moments of change we are creating across Tamil Nadu.
          </p>
        </ScrollReveal>

        <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {realWorkImages.map((work, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group relative overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.03)] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] cursor-pointer rounded-sm">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={work.src}
                    alt={work.title}
                    className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealImpact;
