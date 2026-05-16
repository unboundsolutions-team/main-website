import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import unboundLogo from "@/assets/unbound-logo.png";

const ADMIN_EMAIL = "admin@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "unb0nd"; // 6 chars, incorporates "unbound"

const Login = () => {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAdmin();

  useEffect(() => {
    document.title = "Sign in | Unbound Solutions";
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const ensureAdminAccount = async () => {
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
    if (!signInErr) return null;

    // Auto-bootstrap default admin on first attempt
    if (email === ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      const { error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (signUpErr) return signUpErr.message;
      const { error: postErr } = await supabase.auth.signInWithPassword({ email, password });
      if (postErr) return postErr.message;
      return null;
    }
    return signInErr.message;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const err = await ensureAdminAccount();
    setBusy(false);
    if (err) {
      toast.error(err);
      return;
    }
    toast.success("Welcome back");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background mesh-bg px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to website
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={unboundLogo} alt="Unbound" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Admin sign in</h1>
              <p className="text-xs text-muted-foreground">Manage your blog content</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full">
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              <Lock className="w-4 h-4" /> Sign in
            </Button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            Restricted area. Authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
