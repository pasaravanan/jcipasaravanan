import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, ArrowLeft, Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL } from "@/hooks/useAdmin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user.email?.toLowerCase() === ADMIN_EMAIL) {
        navigate("/admin/dashboard", { replace: true });
      }
    });
  }, [navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setSubmitting(false);
      return;
    }
    if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      toast.error("Access denied. Only the authorized admin can log in.");
      setSubmitting(false);
      return;
    }
    toast.success("Welcome back, Admin");
    navigate("/admin/dashboard");
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 relative"
      style={{
        background: "linear-gradient(135deg, #0c142c 0%, #17244a 55%, #1d1236 100%)",
      }}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-mesh-dots opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div
        className="w-full max-w-md rounded-3xl bg-white p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] relative z-10"
        style={{
          border: "1px solid rgba(255,255,255,0.8)",
        }}
      >
        {/* Back home link */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-[hsl(38,71%,42%)] transition mb-6"
        >
          <ArrowLeft size={13} /> Back to Website
        </a>

        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(201,146,42,0.12) 0%, rgba(201,146,42,0.04) 100%)",
              border: "1.5px solid rgba(201,146,42,0.25)",
            }}
          >
            <Lock className="h-6 w-6 text-[hsl(38,71%,42%)]" />
          </div>
          <h1 className="font-display text-2xl font-normal text-neutral-900">Admin Login</h1>
          <p className="mt-1 text-xs text-neutral-400 uppercase tracking-widest font-semibold">
            Authorized Access Only
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-amber-600 focus:bg-white transition"
              placeholder="admin@email.com"
            />
          </div>
          
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-amber-600 focus:bg-white transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full py-3.5 border-none mt-2"
            style={{
              background: "linear-gradient(135deg, hsl(38,71%,47%), hsl(38,78%,56%))",
              color: "hsl(222,68%,15%)",
            }}
          >
            {submitting ? "Signing in…" : "Login Securely"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-center items-center gap-1.5 text-[11px] text-neutral-400">
          <Key size={12} />
          <span>Sessions are securely encrypted.</span>
        </div>
      </div>
    </div>
  );
}