import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Upload, Images, Instagram, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdmin";
import { toast } from "sonner";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/upload", label: "Upload Images", icon: Upload },
  { to: "/admin/gallery", label: "Manage Gallery", icon: Images },
  { to: "/admin/instagram", label: "Manage Instagram", icon: Instagram },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session } = useAdminSession();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 bg-mesh-dots">
      {/* Sidebar - desktop (Navy-to-dark-blue gradient with gold details) */}
      <aside
        className="hidden w-64 flex-col md:flex shadow-2xl relative"
        style={{
          background: "linear-gradient(180deg, #0c142c 0%, #17244a 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Top brand */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="font-display text-xl font-normal text-white">
            Admin <span className="shine-text">Portal</span>
          </h1>
          <p className="mt-1 truncate text-xs text-white/40">{session?.user.email}</p>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-2.5 p-4">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[hsl(38,71%,47%)] to-[hsl(38,78%,56%)] text-white shadow-lg shadow-yellow-600/10"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <it.icon className="h-4.5 w-4.5" />
              {it.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom logout area */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition duration-200"
          >
            <LogOut className="h-4.5 w-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside
            className="absolute left-0 top-0 h-full w-64 p-5 flex flex-col shadow-2xl z-10"
            style={{ background: "linear-gradient(180deg, #0c142c 0%, #17244a 100%)" }}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-lg text-white">Menu</span>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-white/60 hover:bg-white/5 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-2">
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-gradient-to-r from-[hsl(38,71%,47%)] to-[hsl(38,78%,56%)] text-white shadow"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <it.icon className="h-4.5 w-4.5" />
                  {it.label}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={logout}
              className="mt-auto flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4.5 w-4.5" /> Logout
            </button>
          </aside>
        </div>
      )}

      {/* Main dashboard content container */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <header
          className="flex items-center justify-between px-5 py-4 md:px-8 border-b relative"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(12px)",
            borderColor: "#e8eaf0",
          }}
        >
          <div className="flex items-center gap-3">
            <button className="md:hidden rounded-lg border p-1.5 hover:bg-neutral-50" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5 text-neutral-800" />
            </button>
            <h2 className="font-display text-lg font-normal text-[hsl(222,68%,17%)]">Admin Dashboard</h2>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600">
              {session?.user.email}
            </span>
            <button
              onClick={logout}
              className="rounded-xl border border-neutral-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:bg-neutral-50 transition"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}