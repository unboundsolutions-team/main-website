import { Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";
import unboundLogo from "@/assets/unbound-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    divisions: [
      { label: "Unbound Solutions", href: "/#divisions" },
      { label: "Unbound Studios", href: "/#divisions" },
      { label: "Unbound Services", href: "/#divisions" },
    ],
    services: [
      { label: "Web Development", href: "/#services" },
      { label: "E-Commerce", href: "/#services" },
      { label: "Brand Design", href: "/#services" },
      { label: "Cybersecurity", href: "/#services" },
    ],
    products: [
      { label: "Shopify Auditor", href: "/#products", external: false },
      { label: "PDF Tools", href: "/#products", external: false },
      { label: "SIP Calculator", href: "/#products", external: false },
    ],
    company: [
      { label: "About me", href: "/#about" },
      { label: "Contact", href: "/#contact" },
      { label: "Careers", href: "/#" },
      { label: "Blog", href: "/blog" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const renderLink = (link: { label: string; href: string }) =>
    link.href.startsWith("/") && !link.href.includes("#") ? (
      <Link
        to={link.href}
        className="text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        {link.label}
      </Link>
    ) : (
      <a
        href={link.href}
        className="text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        {link.label}
      </a>
    );

  return (
    <footer className="py-16 border-t border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={unboundLogo} alt="Unbound" className="h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              Full-service web development agency specializing in custom websites, Shopify stores,
              UI/UX design, and IT solutions. Trusted by startups and enterprises worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-semibold mb-4">Divisions</h4>
            <ul className="space-y-3">
              {footerLinks.divisions.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="font-semibold mb-4">Our Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Unbound. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <button
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
