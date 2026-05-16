import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent from "@/components/blog/BlogContent";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowLeft, ArrowRight, Loader2, Share2 } from "lucide-react";

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  author: string;
  tags: string[];
  created_at: string;
}

const DynamicBlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    setBlog(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (!data) {
        setNotFound(true);
      } else {
        setBlog(data as Blog);
        document.title = `${data.title} | Unbound Solutions`;
        const meta =
          document.querySelector('meta[name="description"]') ||
          Object.assign(document.createElement("meta"), { name: "description" });
        meta.setAttribute("content", data.excerpt);
        if (!meta.parentElement) document.head.appendChild(meta);

        const { data: more } = await supabase
          .from("blogs")
          .select("*")
          .eq("published", true)
          .neq("slug", slug)
          .order("created_at", { ascending: false })
          .limit(2);
        setRelated((more as Blog[]) ?? []);
      }
      setLoading(false);
    })();
  }, [slug]);

  const handleShare = async () => {
    if (!blog) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, text: blog.excerpt, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20 container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blogs" className="text-primary font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
          <div className="absolute inset-0 mesh-bg opacity-60 pointer-events-none" />
          <div className="relative container mx-auto px-6 py-14 md:py-24 max-w-7xl">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary mb-10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest px-5 py-2 rounded-full bg-primary text-primary-foreground">
                {blog.category}
              </span>
              {blog.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-semibold uppercase tracking-widest px-5 py-2 rounded-full bg-muted/70 text-muted-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="max-w-6xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04] mb-7 text-balance">
              {blog.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-5xl">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 mt-14 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {blog.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="font-medium text-foreground">{blog.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {blog.read_time}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <article className="container mx-auto px-6 max-w-7xl py-14 md:py-20">
          <div className="w-full">
            <BlogContent html={blog.content} />
          </div>

          {/* Tag footer */}
          {blog.tags.length > 0 && (
            <div className="w-full mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
                  Tagged:
                </span>
                {blog.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author card */}
          <div className="w-full mt-10 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5 shadow-soft">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-base font-bold shrink-0">
              {blog.author
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                Written by
              </div>
              <h3 className="text-lg font-bold mb-1">{blog.author}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-service digital partner delivering compliant, conversion-focused websites and
                Shopify storefronts for teams operating across India and Germany.
              </p>
            </div>
          </div>
        </article>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="container mx-auto px-6 max-w-7xl py-12 md:py-16 border-t border-border">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Keep reading</h2>
              <Link
                to="/blog"
                className="text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                All articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-b border-border flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_70%)]" />
                    <span className="relative text-4xl font-black text-primary/30 tracking-tight px-6 text-center">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                      {p.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{p.excerpt}</p>
                    <span className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="container mx-auto px-6 max-w-7xl mt-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-12 text-center shadow-card">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)] pointer-events-none" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Need help with your next project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                We build compliant, high-converting websites and Shopify stores for teams across
                India and Germany.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Start a conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DynamicBlogPost;
