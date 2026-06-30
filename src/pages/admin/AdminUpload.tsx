import { useRef, useState } from "react";
import { Upload, X, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { supabase } from "@/integrations/supabase/client";

type Item = {
  id: string;
  file: File;
  preview: string;
  caption: string;
  category: string;
  progress: number;
  status: "idle" | "uploading" | "done" | "error";
};

const CATEGORIES = ["Events", "Awards", "Client Meetings", "Office", "Family", "General"];

export default function AdminUpload() {
  const [items, setItems] = useState<Item[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next: Item[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"))
      .map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        preview: URL.createObjectURL(f),
        caption: "",
        category: "General",
        progress: 0,
        status: "idle",
      }));
    setItems((prev) => [...prev, ...next]);
  };

  const update = (id: string, patch: Partial<Item>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const uploadAll = async () => {
    setUploading(true);
    let success = 0;
    for (const item of items) {
      if (item.status === "done") continue;
      update(item.id, { status: "uploading", progress: 0 });
      try {
        const res = await uploadToCloudinary(item.file, (pct) =>
          update(item.id, { progress: pct }),
        );
        const { error } = await supabase.from("gallery_posts").insert({
          image_url: res.secure_url,
          public_id: res.public_id,
          caption: item.caption || null,
          category: item.category || "General",
        });
        if (error) throw error;
        update(item.id, { status: "done", progress: 100 });
        success++;
      } catch (err: any) {
        update(item.id, { status: "error" });
        toast.error(`Failed: ${item.file.name} — ${err.message || "error"}`);
      }
    }
    toast.success(`${success} of ${items.length} files uploaded successfully`);
    setUploading(false);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.status !== "done")), 1500);
  };

  return (
    <AdminLayout>
      <h1 className="mb-6 font-display text-2xl font-bold text-navy">Upload Files</h1>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-white p-10 text-center transition hover:border-primary hover:bg-primary/5"
      >
        <Upload className="mx-auto mb-3 h-10 w-10 text-primary" />
        <p className="font-medium">Drag and drop images/videos here or click to browse</p>
        <p className="mt-1 text-sm text-muted-foreground">JPG, PNG, WEBP, GIF, MP4, WEBM, MOV</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm,video/ogg,video/quicktime"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <div className="mt-6 space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row">
              {it.file.type.startsWith("video/") ? (
                <video src={it.preview} className="h-24 w-24 rounded-lg object-cover" muted playsInline />
              ) : (
                <img src={it.preview} alt="" className="h-24 w-24 rounded-lg object-cover" />
              )}
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={it.caption}
                  onChange={(e) => update(it.id, { caption: e.target.value })}
                  placeholder="Caption (optional)"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    list={`cat-${it.id}`}
                    value={it.category}
                    onChange={(e) => update(it.id, { category: e.target.value })}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  />
                  <datalist id={`cat-${it.id}`}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                {it.status === "uploading" && (
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${it.progress}%` }}
                    />
                  </div>
                )}
                {it.status === "done" && <p className="text-xs text-green-600">✓ Uploaded</p>}
                {it.status === "error" && <p className="text-xs text-red-600">Upload failed</p>}
              </div>
              <button
                onClick={() => remove(it.id)}
                disabled={uploading}
                className="self-start rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={uploadAll}
            disabled={uploading || items.every((i) => i.status === "done")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow disabled:opacity-50"
          >
            <ImagePlus className="h-4 w-4" />
            {uploading ? "Uploading…" : `Upload All (${items.length} files)`}
          </button>
        </div>
      )}
    </AdminLayout>
  );
}