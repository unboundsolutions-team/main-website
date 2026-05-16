import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Loader2, Share2 } from "lucide-react";

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
          <Link to="/blog" className="text-primary font-semibold inline-flex items-center gap-2">
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
          <div className="relative container mx-auto px-6 py-14 md:py-20 max-w-4xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-primary-foreground">
                {blog.category}
              </span>
              {blog.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-balance">
              {blog.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 mt-10 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
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
        <article className="container mx-auto px-6 max-w-3xl py-12 md:py-16">
          <div
            className="
              prose prose-base md:prose-lg max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:scroll-mt-28
              prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mt-0 prose-h1:mb-6
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
              prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-3
              prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-2
              prose-h5:text-base prose-h5:font-semibold prose-h5:mt-6 prose-h5:mb-2
              prose-h6:text-sm prose-h6:uppercase prose-h6:tracking-widest prose-h6:text-muted-foreground prose-h6:mt-6 prose-h6:mb-2
              prose-p:text-foreground/85 prose-p:leading-[1.8] prose-p:my-5
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-em:text-foreground/90
              prose-ul:my-5 prose-ul:pl-6 prose-ul:space-y-2
              prose-ol:my-5 prose-ol:pl-6 prose-ol:space-y-2
              prose-li:text-foreground/85 prose-li:leading-relaxed prose-li:marker:text-primary
              prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:my-8 prose-blockquote:text-foreground prose-blockquote:font-medium
              prose-img:rounded-2xl prose-img:shadow-card prose-img:border prose-img:border-border prose-img:my-8 prose-img:w-full
              prose-figure:my-8 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:mt-2
              prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:font-mono prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-5 prose-pre:my-6 prose-pre:overflow-x-auto prose-pre:shadow-soft
              prose-pre:[&_code]:bg-transparent prose-pre:[&_code]:p-0 prose-pre:[&_code]:text-foreground
              prose-hr:my-12 prose-hr:border-border
              prose-table:my-8 prose-table:w-full prose-table:border-collapse prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-border prose-table:text-sm
              prose-thead:bg-muted/60
              prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-th:border-b prose-th:border-border
              prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-border/60 prose-td:text-foreground/85
              [&_table]:block [&_table]:overflow-x-auto
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tag footer */}
          {blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
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
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5 shadow-soft">
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
          <section className="container mx-auto px-6 max-w-5xl py-12 md:py-16 border-t border-border">
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
        <section className="container mx-auto px-6 max-w-4xl mt-8">
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
