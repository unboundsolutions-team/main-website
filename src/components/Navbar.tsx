import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoFull from "@/assets/logo-full.png";

type NavLink = { label: string; href: string; type: "route" | "anchor" };
const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Divisions", href: "/#divisions", type: "anchor" },
  { label: "Services", href: "/#services", type: "anchor" },
  { label: "Products", href: "/#products", type: "anchor" },
  { label: "Blogs", href: "/blogs", type: "route" },
  { label: "About", href: "/about", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLink = (link: NavLink, onClick?: () => void, className?: string) => {
    if (link.type === "route") {
      return (
        <Link key={link.href} to={link.href} onClick={onClick} className={className}>
          {link.label}
        </Link>
      );
    }
    // Anchor link → if on home, plain anchor for smooth scroll; otherwise navigate to /#anchor
    const isOnHome = location.pathname === "/";
    if (isOnHome) {
      const hash = link.href.replace("/", "");
      return (
        <a key={link.href} href={hash} onClick={onClick} className={className}>
          {link.label}
        </a>
      );
    }
    return (
      <Link key={link.href} to={link.href} onClick={onClick} className={className}>
        {link.label}
      </Link>
    );
  };
  const desktopLinkClass =
    "text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all duration-300 text-sm font-medium px-4 py-2 rounded-full relative group";
  const mobileLinkClass =
    "text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 text-sm font-medium py-3 px-4 rounded-xl";
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      style={{ contain: "layout" }}>

      {/* Floating center-aligned navbar */}
      <div
        className={`flex items-center gap-2 transition-all duration-500 ${isScrolled
          ? "bg-background/80 backdrop-blur-2xl border border-border/50 shadow-lg rounded-full px-3 py-2"
          : "bg-background/40 backdrop-blur-xl border border-border/30 rounded-full px-3 py-2"
          }`}
      >
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity px-3">
          <img
            src={logoFull}
            alt="Unbound Solutions Logo"
            className="h-10 w-auto"
          />
        </Link>
        {/* Desktop Navigation - Center Links */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center bg-muted/50 rounded-full px-1 py-1">
            {navLinks.map((link) => renderLink(link, undefined, desktopLinkClass))}
          </div>
        </div>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center gap-2 ml-2">


          <Link to="/contact" className="btn-primary text-sm !py-2 !px-4">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-2 rounded-full hover:bg-muted transition-colors">

            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen &&
        <div className="md:hidden fixed top-20 left-4 right-4 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-xl animate-fade-in overflow-hidden">
          <div className="p-4 flex flex-col gap-2">
            {navLinks.map((link) =>
              renderLink(link, () => setIsOpen(false), mobileLinkClass)
            )}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-center mt-2">

              Get Started
            </Link>
          </div>
        </div>
      }
    </nav>);

};

export default Navbar;
