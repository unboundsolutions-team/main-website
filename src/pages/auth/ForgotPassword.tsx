import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
import unboundLogo from "@/assets/unbound-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Forgot password | Unbound Solutions";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("Check your email for the reset link");
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
              <h1 className="text-xl font-bold tracking-tight">Reset your password</h1>
              <p className="text-xs text-muted-foreground">
                We'll email you a secure reset link
              </p>
            </div>
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MailCheck className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-semibold mb-2">Check your inbox</h2>
              <p className="text-sm text-muted-foreground">
                If an account exists for <strong>{email}</strong>, a password reset
                link has been sent. The link expires in 1 hour.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                Send reset link
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
