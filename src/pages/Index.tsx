import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ImpactSection from "@/components/ImpactSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import FounderSection from "@/components/FounderSection";
import DonationSection from "@/components/DonationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StorySection />
      <div id="impact">
        <ImpactSection />
      </div>
      <ServicesSection />
      <div id="gallery">
        <GallerySection />
      </div>
      <FounderSection />
      <DonationSection />
      <TestimonialsSection />
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
