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
        <section className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-sm text-muted-foreground mb-2">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {description && <p className="text-muted-foreground mb-10">{description}</p>}

          <div
            className="
              prose prose-base max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:pl-5 prose-ul:space-y-1.5 prose-li:text-foreground/80 prose-li:marker:text-primary
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
