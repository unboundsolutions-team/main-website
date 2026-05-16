import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import DivisionsSection from "@/components/DivisionsSection";
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Sparkles } from "lucide-react";

const values = [
  {
    icon: Globe2,
    title: "India-Germany delivery mindset",
    description:
      "We combine India's execution speed with the documentation, privacy, and reliability expectations of European business teams.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-aware builds",
    description:
      "From cookie consent and legal-page structure to secure integrations, we consider trust and regulatory readiness from the start.",
  },
  {
    icon: Sparkles,
    title: "Design that supports business",
    description:
      "Our interfaces are built for clarity, conversion, and long-term maintainability, not just launch-day polish.",
  },
];

const reasons = [
  "Custom websites and landing pages shaped around your offer, audience, and sales process.",
  "Shopify and e-commerce implementation with clean product structures and conversion-focused UX.",
  "UI/UX design, branding support, and content presentation that keeps complex services easy to understand.",
  "Technical consulting, automation, security-minded workflows, and ongoing improvement after launch.",
];

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
        <section className="container mx-auto px-6 py-12 md:py-20 max-w-5xl text-center">
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

        <section className="container mx-auto px-6 py-10 md:py-16 max-w-7xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div>
              <span className="section-badge mb-5">Company overview</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Bridging the gap between global capability and German precision.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Unbound Solutions is a full-service digital partner born out of a simple observation: the global IT landscape often forces businesses to choose between cost-efficiency and uncompromising quality. We established our dual-market presence—operating natively in both Hyderabad, India, and Germany—to eliminate that compromise.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                We plan, design, engineer, and scale web platforms, Shopify e-commerce ecosystems, and custom software. Whether you are a Mittelstand enterprise in Germany requiring strict DSGVO compliance, or an ambitious global brand needing rapid deployment, our unified team delivers with the rigor and accountability you expect.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By integrating strategic design, secure engineering, and deep cultural alignment, we build digital assets that perform flawlessly and inspire trust across borders.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {values.map((item) => (
                <div key={item.title} className="glass-card p-6">
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10 md:py-16 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Our mission
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-5">
                To deliver frictionless digital excellence across borders.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to empower businesses to launch robust, high-performing digital experiences without the typical hurdles of offshore development. We eliminate fragmented communication, opaque processes, and compliance risks by providing a single, accountable team that understands both code and context. We build technology that works precisely as it should, every single time.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Our vision
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-5">
                To be the definitive digital bridge connecting global ambitions.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where geographical boundaries do not dictate technical quality or regulatory safety. By continuously refining our dual-market model, we aim to be the most trusted technology partner for companies demanding world-class engineering, bulletproof security, and elegant design, regardless of where they are located.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10 md:py-16 max-w-7xl">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div>
              <span className="section-badge mb-5">Why choose us</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                End-to-end execution with zero compromises.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Choosing a development partner is a critical business decision. We de-risk that choice by combining deep technical expertise with an unwavering commitment to client success. 
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From maintaining pristine code quality and optimizing conversion funnels, to ensuring legal compliance and providing transparent communication, we handle the complexities so you can focus on growth.
              </p>
            </div>
            <div className="space-y-4 mt-2 lg:mt-0">
              {reasons.map((reason) => (
                <div key={reason} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>
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
