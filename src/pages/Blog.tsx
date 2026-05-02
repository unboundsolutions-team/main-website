import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blogs";
import { useEffect } from "react";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Unbound Solutions — Insights on Web, Compliance & Design";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Read insights from Unbound Solutions on DSGVO/GDPR compliance, web development for German clients, and modern digital strategy.",
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Header */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              The Unbound Blog
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Insights on{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                web, compliance & design
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Practical articles for businesses working across India and Germany — covering DSGVO/GDPR
              compliance, dual-market delivery, and the craft of building reliable digital products.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section className="container mx-auto px-6 mb-16">
          <Link
            to={`/blogs/${BLOG_POSTS[0].slug}`}
            className="group block rounded-3xl border border-border bg-card hover:border-primary/40 transition-all duration-300 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="relative aspect-[4/3] md:aspect-auto rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.25),transparent_60%)]" />
                <span className="relative text-7xl md:text-8xl font-black text-primary/30 tracking-tight">
                  DSGVO
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                  <span>Featured</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{BLOG_POSTS[0].category}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" /> {BLOG_POSTS[0].author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {BLOG_POSTS[0].date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {BLOG_POSTS[0].readTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* All posts */}
        <section className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">All articles</h2>
            <span className="text-sm text-muted-foreground">
              {BLOG_POSTS.length} {BLOG_POSTS.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blogs/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-b border-border flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_70%)]" />
                  <span className="relative text-5xl font-black text-primary/30 tracking-tight px-6 text-center">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
