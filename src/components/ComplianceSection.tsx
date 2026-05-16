import { Shield, Globe } from "lucide-react";

const usStateLaws = [
  "CCPA (California)",
  "CPA (Colorado)",
  "CTDPA (Connecticut)",
  "UCPA (Utah)",
  "VCDPA (Virginia)",
  "IACDPA (Iowa)",
  "DPDPA (Delaware)",
  "NHDPL (New Hampshire)",
];

const internationalLaws = [
  "GDPR (EU)",
  "APPI (Japan)",
  "APA (Australia)",
  "NZPA (New Zealand)",
  "LGPD (Brazil)",
  "PIPEDA (Canada)",
];

const ComplianceSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-badge mb-4">Compliance</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Global <span className="gradient-text">Privacy Compliance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We help businesses navigate complex data privacy regulations across jurisdictions, ensuring full compliance with all major frameworks.
          </p>
        </div>

        {/* Compliance Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* US State Laws */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-foreground">
                US State Laws
              </h3>
            </div>
            <ul className="space-y-3">
              {usStateLaws.map((law) => (
                <li
                  key={law}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-default"
                >
                  {law}
                </li>
              ))}
            </ul>
          </div>

          {/* International */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-foreground">
                International
              </h3>
            </div>
            <ul className="space-y-3">
              {internationalLaws.map((law) => (
                <li
                  key={law}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-default"
                >
                  {law}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
