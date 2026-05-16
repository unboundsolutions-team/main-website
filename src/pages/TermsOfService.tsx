import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the Unbound Agency website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2>2. Services</h2>
            <p>Unbound Agency provides web development, e-commerce solutions, UI/UX design, cybersecurity services, IT consulting, and professional training. Specific deliverables and timelines are outlined in individual project agreements.</p>
          </section>

          <section>
            <h2>3. User Responsibilities</h2>
            <ul>
              <li>Provide accurate and complete information when submitting forms or engaging our services</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Use our website and services in compliance with applicable laws</li>
              <li>Not attempt to interfere with the proper functioning of our website</li>
            </ul>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and code, is the property of Unbound Agency unless otherwise stated. You may not reproduce, distribute, or modify any content without our prior written consent.</p>
          </section>

          <section>
            <h2>5. Project Agreements</h2>
            <p>Individual project engagements are governed by separate agreements that outline scope, deliverables, timelines, payment terms, and ownership of work product. These agreements supplement these Terms of Service.</p>
          </section>

          <section>
            <h2>6. Payment Terms</h2>
            <p>Payment terms are specified in individual project agreements. Unless otherwise stated, invoices are due within 30 days. Late payments may incur additional charges as specified in the project agreement.</p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Unbound Agency shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or website.</p>
          </section>

          <section>
            <h2>8. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Unbound Agency from any claims, losses, or damages arising from your use of our services or violation of these terms.</p>
          </section>

          <section>
            <h2>9. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our services at any time, with or without cause. Project-specific termination terms are governed by individual agreements.</p>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>These Terms are governed by applicable law. Any disputes will be resolved through appropriate legal channels in the jurisdiction agreed upon in individual project agreements.</p>
          </section>

          <section>
            <h2>11. Changes to Terms</h2>
            <p>We may update these Terms periodically. Continued use of our services after changes constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2>12. Contact</h2>
            <p>For questions about these Terms of Service, contact us at:</p>
            <p className="font-medium text-foreground">hello@unboundhq.com</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
