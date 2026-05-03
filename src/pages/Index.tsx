import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DivisionsSection from "@/components/DivisionsSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <main>
        <HeroSection />
        <DivisionsSection />
        <ServicesSection />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
