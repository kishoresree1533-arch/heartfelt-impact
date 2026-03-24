import ScrollReveal from "./ScrollReveal";
import storyBefore from "@/assets/story-before.jpg";
import storyAfter from "@/assets/story-after.jpg";

const StorySection = () => {
  return (
    <section id="story" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold">Their Story</p>
          <h2 className="mt-4 text-center text-3xl font-display font-medium md:text-5xl">
            From Darkness to Light
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-12">
          {/* Before */}
          <ScrollReveal delay={0.1} direction="left">
            <div className="group">
              <div className="overflow-hidden">
                <img
                  src={storyBefore}
                  alt="A young girl's tearful smile"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={960}
                  height={1280}
                />
              </div>
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">The Pain</p>
                <h3 className="mt-2 font-display text-2xl">Meera, Age 8</h3>
                <p className="mt-4 font-light leading-relaxed text-muted-foreground">
                  Meera walked 6 miles every day just for a glass of clean water. Her village had no school,
                  no clinic, no hope. She dreamed of reading books but had never held one.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* After */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="group">
              <div className="overflow-hidden">
                <img
                  src={storyAfter}
                  alt="A joyful girl reading in a classroom"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={960}
                  height={1280}
                />
              </div>
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">The Transformation</p>
                <h3 className="mt-2 font-display text-2xl">Meera, Today</h3>
                <p className="mt-4 font-light leading-relaxed text-muted-foreground">
                  Today, Meera reads to her entire class. With your support, we built a school in her village,
                  installed clean water wells, and gave her — and 200 other children — a future worth smiling about.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2} className="mt-20 text-center">
          <p className="mx-auto max-w-2xl font-display text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
            "You didn't just give me water. You gave me the chance to dream."
          </p>
          <p className="mt-4 text-sm tracking-[0.15em] text-gold">— Meera</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StorySection;
