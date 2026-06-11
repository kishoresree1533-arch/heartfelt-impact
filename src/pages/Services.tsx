import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import ImpactSection from "@/components/ImpactSection";
import RealImpact from "@/components/RealImpact";
import PageHero from "@/components/PageHero";
import servicesHero from "@/assets/services-hero.png";

const Services = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <PageHero
        label="What We Do"
        title="Our Causes &"
        highlight="Services"
        subtitle="From nourishment to education — each programme is built around dignity and long-term change."
        image={servicesHero}
      />
      <ServicesSection />
      <ImpactSection />
      <RealImpact />
      <Footer />
    </div>
  );
};

export default Services;
