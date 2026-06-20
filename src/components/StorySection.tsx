import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import chapterReal2 from "@/assets/chapter-real-2.jpg";
import chapterReal3a from "@/assets/chapter-real-3a.jpg";
import chapterReal3b from "@/assets/chapter-real-3b.jpg";
import chapterReal3c from "@/assets/chapter-real-3c.jpg";
import chapterReal3d from "@/assets/chapter-real-3d.jpg";
import chapterReal4a from "@/assets/chapter-real-4a.jpg";
import chapterReal4b from "@/assets/chapter-real-4b.jpg";
import chapterReal4c from "@/assets/chapter-real-4c.jpg";
import bloodExtra1 from "@/assets/attachments (1)/IMG20260607105124.jpg";
import bloodExtra2 from "@/assets/attachments (1)/IMG_20250820_152238 (1).jpg";
import bloodExtra3 from "@/assets/attachments (1)/IMG_20250926_154011.jpg";
import bloodNew1 from "@/assets/blood donation/IMG-20251129-WA0014.jpg";
import bloodNew2 from "@/assets/blood donation/IMG-20251129-WA0015.jpg";
import bloodNew3 from "@/assets/blood donation/IMG-20251129-WA0016.jpg";
import bloodNew4 from "@/assets/blood donation/IMG-20251129-WA0019.jpg";
import bloodNew5 from "@/assets/blood donation/IMG-20251129-WA0023.jpg";
import bloodNew6 from "@/assets/blood donation/IMG-20251129-WA0024.jpg";
import bloodNew7 from "@/assets/blood donation/IMG_20260616_101826.jpg";

import fwd1 from "@/assets/fwd/633320.jpg";
import fwd2 from "@/assets/fwd/633321.jpg";
import fwd3 from "@/assets/fwd/633322.jpg";
import fwd4 from "@/assets/fwd/633323.jpg";
import fwd5 from "@/assets/fwd/633324.jpg";
import fwd6 from "@/assets/fwd/633325.jpg";
import fwd7 from "@/assets/fwd/633326.jpg";
import fwd8 from "@/assets/fwd/633327.jpg";

const finalActImages = [fwd1, fwd2, fwd3, fwd4, fwd5, fwd6, fwd7, fwd8];
const bloodDonationImages = [
  chapterReal3a,
  chapterReal3b,
  chapterReal3c,
  chapterReal3d,
  bloodExtra1,
  bloodExtra2,
  bloodExtra3,
  bloodNew1,
  bloodNew2,
  bloodNew3,
  bloodNew4,
  bloodNew5,
  bloodNew6,
  bloodNew7
];
const treePlantingImages = [chapterReal4a, chapterReal4b, chapterReal4c];

import foodDonate1 from "@/assets/food donate/IMG_20260618_122827.jpg";
import foodDonate2 from "@/assets/food donate/IMG_20260618_122838.jpg";
import foodDonate3 from "@/assets/food donate/IMG_20260618_122848.jpg";
import foodDonate4 from "@/assets/food donate/IMG_20260618_122859.jpg";
import foodDonate5 from "@/assets/food donate/IMG_20260618_122909.jpg";

const foodDonateImages = [foodDonate1, foodDonate2, foodDonate3, foodDonate4, foodDonate5];

import gallery1 from "@/assets/gallery image/IMG_20260326_124213.jpg - Copy.jpeg";
import gallery2 from "@/assets/gallery image/IMG_20260326_124227.jpg.jpeg";
import gallery3 from "@/assets/gallery image/IMG_20260326_124237.jpg.jpeg";
import gallery4 from "@/assets/gallery image/IMG_20260326_124248.jpg.jpeg";

const nourishmentImages = [
  chapterReal2,
  gallery1,
  gallery2,
  gallery3,
  gallery4
];

/* ─────────────────────────────────────────────
   Reusable Premium Image Slider
───────────────────────────────────────────── */
interface SliderProps {
  images: string[];
  accentColor?: string;
  label?: string;
  labelIcon?: string;
}

const PremiumSlider = ({ images, accentColor = "bg-red-500", label = "Live", labelIcon = "❤" }: SliderProps) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3400);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-muted shadow-xl group max-w-sm mx-auto aspect-[3/4]">
      {/* Images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${label} ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1.02)" : "scale(1)",
            zIndex: i === current ? 2 : 1,
          }}
        />
      ))}

      {/* Dark overlay that lifts on hover */}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors duration-1000 z-10 rounded-2xl" />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-full transition-all duration-700"
            style={{
              left: `${(i / images.length) * 100}%`,
              width: `${100 / images.length}%`,
              backgroundColor: i === current ? "rgba(255,255,255,0.9)" : "transparent",
            }}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 px-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative overflow-hidden rounded transition-all duration-300 focus:outline-none ${
              i === current
                ? "w-14 h-10 ring-2 ring-white/90 ring-offset-1 ring-offset-transparent opacity-100 scale-110 shadow-lg"
                : "w-10 h-10 opacity-45 hover:opacity-75 hover:scale-105"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border border-white/10">
        {current + 1} / {images.length}
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
        <span className={`block w-2 h-2 rounded-full ${accentColor} animate-pulse`} />
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/80 uppercase">{labelIcon} {label}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Chapter Data
───────────────────────────────────────────── */
const chapters = [
  {
    number: "01",
    label: "The Final Act",
    title: "A Final Act of Humanity",
    text: "No name, no family, no final goodbye,\nLeft alone beneath the open sky.\nWe stand for dignity till the end,\nGiving respect when none can send.",
    image: null,
    type: "slider",
    sliderImages: finalActImages,
    sliderAccent: "bg-amber-500",
    sliderLabel: "In Memory",
    sliderIcon: "🕊",
  },
  {
    number: "02",
    label: "The Nourishment",
    title: "Kindness Begins With a Meal",
    text: "Every child deserves a full plate,\nA chance to smile, a hopeful fate.\nYour small help can light their way,\nBe the reason they smile today.",
    image: null,
    type: "slider",
    sliderImages: nourishmentImages,
    sliderAccent: "bg-amber-500",
    sliderLabel: "Nourishing",
    sliderIcon: "🍲",
  },
  {
    number: "03",
    label: "The Lifeblood",
    title: "A Drop That Saves Lives",
    text: "When two lives depend on a drop of care,\nWe stand ready, always there.\nA gift of blood, a chance to live,\nYour support helps us continue to give.",
    image: null,
    type: "slider",
    sliderImages: bloodDonationImages,
    sliderAccent: "bg-red-500",
    sliderLabel: "Donors",
    sliderIcon: "❤",
  },
  {
    number: "04",
    label: "The Future",
    title: "Planting Hope for Tomorrow",
    text: "We plant today for a greener tomorrow,\nFor children to breathe without sorrow.\nEach tree we grow is a life we save,\nA gift to the future, strong and brave.",
    image: null,
    type: "slider",
    sliderImages: treePlantingImages,
    sliderAccent: "bg-green-500",
    sliderLabel: "Growing",
    sliderIcon: "🌱",
  },
  {
    number: "05",
    label: "The Sustenance",
    title: "A Warm Meal, A Restored Soul",
    text: "For those who wander, forgotten and cold,\nWith stories of hardship left untold.\nA simple meal, a cup of grace,\nRestores a smile on every face.",
    image: null,
    type: "slider",
    sliderImages: foodDonateImages,
    sliderAccent: "bg-amber-600",
    sliderLabel: "Nourishing",
    sliderIcon: "🍛",
  },
];

/* ─────────────────────────────────────────────
   Story Section
───────────────────────────────────────────── */
const StorySection = () => {
  return (
    <section id="story" className="bg-background py-12 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-gold font-bold mb-4">The Narrative of Change</p>
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl text-primary leading-[1.1]">
              Impact <span className="italic text-gold">Beyond Measure</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className={`group relative ${
                index === 4 ? "md:col-span-2 md:max-w-xl md:mx-auto w-full" : ""
              }`}
            >
              <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.1}>
                {chapter.type === "slider" && chapter.sliderImages ? (
                  <PremiumSlider
                    images={chapter.sliderImages}
                    accentColor={chapter.sliderAccent}
                    label={chapter.sliderLabel}
                    labelIcon={chapter.sliderIcon}
                  />
                ) : (
                  <div className="rounded-2xl overflow-hidden bg-muted shadow-xl relative max-w-sm mx-auto aspect-[3/4]">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-1000 z-10 rounded-2xl" />
                    <img
                      src={chapter.image!}
                      alt={chapter.title}
                      className="w-full h-full object-cover grayscale-[20%] transition-all duration-[2s] group-hover:grayscale-0"
                    />
                  </div>
                )}

                <div className={`mt-12 space-y-6 ${index === 4 ? "md:text-center" : ""}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-light">
                    Chapter {chapter.number} — {chapter.label}
                  </p>
                  <h3 className="font-display text-4xl tracking-tight leading-tight group-hover:text-gold transition-colors duration-500">
                    {chapter.title}
                  </h3>
                  <p className={`text-lg font-normal leading-relaxed text-muted-foreground whitespace-pre-line ${index === 4 ? "mx-auto max-w-lg" : "max-w-md"}`}>
                    {chapter.text}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Global Signature Quote */}
        <ScrollReveal delay={0.3} className="mt-48 text-center">
          <div className="inline-block relative">
            <span className="font-display text-9xl text-gold/5 leading-none absolute -top-16 -left-12 pointer-events-none select-none">"</span>
            <p className="max-w-5xl font-display text-3xl italic leading-relaxed text-primary/80 md:text-6xl">
              "We don't just provide aid; <br className="hidden md:block" /> we restore hope where it was lost."
            </p>
            <div className="mt-16 flex flex-col items-center">
              <div className="h-[1px] w-20 bg-gold mb-6" />
              <p className="text-xs tracking-[0.3em] text-gold-light font-bold uppercase">— Foundation Mission</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StorySection;
