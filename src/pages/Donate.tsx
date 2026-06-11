import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationSection from "@/components/DonationSection";
import PageHero from "@/components/PageHero";
import donateHero from "@/assets/donate-hero.png";

const Donate = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <PageHero
        label="Give Today"
        title="Support the"
        highlight="Mission"
        subtitle="Every rupee goes directly to the people who need it most. No overhead, no detours."
        image={donateHero}
        objectPosition="center 20%"
      />
      <DonationSection />
      <Footer />
    </div>
  );
};

export default Donate;
