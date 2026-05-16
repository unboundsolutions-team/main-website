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
        <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
            <div>
              <span className="section-badge mb-5">Visit our office</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
                Find Unbound Solutions in Ahmedabad.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We work with clients remotely across regions, and our Ahmedabad location anchors
                our delivery team for consultations, planning sessions, and business meetings.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <iframe
                title="Unbound Solutions Pvt Ltd location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.07239755102!2d72.54785737497998!3d23.057807215012996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85322904a23f%3A0x94d1937cc38b4ca8!2sUnbound%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1778911957617!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[320px] w-full md:h-[450px]"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
