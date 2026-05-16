import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LegalLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const LegalLayout = ({ title, description, children }: LegalLayoutProps) => {
  useEffect(() => {
    document.title = `${title} | Unbound Solutions`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-20">
        <section className="container mx-auto px-6 max-w-5xl">
          <div className="py-10 md:py-16 border-b border-border mb-10">
            <span className="section-badge mb-6">Legal</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{title}</h1>
            <p className="text-sm text-muted-foreground mb-3">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {description}
              </p>
            )}
          </div>

          <div
            className="
              prose prose-base max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:my-5
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:pl-5 prose-ul:space-y-2 prose-li:text-foreground/80 prose-li:marker:text-primary
            "
          >
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
