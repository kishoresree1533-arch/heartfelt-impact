import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StorySection from "@/components/StorySection";
import FounderSection from "@/components/FounderSection";
import PageHero from "@/components/PageHero";
import aboutHero from "@/assets/about-hero.png";

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <PageHero
        label="Who We Are"
        title="Our Story &"
        highlight="Our Mission"
        subtitle="Born from compassion, built by community — here's the journey that drives every act of service."
        image={aboutHero}
      />
      <StorySection />
      <FounderSection />
      <Footer />
    </div>
  );
};

export default About;
