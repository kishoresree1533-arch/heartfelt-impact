import ScrollReveal from "./ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Volunteers distributing food" },
  { src: gallery2, alt: "Children playing at school" },
  { src: gallery3, alt: "Medical camp for children" },
  { src: gallery4, alt: "Community water well" },
  { src: gallery5, alt: "Elderly receiving warm blankets" },
  { src: gallery6, alt: "Students studying under a tree" },
];

const GallerySection = () => {
  return (
    <section className="bg-warm-alt py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Moments of Change</p>
          <h2 className="mt-4 text-center font-display text-3xl font-medium md:text-5xl">
            Every Face Tells a Story
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
