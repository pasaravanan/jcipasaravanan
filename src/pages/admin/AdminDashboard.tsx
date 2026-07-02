import { useEffect, useState } from "react";
import { Images, Eye, Instagram, Clock, ShieldAlert } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, insta: 0, lastDate: null as string | null });

  useEffect(() => {
    (async () => {
      const [{ count: total }, { count: active }, { count: insta }, { data: latest }] = await Promise.all([
        supabase.from("gallery_posts").select("*", { count: "exact", head: true }),
        supabase.from("gallery_posts").select("*", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("instagram_embeds").select("*", { count: "exact", head: true }),
        supabase.from("gallery_posts").select("created_at").order("created_at", { ascending: false }).limit(1).maybeSingle(),
      ]);
      setStats({
        total: total || 0,
        active: active || 0,
        insta: insta || 0,
        lastDate: latest?.created_at || null,
      });
    })();
  }, []);

  const cards = [
    {
      label: "Total Gallery Images",
      value: stats.total,
      icon: Images,
      color: "hsl(222,68%,22%)",
      bg: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
      border: "rgba(99,102,241,0.2)",
    },
    {
      label: "Active Images",
      value: stats.active,
      icon: Eye,
      color: "hsl(170,72%,28%)",
      bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
      border: "rgba(16,185,129,0.2)",
    },
    {
      label: "Instagram Posts",
      value: stats.insta,
      icon: Instagram,
      color: "hsl(340,82%,52%)",
      bg: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
      border: "rgba(236,72,153,0.2)",
    },
    {
      label: "Last Upload",
      value: fmtDate(stats.lastDate),
      icon: Clock,
      color: "hsl(38,71%,42%)",
      bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      border: "rgba(245,158,11,0.2)",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-normal text-[hsl(222,68%,17%)]">Dashboard Overview</h1>
        <p className="text-sm text-neutral-500 mt-1">Real-time statistics of your site's gallery and integrated feeds.</p>
      </div>

      {/* Colorful Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              boxShadow: "0 4px 20px rgba(12,30,74,0.04)",
            }}
          >
            <div
              className="mb-4 inline-flex rounded-xl p-2.5 bg-white shadow-sm"
              style={{ border: `1px solid ${c.border}` }}
            >
              <c.icon className="h-5 w-5" style={{ color: c.color }} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{c.label}</p>
            <p className="mt-1 font-display text-2xl font-normal text-neutral-900">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Important Alert Box for Instagram Token management */}
      <div
        className="rounded-2xl p-6 border bg-white shadow-sm"
        style={{ borderColor: "rgba(201,146,42,0.25)" }}
      >
        <div className="flex gap-4 items-start">
          <div className="rounded-xl p-2 bg-amber-50 shrink-0">
            <ShieldAlert className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-display text-lg font-normal text-neutral-900">Instagram Access Token Advisory</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Your site fetches Instagram feeds using Meta access tokens. Short-lived tokens expire in 2 hours, and long-lived tokens expire in 60 days. To ensure uninterrupted service, exchange your short-lived token for a long-lived (60-day) token, and store it in your Supabase Dashboard database configuration.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/admin/instagram"
                className="inline-flex items-center rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-700 transition"
              >
                Go to Instagram Setup
              </a>
              <a
                href="https://developers.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border border-neutral-200 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:bg-neutral-50 transition"
              >
                Meta Developer Console
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}