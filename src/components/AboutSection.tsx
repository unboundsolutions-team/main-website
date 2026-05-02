import { CheckCircle2, Target, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "Every project is designed to achieve measurable outcomes — more traffic, higher conversions, and better ROI for your business.",
  },
  {
    icon: Users,
    title: "Dedicated Partnership",
    description: "We work as an extension of your team, providing transparent communication and collaborative problem-solving throughout every project.",
  },
  {
    icon: Zap,
    title: "Modern Technology Stack",
    description: "We use industry-leading tools like React, Shopify, Figma, and enterprise security frameworks to build future-proof solutions.",
  },
];

const benefits = [
  "Full-service digital agency — development, design & security",
  "Experienced team with 150+ successful projects delivered",
  "Transparent pricing with detailed project estimates",
  "Fast turnaround with dedicated project management",
  "Ongoing support and maintenance packages available",
  "GDPR-compliant processes for European clients",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="section-badge mb-4">Why Choose Unbound</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Trusted by <span className="gradient-text">50+ Businesses</span> Worldwide
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Since our founding, we've helped startups, SMBs, and enterprises across Europe, India, and 
              globally achieve their digital goals. Our integrated approach combines technical expertise 
              with strategic thinking to deliver solutions that generate real business value.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Benefits Card */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl p-8 border border-border shadow-card">
              <h3 className="text-xl font-bold mb-6">The Unbound Advantage</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full gradient-bg border-2 border-card flex items-center justify-center text-white text-xs font-bold"
                      >
                        {["JD", "MK", "AS", "RB"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold">50+ Happy Clients</div>
                    <div className="text-sm text-muted-foreground">
                      Trust Unbound for their digital needs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
