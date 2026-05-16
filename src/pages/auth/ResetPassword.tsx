import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import unboundLogo from "@/assets/unbound-logo.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Set new password | Unbound Solutions";

    // Supabase recovery link sets a session via hash params automatically.
    // We just confirm a session exists before allowing password change.
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      setReady(!!data.session);
    };
    check();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. Please sign in again.");
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background mesh-bg px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={unboundLogo} alt="Unbound" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Set a new password</h1>
              <p className="text-xs text-muted-foreground">
                Choose a strong password you haven't used before
              </p>
            </div>
          </div>

          {!ready ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Validating reset link… If this takes more than a few seconds, request a new link from the
              <Link to="/forgot-password" className="text-primary hover:underline ml-1">
                forgot password
              </Link>{" "}
              page.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                <ShieldCheck className="w-4 h-4" /> Update password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
