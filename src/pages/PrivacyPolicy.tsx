import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-8 [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <section>
            <h2>1. Introduction</h2>
            <p>Unbound Agency ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>Personal Data</h3>
            <p>We may collect personally identifiable information you voluntarily provide, including:</p>
            <ul>
              <li>Name and email address (via contact forms)</li>
              <li>Phone number (if provided)</li>
              <li>Company name and project details</li>
            </ul>
            <h3>Automatically Collected Data</h3>
            <p>When you visit our site, we may automatically collect:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent</li>
              <li>Referring website information</li>
              <li>Device and operating system information</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To respond to your inquiries and provide requested services</li>
              <li>To improve our website and user experience</li>
              <li>To send periodic emails regarding your project or services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to enhance your experience. You can control cookie preferences through our cookie consent banner. Types of cookies we use:</p>
            <ul>
              <li><strong>Strictly Necessary:</strong> Required for basic site functionality</li>
              <li><strong>Analytics:</strong> Help us understand visitor interactions</li>
              <li><strong>Marketing:</strong> Used for personalized advertising</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Protection Rights</h2>
            <p>Depending on your jurisdiction, you may have the following rights:</p>
            <ul>
              <li><strong>GDPR (EU):</strong> Right to access, rectify, erase, restrict processing, data portability, and object</li>
              <li><strong>CCPA (California):</strong> Right to know, delete, opt-out of sale, and non-discrimination</li>
              <li><strong>LGPD (Brazil):</strong> Right to confirmation, access, correction, anonymization, and data portability</li>
            </ul>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
          </section>

          <section>
            <h2>7. Third-Party Services</h2>
            <p>We may use third-party services for analytics, hosting, and communication. These services have their own privacy policies and we encourage you to review them.</p>
          </section>

          <section>
            <h2>8. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data. However, no method of electronic transmission or storage is 100% secure.</p>
          </section>

          <section>
            <h2>9. Children's Privacy</h2>
            <p>Our services are not directed to individuals under 16. We do not knowingly collect personal data from children.</p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or wish to exercise your data protection rights, contact us at:</p>
            <p className="font-medium text-foreground">hello@unboundhq.com</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
