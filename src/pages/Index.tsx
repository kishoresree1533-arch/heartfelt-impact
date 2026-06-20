import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ImpactSection from "@/components/ImpactSection";
import ServicesSection from "@/components/ServicesSection";
import StorySection from "@/components/StorySection";
import FounderSection from "@/components/FounderSection";
import AwardsSection from "@/components/AwardsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

// ── Added sections ──
import PromiseSection from "@/components/PromiseSection";
import DonationCategories from "@/components/DonationCategories";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import VolunteerCTA from "@/components/VolunteerCTA";
import MembershipSection from "@/components/MembershipSection";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Introduction — origin story */}
      <IntroSection />

      {/* Our Causes — from Services page */}
      <ServicesSection />
      <ImpactSection />

      {/* Our Story & Founder — from About page */}
      <StorySection />
      <FounderSection />

      {/* Awards & Recognition */}
      <AwardsSection />

      {/* Promise + Donation categories */}
      <PromiseSection />
      <DonationCategories />

      {/* How it works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Trust */}
      <TrustSection />

      {/* Membership CTA */}
      <MembershipSection />

      {/* Volunteer CTA */}
      <VolunteerCTA />

      <div className="h-16 md:h-24 bg-white" />

      <Footer />
    </div>
  );
};

export default Index;
