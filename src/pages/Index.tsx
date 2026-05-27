import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ImpactSection from "@/components/ImpactSection";
import ServicesSection from "@/components/ServicesSection";

import FounderSection from "@/components/FounderSection";
import DonationSection from "@/components/DonationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import RealImpact from "@/components/RealImpact";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <HeroSection />
      <StorySection />
      <div id="impact">
        <ImpactSection />
      </div>
      <ServicesSection />

      <RealImpact />
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
