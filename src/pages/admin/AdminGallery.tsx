import { useEffect, useMemo, useState } from "react";
import { Edit2, Eye, EyeOff, Trash2, X, Play, Search, ArrowUpDown } from "lucide-react";
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
      toast.success(p.is_active ? "Media hidden from gallery" : "Media visible on gallery");
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
      toast.success("Media updated");
      setEditing(null);
      load();
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      const isVideo = deleting.image_url.includes("/video/upload/") || deleting.image_url.match(/\.(mp4|webm|ogg|mov)($|\?)/i);
      await destroyOnCloudinary(deleting.public_id, isVideo ? "video" : "image");
    } catch (e: any) {
      console.warn("Cloudinary delete failed:", e.message);
    }
    const { error } = await supabase.from("gallery_posts").delete().eq("id", deleting.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Media deleted successfully");
      setDeleting(null);
      load();
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-normal text-[hsl(222,68%,17%)]">Manage Gallery</h1>
        <p className="text-sm text-neutral-500 mt-1">Search, sort, hide/show, or delete public gallery media files.</p>
      </div>

      {/* Filter and search bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row items-center bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            placeholder="Search by caption..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-amber-600 focus:bg-white transition"
          />
        </div>
        <div className="relative w-full sm:w-52 flex items-center">
          <ArrowUpDown className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-amber-600 focus:bg-white transition"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="category">Category A-Z</option>
          </select>
        </div>
      </div>

      {/* Gallery posts cards list */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const isVideo = p.image_url.includes("/video/upload/") || p.image_url.match(/\.(mp4|webm|ogg|mov)($|\?)/i);
          return (
            <div key={p.id} className="overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100 flex flex-col">
              <div className="relative aspect-[4/3] bg-neutral-100">
                <img
                  src={cldThumb(p.image_url, 500)}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full object-cover transition-opacity duration-300 ${!p.is_active ? "opacity-35" : ""}`}
                />
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur">
                      <Play className="h-5 w-5 fill-white" />
                    </div>
                  </div>
                )}
                {!p.is_active && (
                  <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">Hidden</span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className={`line-clamp-2 text-sm leading-relaxed ${p.caption ? "text-neutral-700" : "italic text-neutral-400"}`}>
                  {p.caption || "No description provided"}
                </p>
                <div className="mt-auto pt-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px] border-t pt-3 border-neutral-50">
                    <span className="rounded-full bg-[hsl(222,68%,22%)]/10 px-3 py-0.5 font-semibold text-[hsl(222,68%,22%)]">{p.category}</span>
                    <span className="text-neutral-400 font-semibold">{fmtDate(p.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                      <span className={`h-2.5 w-2.5 rounded-full ${p.is_active ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                      <span>{p.is_active ? "Active on site" : "Hidden"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setEditing(p)} className="flex-1 rounded-xl border border-neutral-200 py-2 hover:bg-neutral-50 transition text-neutral-600" title="Edit Post">
                      <Edit2 className="mx-auto h-4 w-4" />
                    </button>
                    <button onClick={() => toggleVisible(p)} className="flex-1 rounded-xl border border-neutral-200 py-2 hover:bg-neutral-50 transition text-neutral-600" title={p.is_active ? "Hide Post" : "Show Post"}>
                      {p.is_active ? <EyeOff className="mx-auto h-4 w-4" /> : <Eye className="mx-auto h-4 w-4" />}
                    </button>
                    <button onClick={() => setDeleting(p)} className="flex-1 rounded-xl border border-red-200 py-2 text-red-500 hover:bg-red-50 transition" title="Delete Post">
                      <Trash2 className="mx-auto h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-neutral-400 border border-dashed rounded-2xl bg-white">No media records match your criteria.</p>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)} title="Edit Media Metadata">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Caption</label>
              <input
                value={editing.caption || ""}
                onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
                placeholder="Caption"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs outline-none focus:border-amber-600 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={editing.category || "General"}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs outline-none focus:border-amber-600 focus:bg-white transition"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setEditing(null)} className="flex-1 rounded-xl border py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:bg-neutral-50 transition">Cancel</button>
              <button onClick={saveEdit} className="flex-1 rounded-xl bg-[hsl(222,68%,17%)] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-navy transition">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {deleting && (
        <Modal onClose={() => setDeleting(null)} title="Confirm Delete">
          <p className="text-sm leading-relaxed text-neutral-500">Are you sure you want to permanently delete this media file from Cloudinary and Supabase databases? This action is irreversible.</p>
          <div className="flex gap-2 pt-3">
            <button onClick={() => setDeleting(null)} className="flex-1 rounded-xl border py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:bg-neutral-50 transition">Cancel</button>
            <button onClick={confirmDelete} className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition">Confirm Delete</button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs" onClick={onClose}>
      <div className="w-full max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-2xl border border-neutral-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b pb-3 border-neutral-50">
          <h3 className="font-display text-lg font-normal text-neutral-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600 transition"><X className="h-4.5 w-4.5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}