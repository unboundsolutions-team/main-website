import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | Unbound Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="container mx-auto px-6 py-12 md:py-16 max-w-4xl text-center">
          <span className="section-badge mb-6">Get in touch</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Let's start a <span className="gradient-text">conversation</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Free consultation, transparent pricing, and a response within one business day —
            wherever you're based.
          </p>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
