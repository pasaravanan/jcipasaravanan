import { useEffect, useState } from "react";
import { Trash2, GripVertical, Info, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

type Embed = { id: string; post_url: string; is_active: boolean; display_order: number };

function Row({ item, onToggle, onDelete }: { item: Embed; onToggle: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground">
        <GripVertical className="h-5 w-5" />
      </button>
      <a href={item.post_url} target="_blank" rel="noreferrer" className="flex flex-1 items-center gap-1 truncate text-sm text-primary hover:underline">
        {item.post_url} <ExternalLink className="h-3 w-3" />
      </a>
      <label className="flex cursor-pointer items-center gap-2 text-xs">
        <input type="checkbox" checked={item.is_active} onChange={onToggle} className="h-4 w-4" />
        Active
      </label>
      <button onClick={onDelete} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}

export default function AdminInstagram() {
  const [items, setItems] = useState<Embed[]>([]);
  const [url, setUrl] = useState("");
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const load = async () => {
    const { data } = await supabase
      .from("instagram_embeds").select("*").order("display_order", { ascending: true });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const addPost = async () => {
    if (!/instagram\.com\/(p|reel)\//.test(url)) {
      toast.error("Please enter a valid Instagram post URL");
      return;
    }
    const { error } = await supabase.from("instagram_embeds").insert({
      post_url: url, display_order: items.length + 1, is_active: true,
    });
    if (error) toast.error(error.message);
    else { toast.success("Instagram post added"); setUrl(""); load(); }
  };

  const toggleActive = async (it: Embed) => {
    const { error } = await supabase.from("instagram_embeds").update({ is_active: !it.is_active }).eq("id", it.id);
    if (error) toast.error(error.message);
    else { toast.success(`Post ${!it.is_active ? "shown" : "hidden"}`); load(); }
  };

  const del = async () => {
    if (!confirmDel) return;
    const { error } = await supabase.from("instagram_embeds").delete().eq("id", confirmDel);
    if (error) toast.error(error.message);
    else { toast.success("Post deleted"); setConfirmDel(null); load(); }
  };

  const onDragEnd = async (e: any) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldI = items.findIndex((i) => i.id === active.id);
    const newI = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldI, newI);
    setItems(reordered);
    // Persist new order
    await Promise.all(
      reordered.map((it, idx) =>
        supabase.from("instagram_embeds").update({ display_order: idx + 1 }).eq("id", it.id),
      ),
    );
    toast.success("Order updated");
  };

  return (
    <AdminLayout>
      <h1 className="mb-6 font-display text-2xl font-bold text-navy">Manage Instagram Posts</h1>

      <div className="mb-6 flex gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
        <Info className="h-5 w-5 flex-shrink-0" />
        <p>
          To get an Instagram post URL: open the post on Instagram, tap the three dots menu, and select Copy Link. Then paste the full URL below.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Instagram post URL (e.g., https://www.instagram.com/p/ABC123/)"
          className="flex-1 rounded-lg border px-3 py-2"
        />
        <button onClick={addPost} className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground">
          Add Post
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((it) => (
              <Row key={it.id} item={it} onToggle={() => toggleActive(it)} onDelete={() => setConfirmDel(it.id)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">No Instagram posts added yet.</p>
      )}

      {confirmDel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6">
            <h3 className="font-display text-lg font-semibold">Delete Instagram post?</h3>
            <p className="text-sm text-muted-foreground">This will remove it from the public feed.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDel(null)} className="flex-1 rounded-lg border py-2">Cancel</button>
              <button onClick={del} className="flex-1 rounded-lg bg-red-600 py-2 font-medium text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}