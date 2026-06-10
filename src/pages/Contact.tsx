import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import contactHero from "@/assets/tamil_elderly_hero.png";

const Contact = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <PageHero
        label="Get In Touch"
        title="We're Here to"
        highlight="Listen"
        subtitle="Whether you want to volunteer, partner, or simply say hello — our door is always open."
        image={contactHero}
      />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
