import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Food Support",
    desc: "Help provide nutritious meals and basic needs for families in need.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=900&auto=format&fit=crop",
    tag: "Nutrition",
    tagColor: "bg-amber-500",
    accentBorder: "hover:ring-amber-400",
    stat: "500+",
    statLabel: "Meals Served",
  },
  {
    title: "Education Support",
    desc: "Support children's education and open doors to better opportunities.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop",
    tag: "Education",
    tagColor: "bg-sky-500",
    accentBorder: "hover:ring-sky-400",
    stat: "300+",
    statLabel: "Children Supported",
  },
  {
    title: "Healthcare Support",
    desc: "Provide essential medical care to underserved and remote communities.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=900&auto=format&fit=crop",
    tag: "Healthcare",
    tagColor: "bg-rose-500",
    accentBorder: "hover:ring-rose-400",
    stat: "1,200+",
    statLabel: "Lives Treated",
  },
  {
    title: "Emergency Relief",
    desc: "Help communities recover quickly during difficult crisis situations.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=900&auto=format&fit=crop",
    tag: "Relief",
    tagColor: "bg-emerald-500",
    accentBorder: "hover:ring-emerald-400",
    stat: "50+",
    statLabel: "Relief Camps",
  },
];

const DonationCategories = () => {
  return (
    <section className="bg-[#faf8f5] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-10 items-end mb-14 md:mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-5">
                Give With Purpose
              </p>
              <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-[1.05]">
                Where Your Donation <br />
                <span className="italic text-gold">Makes A Difference</span>
              </h2>
            </div>
            <div className="lg:pl-10 lg:border-l border-border">
              <p className="text-base font-light leading-relaxed text-muted-foreground max-w-md">
                Every rupee is directed to a specific cause. Choose where your
                heart leads — and watch real change unfold.
              </p>
              <Link
                to="/donate"
                className="group inline-flex items-center gap-3 mt-8 text-[10px] uppercase tracking-[0.45em] font-bold text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors duration-300"
              >
                View All Causes
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.12} direction="up" className="h-full">
              <div className={`group relative flex flex-col h-full overflow-hidden rounded-2xl ring-1 ring-black/8 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${cat.accentBorder} hover:ring-2`}>

                {/* ── Full image, no overlay ── */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={900}
                    height={900}
                  />
                  {/* Tag pill */}
                  <span className={`absolute top-4 left-4 ${cat.tagColor} text-white text-[9px] uppercase tracking-[0.4em] font-bold px-3 py-1 rounded-full shadow-md`}>
                    {cat.tag}
                  </span>
                  {/* Stat badge — bottom right */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                    <p className="font-display text-base font-semibold text-primary leading-none">{cat.stat}</p>
                    <p className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground mt-0.5">{cat.statLabel}</p>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-display text-lg text-primary mb-2 group-hover:text-gold transition-colors duration-400">
                    {cat.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground mb-5 line-clamp-2 min-h-[2.8rem]">
                    {cat.desc}
                  </p>
                  <Link
                    to="/donate"
                    className="group/btn mt-auto flex items-center justify-between border border-gold/40 rounded-xl px-4 py-3 text-[9px] font-bold uppercase tracking-[0.4em] text-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-400"
                  >
                    <span>Donate Now</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DonationCategories;
