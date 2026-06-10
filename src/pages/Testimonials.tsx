import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";
import testimonialHero from "@/assets/story_tamil_child_studying.png";

const Testimonials = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <PageHero
        label="Voices of Change"
        title="Stories from the"
        highlight="Community"
        subtitle="The most powerful proof of our work comes from the people we serve."
        image={testimonialHero}
      />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Testimonials;
