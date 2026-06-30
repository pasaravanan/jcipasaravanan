import { useEffect, useMemo, useState } from "react";
import { Edit2, Eye, EyeOff, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { cldThumb, destroyOnCloudinary } from "@/lib/cloudinary";

type Post = {
  id: string;
  image_url: string;
  public_id: string;
  caption: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
};

const CATEGORIES = ["Events", "Awards", "Client Meetings", "Office", "Family", "General"];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminGallery() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [editing, setEditing] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState<Post | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("gallery_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let arr = posts.filter((p) =>
      !search || p.caption?.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort === "oldest") arr = [...arr].reverse();
    else if (sort === "category") arr = [...arr].sort((a, b) => (a.category || "").localeCompare(b.category || ""));
    return arr;
  }, [posts, search, sort]);

  const toggleVisible = async (p: Post) => {
    const { error } = await supabase
      .from("gallery_posts").update({ is_active: !p.is_active }).eq("id", p.id);
    if (error) toast.error(error.message);
    else {
      toast.success(p.is_active ? "Image hidden from gallery" : "Image visible on gallery");
      load();
    }
  };

  const saveEdit = async () => {
    if (!editing) return;
    const { error } = await supabase
      .from("gallery_posts")
      .update({ caption: editing.caption, category: editing.category })
      .eq("id", editing.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Image updated");
      setEditing(null);
      load();
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await destroyOnCloudinary(deleting.public_id);
    } catch (e: any) {
      console.warn("Cloudinary delete failed:", e.message);
    }
    const { error } = await supabase.from("gallery_posts").delete().eq("id", deleting.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Image deleted successfully");
      setDeleting(null);
      load();
    }
  };

  return (
    <AdminLayout>
      <h1 className="mb-6 font-display text-2xl font-bold text-navy">Manage Gallery</h1>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Search by caption…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border bg-white px-3 py-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="category">Category A-Z</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="relative aspect-[4/3]">
              <img
                src={cldThumb(p.image_url, 500)}
                alt=""
                className={`h-full w-full object-cover ${!p.is_active ? "opacity-40" : ""}`}
              />
              {!p.is_active && (
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">Hidden</span>
              )}
            </div>
            <div className="p-3">
              <p className={`line-clamp-1 text-sm ${p.caption ? "" : "italic text-muted-foreground"}`}>
                {p.caption || "No caption"}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{p.category}</span>
                <span className="text-muted-foreground">{fmtDate(p.created_at)}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className={`h-2 w-2 rounded-full ${p.is_active ? "bg-green-500" : "bg-red-500"}`} />
                <span>{p.is_active ? "Active" : "Hidden"}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditing(p)} className="flex-1 rounded-lg border py-1.5 text-xs hover:bg-slate-50">
                  <Edit2 className="mx-auto h-3.5 w-3.5" />
                </button>
                <button onClick={() => toggleVisible(p)} className="flex-1 rounded-lg border py-1.5 text-xs hover:bg-slate-50">
                  {p.is_active ? <EyeOff className="mx-auto h-3.5 w-3.5" /> : <Eye className="mx-auto h-3.5 w-3.5" />}
                </button>
                <button onClick={() => setDeleting(p)} className="flex-1 rounded-lg border py-1.5 text-xs text-red-600 hover:bg-red-50">
                  <Trash2 className="mx-auto h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title="Edit Image">
          <input
            value={editing.caption || ""}
            onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
            placeholder="Caption"
            className="w-full rounded-lg border px-3 py-2"
          />
          <select
            value={editing.category || "General"}
            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
            className="w-full rounded-lg border bg-white px-3 py-2"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="flex-1 rounded-lg border py-2">Cancel</button>
            <button onClick={saveEdit} className="flex-1 rounded-lg bg-primary py-2 font-medium text-primary-foreground">Save Changes</button>
          </div>
        </Modal>
      )}

      {deleting && (
        <Modal onClose={() => setDeleting(null)} title="Delete Image">
          <p>Are you sure you want to delete this image? This action cannot be undone.</p>
          <div className="flex gap-2">
            <button onClick={() => setDeleting(null)} className="flex-1 rounded-lg border py-2">Cancel</button>
            <button onClick={confirmDelete} className="flex-1 rounded-lg bg-red-600 py-2 font-medium text-white">Delete</button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <button onClick={onClose}><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}