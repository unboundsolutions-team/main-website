import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Loader2, Plus, Pencil, Trash2, LogOut, ExternalLink, Search,
  FileText, CheckCircle2, FileEdit,
} from "lucide-react";
import RichEditor from "@/components/admin/RichEditor";
import unboundLogo from "@/assets/unbound-logo.png";

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
  published: boolean;
  created_at: string;
  updated_at: string;
}

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "General",
  read_time: "5 min read",
  author: "Unbound Solutions",
  tags: "",
  published: true,
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAdmin();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [fetching, setFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Admin Dashboard | Unbound Solutions";
  }, []);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/login", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const load = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setBlogs((data ?? []) as Blog[]);
    setFetching(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.published).length;
    return { total, published, drafts: total - published };
  }, [blogs]);

  const filtered = useMemo(() => {
    if (!search.trim()) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
  }, [blogs, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditing(blog);
    setForm({
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      read_time: blog.read_time,
      author: blog.author,
      tags: blog.tags.join(", "),
      published: blog.published,
    });
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.excerpt.trim()) return toast.error("Excerpt is required");
    if (!form.content.trim() || form.content === "<p></p>")
      return toast.error("Content is required");

    setSaving(true);
    const payload = {
      slug: form.slug.trim() || slugify(form.title),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      category: form.category.trim() || "General",
      read_time: form.read_time.trim() || "5 min read",
      author: form.author.trim() || "Unbound Solutions",
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: form.published,
    };

    const { error } = editing
      ? await supabase.from("blogs").update(payload).eq("id", editing.id)
      : await supabase.from("blogs").insert(payload);

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing ? "Blog updated" : "Blog created");
    setOpen(false);
    load();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("blogs").delete().eq("id", deleteId);
    if (error) toast.error(error.message);
    else {
      toast.success("Blog deleted");
      load();
    }
    setDeleteId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={unboundLogo} alt="Unbound" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight">Admin</p>
              <p className="text-[11px] text-muted-foreground leading-tight">
                Content management
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-muted-foreground mr-2">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/blog">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View blog</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Hero */}
        <div className="mb-10">
          <div className="section-badge mb-4">
            <span>Blog management</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Welcome back, admin
          </h1>
          <p className="text-muted-foreground">
            Create, edit and publish articles for the Unbound Solutions blog.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard icon={FileText} label="Total posts" value={stats.total} />
          <StatCard icon={CheckCircle2} label="Published" value={stats.published} accent />
          <StatCard icon={FileEdit} label="Drafts" value={stats.drafts} />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, slug, category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={openCreate} className="btn-primary !py-2 !px-5 !rounded-xl">
            <Plus className="w-4 h-4" /> New post
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Slug</TableHead>
                <TableHead className="hidden lg:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetching ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Loader2 className="w-5 h-5 animate-spin inline text-primary" />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    {search ? "No posts match your search." : "No blog posts yet — click 'New post' to create one."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((b) => (
                  <TableRow key={b.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium max-w-xs truncate">{b.title}</TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                      {b.slug}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {b.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          b.published
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {b.published ? "Published" : "Draft"}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                      {new Date(b.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/blog/${b.slug}`} target="_blank" aria-label="Preview">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => openEdit(b)} aria-label="Edit">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(b.id)}
                          className="text-destructive hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Editor dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit blog post" : "New blog post"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update your post and save changes."
                : "Compose a new article. Toggle the publish switch to make it live."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="A clear, search-friendly title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL slug</Label>
                <Input
                  id="slug"
                  placeholder="auto-generated from title"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="read_time">Read time</Label>
                <Input
                  id="read_time"
                  value={form.read_time}
                  onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="DSGVO, Compliance, Germany"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                required
                placeholder="One- or two-sentence summary shown on the blog listing."
              />
            </div>

            <div className="space-y-2">
              <Label>Content *</Label>
              <RichEditor
                value={form.content}
                onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
              />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border">
              <Switch
                id="published"
                checked={form.published}
                onCheckedChange={(v) => setForm({ ...form, published: v })}
              />
              <div>
                <Label htmlFor="published" className="cursor-pointer">
                  {form.published ? "Published" : "Draft"}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {form.published
                    ? "Visible to all visitors on the blog page."
                    : "Saved privately, not shown publicly."}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Save changes" : "Create post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently removed from the database
              and will no longer appear on the public blog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const StatCard = ({
  icon: Icon, label, value, accent,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; accent?: boolean }) => (
  <div className={`rounded-2xl border bg-card p-5 flex items-center gap-4 transition-all hover:shadow-md ${
    accent ? "border-primary/30" : "border-border"
  }`}>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
      accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
    }`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-bold leading-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

export default AdminDashboard;
