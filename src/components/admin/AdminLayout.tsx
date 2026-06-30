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
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - desktop */}
      <aside className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="border-b px-6 py-5">
          <h1 className="font-display text-xl font-bold text-navy">Admin Panel</h1>
          <p className="mt-1 truncate text-xs text-muted-foreground">{session?.user.email}</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white p-4">
            <button onClick={() => setOpen(false)} className="mb-4">
              <X className="h-5 w-5" />
            </button>
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-primary text-primary-foreground" : "text-slate-700"
                  }`
                }
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </NavLink>
            ))}
            <button
              onClick={logout}
              className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-display text-lg font-semibold text-navy">Admin Dashboard</h2>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-sm text-muted-foreground">{session?.user.email}</span>
            <button
              onClick={logout}
              className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}