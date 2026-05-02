export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "dsgvo-compliant-websites",
    title: "DSGVO-Compliant Websites: What Indian IT Companies Must Know",
    excerpt:
      "Working with German clients? Everything you need to implement DSGVO (GDPR) compliance — from cookie banners to data processing agreements.",
    category: "Compliance",
    readTime: "7 min read",
    date: "May 2026",
    author: "Unbound Solutions",
    tags: ["DSGVO", "GDPR", "Compliance", "Germany"],
  },
  {
    slug: "german-clients-bridge",
    title: "Bridging India & Germany: How We Deliver for German Clients",
    excerpt:
      "Why most India–Germany partnerships fail, and how a dual-market team with built-in compliance, German-language capability, and structured delivery changes the equation.",
    category: "Web Development",
    readTime: "8 min read",
    date: "May 2026",
    author: "Unbound Solutions",
    tags: ["Germany", "Partnerships", "DSGVO", "Process"],
  },
];
