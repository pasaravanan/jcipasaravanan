import { useEffect, useState } from "react";
import { Images, Eye, Instagram, Clock } from "lucide-react";
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
    { label: "Total Gallery Images", value: stats.total, icon: Images, color: "bg-blue-500" },
    { label: "Active Images", value: stats.active, icon: Eye, color: "bg-green-500" },
    { label: "Instagram Posts", value: stats.insta, icon: Instagram, color: "bg-pink-500" },
    { label: "Last Upload", value: fmtDate(stats.lastDate), icon: Clock, color: "bg-amber-500" },
  ];

  return (
    <AdminLayout>
      <h1 className="mb-6 font-display text-2xl font-bold text-navy">Overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className={`mb-3 inline-flex rounded-lg p-2.5 text-white ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-navy">{c.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}