import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ListPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  imageUrl?: string;
}

const getFirstImageFromHtml = (html?: string) => {
  if (!html || typeof window === "undefined") return undefined;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.querySelector("img")?.getAttribute("src") || undefined;
};

const Blog = () => {
  const [posts, setPosts] = useState<ListPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("slug, title, excerpt, content, category, read_time, author, tags, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPosts(
          data.map((d) => ({
            slug: d.slug,
            title: d.title,
            excerpt: d.excerpt,
            category: d.category,
            readTime: d.read_time,
            date: new Date(d.created_at).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }),
            author: d.author,
            tags: d.tags ?? [],
            imageUrl: getFirstImageFromHtml(d.content),
          })),
        );
      }
      setLoading(false);
    })();
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Header */}
        <section className="container mx-auto px-6 mb-16 max-w-7xl">
          <div className="max-w-4xl">
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

        {loading && (
          <div className="container mx-auto px-6 mb-8 text-center">
            <Loader2 className="w-5 h-5 animate-spin inline text-primary" />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="container mx-auto px-6 mb-8 text-center text-muted-foreground">
            No articles published yet — check back soon.
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <section className="container mx-auto px-6 mb-16">
            <Link
              to={`/blog/${featured.slug}`}
              className="group block rounded-3xl border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-card"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                <div className="relative aspect-[4/3] md:aspect-auto rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 flex items-center justify-center overflow-hidden">
                  {featured.imageUrl ? (
                    <img
                      src={featured.imageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.25),transparent_60%)]" />
                      <span className="relative text-5xl md:text-6xl font-black text-primary/30 tracking-tight px-6 text-center">
                        {featured.category}
                      </span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                    <span>Featured</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{featured.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" /> {featured.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* All posts */}
        {rest.length > 0 && (
          <section className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">All articles</h2>
              <span className="text-sm text-muted-foreground">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-b border-border flex items-center justify-center overflow-hidden">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_70%)]" />
                        <span className="relative text-4xl font-black text-primary/30 tracking-tight px-6 text-center">
                          {post.category}
                        </span>
                      </>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
