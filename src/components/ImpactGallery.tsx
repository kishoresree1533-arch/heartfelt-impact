import ScrollReveal from "./ScrollReveal";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=900&auto=format&fit=crop",
    alt: "Food distribution to families",
    caption: "Food Distribution",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=700&auto=format&fit=crop",
    alt: "Medical camp in rural village",
    caption: "Medical Camps",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=700&auto=format&fit=crop",
    alt: "Children in education programme",
    caption: "Education Support",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=700&auto=format&fit=crop",
    alt: "Community service volunteers",
    caption: "Community Service",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700&auto=format&fit=crop",
    alt: "Rural development projects",
    caption: "Rural Development",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=700&auto=format&fit=crop",
    alt: "Children in village community",
    caption: "Community Bonds",
    span: "",
  },
];

const ImpactGallery = () => {
  return (
    <section className="bg-[#111111] py-20 md:py-32 overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <p className="text-xs uppercase tracking-[0.6em] text-gold font-bold mb-6">
              In the Field
            </p>
            <h2 className="font-display text-4xl font-medium text-white md:text-6xl leading-tight">
              Moments Of <span className="italic text-gold">Change</span>
            </h2>
            <div className="mt-8 h-px w-16 bg-gold/40" />
          </div>
        </ScrollReveal>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 auto-rows-[260px]">
          {photos.map((photo, i) => (
            <ScrollReveal key={i} delay={i * 0.08} direction="none">
              <div className={`group relative overflow-hidden h-full ${photo.span}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover grayscale-[15%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                  width={900}
                  height={600}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 p-5">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                    {photo.caption}
                  </span>
                </div>
                {/* Corner accent */}
                <div className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-16" />
                <div className="absolute top-0 left-0 w-px h-0 bg-gold transition-all duration-700 group-hover:h-16" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactGallery;
