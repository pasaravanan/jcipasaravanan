import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cldFull } from "@/lib/cloudinary";

type Post = {
  id: string;
  image_url: string;
  caption: string | null;
  category: string | null;
  created_at: string;
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function GalleryLightbox({
  posts,
  startIndex,
  onClose,
}: {
  posts: Post[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = () => setIdx((i) => (i + 1) % posts.length);
  const prev = () => setIdx((i) => (i - 1 + posts.length) % posts.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length]);

  const current = posts[idx];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = e.changedTouches[0].clientX - touchStart;
          if (diff > 60) prev();
          else if (diff < -60) next();
          setTouchStart(null);
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {posts.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 md:left-6"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 md:right-6"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-full max-w-5xl flex-col items-center"
        >
          <img
            src={cldFull(current.image_url, 1200)}
            alt={current.caption || ""}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
          />
          <div className="mt-4 max-w-3xl text-center text-white">
            {current.caption && <p className="text-lg">{current.caption}</p>}
            <p className="mt-1 text-sm text-white/70">
              {current.category} • {fmtDate(current.created_at)}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}