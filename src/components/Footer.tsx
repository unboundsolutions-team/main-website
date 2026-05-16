import { Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import unboundLogo from "@/assets/unbound-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isOnHome = location.pathname === "/";

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
      { label: "Shopify Auditor", href: "/#products" },
      { label: "PDF Tools", href: "/#products" },
      { label: "SIP Calculator", href: "/#products" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/#" },
      { label: "Blogs", href: "/blogs" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Imprint", href: "/imprint" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://in.linkedin.com/company/unboundsolutions4", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/unboundsolutions.in/", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const renderLink = (link: { label: string; href: string }) => {
    const isAnchorOnHome = link.href.startsWith("/#");
    if (isAnchorOnHome && isOnHome) {
      return (
        <a
          href={link.href.replace("/", "")}
          className="text-muted-foreground hover:text-primary transition-colors text-sm"
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link
        to={link.href}
        className="text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        {link.label}
      </Link>

    );
  };

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
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Unbound. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
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
