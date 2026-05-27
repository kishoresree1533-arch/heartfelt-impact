import ScrollReveal from "./ScrollReveal";
import galleryElderly from "@/assets/tamil_elderly_hero.png";

const images = [
  { src: galleryElderly, alt: "Tamil elder with silent resilience" },
  { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop", alt: "Hands of compassion" },
  { src: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop", alt: "Tamil children in village" },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop", alt: "Community hopeful moments" },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop", alt: "Service in action" },
  { src: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=800&auto=format&fit=crop", alt: "Empowered future" },
];

const GallerySection = () => {
  return (
    <section className="bg-warm-alt pt-8 pb-12 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Captures of Care</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium md:text-5xl">
            Moments of Transformation
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="group relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/30" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
