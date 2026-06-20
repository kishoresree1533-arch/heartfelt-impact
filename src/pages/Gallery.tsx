import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import PageHero from "@/components/PageHero";
import galleryHero from "@/assets/gallery-hero.png";

const Gallery = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col w-full max-w-[100vw]">
      <Navbar />
      <PageHero
        label="In the Field"
        title="Gallery &"
        highlight="Real Impact"
        subtitle="A visual record of lives touched, communities transformed, and hope restored."
        image={galleryHero}
      />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Gallery;
