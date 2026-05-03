import { ArrowUpRight, ShoppingBag, FileText, TrendingUp } from "lucide-react";

const products = [
  {
    icon: ShoppingBag,
    name: "Shopify Auditor",
    tagline: "Enterprise-grade audits, in seconds.",
    description:
      "Analyze your Shopify store's performance across India's mobile network conditions and estimate real revenue leakage with an actionable, data-driven report.",
    href: "https://rupeleaks.unboundsolutions.in/",
    accent: "from-primary/20 to-accent/10",
  },
  {
    icon: FileText,
    name: "PDF Tools",
    tagline: "Privacy-first document tools.",
    description:
      "Merge, split, compress and convert PDFs without ever uploading to a server. No accounts, no logs, no storage — your files remain completely yours.",
    href: "https://pdftools.unboundsolutions.in/",
    accent: "from-accent/20 to-primary/10",
  },
  {
    icon: TrendingUp,
    name: "SIP Calculator",
    tagline: "Plan your full financial lifecycle.",
    description:
      "A comprehensive planner combining SIP, SWP and lifecycle modelling — so you can map the journey from growth to retirement in one place.",
    href: "https://sip.unboundsolutions.in/",
    accent: "from-primary/15 to-accent/15",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="section-badge mb-4">Our Products</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Tools we built, <span className="gradient-text">free for you to use</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A growing suite of in-house products that solve the real problems we kept seeing across
            our client work — fast, focused and built with privacy in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${product.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <product.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-primary/80 mb-4">{product.tagline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Try it free
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
