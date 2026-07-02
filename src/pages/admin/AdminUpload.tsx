import { useRef, useState } from "react";
import { Upload, X, ImagePlus, FileImage } from "lucide-react";
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
      <div className="mb-8">
        <h1 className="font-display text-3xl font-normal text-[hsl(222,68%,17%)]">Upload Media</h1>
        <p className="text-sm text-neutral-500 mt-1">Upload files directly to the public website gallery.</p>
      </div>

      {/* Drag & drop container */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 bg-white"
        style={{
          borderColor: "rgba(201,146,42,0.3)",
          boxShadow: "0 4px 20px rgba(12,30,74,0.03)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "hsl(38,71%,47%)";
          e.currentTarget.style.backgroundColor = "rgba(201,146,42,0.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(201,146,42,0.3)";
          e.currentTarget.style.backgroundColor = "#fff";
        }}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
          <Upload className="h-6 w-6 text-[hsl(38,71%,42%)]" />
        </div>
        <p className="font-medium text-neutral-800 text-sm">Drag and drop images/videos here or click to browse</p>
        <p className="mt-1.5 text-xs text-neutral-400">JPG, PNG, WEBP, GIF, MP4, WEBM, MOV</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm,video/ogg,video/quicktime"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Pending uploads queue */}
      {items.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Pending Upload Queue</h3>
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row items-center border border-neutral-100"
              >
                {it.file.type.startsWith("video/") ? (
                  <video src={it.preview} className="h-20 w-20 rounded-xl object-cover" muted playsInline />
                ) : (
                  <img src={it.preview} alt="" className="h-20 w-20 rounded-xl object-cover" />
                )}
                
                <div className="flex-1 w-full space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Caption</label>
                      <input
                        type="text"
                        value={it.caption}
                        onChange={(e) => update(it.id, { caption: e.target.value })}
                        placeholder="Add a nice description..."
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs outline-none focus:border-amber-600 focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Category</label>
                      <select
                        value={it.category}
                        onChange={(e) => update(it.id, { category: e.target.value })}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs outline-none focus:border-amber-600 focus:bg-white transition"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {it.status === "uploading" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-neutral-400 font-semibold">
                        <span>Uploading...</span>
                        <span>{it.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full bg-amber-500 transition-all duration-300"
                          style={{ width: `${it.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {it.status === "done" && <p className="text-xs font-semibold text-green-600 flex items-center gap-1">✓ Successfully Uploaded</p>}
                  {it.status === "error" && <p className="text-xs font-semibold text-red-600">⚠ Upload Failed</p>}
                </div>

                <button
                  onClick={() => remove(it.id)}
                  disabled={uploading}
                  className="rounded-xl p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={uploadAll}
            disabled={uploading || items.every((i) => i.status === "done")}
            className="btn-gold w-full border-none py-3.5"
            style={{
              background: "linear-gradient(135deg, hsl(38,71%,47%), hsl(38,78%,56%))",
              color: "hsl(222,68%,15%)",
            }}
          >
            <ImagePlus className="h-4.5 w-4.5" />
            {uploading ? "Uploading to Cloudinary..." : `Upload All (${items.length} files)`}
          </button>
        </div>
      )}
    </AdminLayout>
  );
}