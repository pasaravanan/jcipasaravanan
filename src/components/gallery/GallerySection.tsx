import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cldThumb } from "@/lib/cloudinary";
import GalleryLightbox from "./GalleryLightbox";

type Post = {
  id: string;
  image_url: string;
  caption: string | null;
  category: string | null;
  created_at: string;
};

const CATEGORIES = ["All", "Events", "Awards", "Client Meetings", "Office", "Family", "General"];
const PAGE_SIZE = 12;

const badgeColors: Record<string, string> = {
  Events: "bg-coral text-coral-foreground",
  Awards: "bg-gold text-gold-foreground",
  "Client Meetings": "bg-teal text-teal-foreground",
  Office: "bg-primary text-primary-foreground",
  Family: "bg-pink-500 text-white",
  General: "bg-slate-600 text-white",
};

export default function GallerySection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("gallery_posts")
      .select("id, image_url, caption, category, created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(
    () => (activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory)),
    [posts, activeCategory],
  );
  const shown = filtered.slice(0, visible);

  return (
    <section id="gallery" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary via-teal to-gold" />
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Our Gallery</h2>
          <p className="mt-3 text-muted-foreground">
            Moments from events, awards, and client journeys
          </p>
        </motion.div>

        <div className="mb-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setActiveCategory(c);
                setVisible(PAGE_SIZE);
              }}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition ${
                activeCategory === c
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No photos in this category yet.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {shown.map((p, idx) => {
                const isVideo = p.image_url.includes("/video/upload/") || p.image_url.match(/\.(mp4|webm|ogg|mov)($|\?)/i);
                return (
                  <motion.button
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-md transition hover:shadow-xl"
                  >
                    <img
                      src={cldThumb(p.image_url, 600)}
                      alt={p.caption || "Gallery item"}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition duration-500">
                        <div className="rounded-full bg-white/20 p-3 text-white backdrop-blur transition duration-300 group-hover:scale-110">
                          <Play className="h-6 w-6 fill-white" />
                        </div>
                      </div>
                    )}
                    {p.category && (
                      <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                          badgeColors[p.category] || "bg-slate-600 text-white"
                        }`}
                      >
                        {p.category}
                      </span>
                    )}
                    {p.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-left">
                        <p className="line-clamp-2 text-sm font-medium text-white">{p.caption}</p>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {filtered.length > visible && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          posts={filtered}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}