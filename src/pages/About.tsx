import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import DivisionsSection from "@/components/DivisionsSection";
import { ArrowRight } from "lucide-react";

const About = () => {
  useEffect(() => {
    document.title = "About Us | Unbound Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-32">
        {/* Hero */}
        <section className="container mx-auto px-6 py-12 md:py-20 max-w-4xl text-center">
          <span className="section-badge mb-6">About Unbound</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            A digital partner built for{" "}
            <span className="gradient-text">dual-market delivery</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We design, build, and ship websites, Shopify stores, and brand systems for teams
            operating across India and Germany — with compliance baked in from day one.
          </p>
        </section>

        <AboutSection />
        <DivisionsSection />

        {/* CTA */}
        <section className="container mx-auto px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-10 md:p-14 text-center max-w-4xl mx-auto shadow-card">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Let's build something great</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Tell us about your project and we'll get back within one business day.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
