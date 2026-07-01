import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Play, X, ExternalLink, Volume2, VolumeX, Maximize2 } from "lucide-react";

type MediaType = "IMAGE" | "VIDEO" | "REELS" | "CAROUSEL_ALBUM";

type Post = {
  id: string;
  caption: string;
  media_type: MediaType;
  media_url: string;
  thumbnail_url: string;
  permalink: string;
  timestamp: string;
};

const IG_USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID;
const IG_TOKEN   = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const FB_API     = "https://graph.facebook.com/v25.0";
const FIELDS     = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ── In-portal Video Player Modal ────────────────────────────────────────────
function VideoModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else { videoRef.current.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const openFull = () => {
    if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        {/* Modal card */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[#0f0c29] shadow-2xl ring-1 ring-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">@licpasaravanan</span>
              <span className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Reel
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                title="Open on Instagram"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Video */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              src={post.media_url}
              poster={post.thumbnail_url}
              autoPlay
              playsInline
              className="max-h-[70vh] w-full object-contain"
              onClick={togglePlay}
            />

            {/* Pause overlay */}
            {!playing && (
              <div
                className="absolute inset-0 flex cursor-pointer items-center justify-center"
                onClick={togglePlay}
              >
                <div className="rounded-full bg-black/50 p-5 backdrop-blur-sm ring-1 ring-white/20">
                  <Play className="h-10 w-10 fill-white text-white" />
                </div>
              </div>
            )}

            {/* Controls bar */}
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
              <button
                onClick={toggleMute}
                className="rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button
                onClick={openFull}
                className="rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="max-h-24 overflow-y-auto px-5 py-3">
              <p className="text-sm leading-relaxed text-slate-300">{post.caption}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
            <span className="text-xs text-slate-500">{timeAgo(post.timestamp)}</span>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
            >
              <Instagram className="h-3.5 w-3.5" />
              View on Instagram
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Video Thumbnail Card ─────────────────────────────────────────────────────
function VideoCard({ post, index, onPlay }: { post: Post; index: number; onPlay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      onClick={onPlay}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-white/10 transition-shadow hover:shadow-2xl hover:shadow-pink-500/10"
    >
      <div className="relative aspect-[9/16]">
        <img
          src={post.thumbnail_url || post.media_url}
          alt={post.caption || "Instagram reel"}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x711/1a1a2e/ffffff?text=Reel";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Reel badge */}
        <div className="absolute left-2.5 top-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
          Reel
        </div>

        {/* Play button centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="rounded-full bg-white/15 p-4 text-white backdrop-blur-sm ring-2 ring-white/30 transition duration-300 group-hover:bg-white/25"
          >
            <Play className="h-8 w-8 fill-white" />
          </motion.div>
        </div>

        {/* Caption at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          {post.caption && (
            <p className="line-clamp-2 text-[11px] leading-relaxed text-white/80">
              {post.caption}
            </p>
          )}
          <span className="mt-1 block text-[10px] text-white/50">{timeAgo(post.timestamp)}</span>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard({ i }: { i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.07 }}
      className="aspect-[9/16] animate-pulse rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700"
    />
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!IG_USER_ID || !IG_TOKEN) {
        throw new Error("VITE_INSTAGRAM_USER_ID or VITE_INSTAGRAM_ACCESS_TOKEN not set in .env");
      }

      // Fetch more than 5 so we can filter to videos only
      const res = await fetch(
        `${FB_API}/${IG_USER_ID}/media?fields=${FIELDS}&limit=20&access_token=${IG_TOKEN}`
      );
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error?.message || "Instagram API error");

      // Filter only VIDEO / REELS and cap at 5
      const videos: Post[] = (json.data || [])
        .filter((item: any) => item.media_type === "VIDEO" || item.media_type === "REELS")
        .slice(0, 6)
        .map((item: any) => ({
          id: item.id,
          caption: item.caption || "",
          media_type: item.media_type,
          media_url: item.media_url,
          thumbnail_url: item.thumbnail_url || item.media_url,
          permalink: item.permalink,
          timestamp: item.timestamp,
        }));

      setPosts(videos);
    } catch (err: any) {
      setError(err.message || "Could not load Instagram videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <>
      {/* Video Modal Portal */}
      {activePost && (
        <VideoModal post={activePost} onClose={() => setActivePost(null)} />
      )}

      <section
        id="instagram"
        className="relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-20 md:py-28"
      >
        {/* Background glow accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-5 py-2 ring-1 ring-white/10">
              <Instagram className="h-4 w-4 text-pink-400" />
              <span className="text-sm font-semibold text-pink-300">@licpasaravanan</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Watch Our Latest{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Reels
              </span>
            </h2>
            <p className="mt-3 text-slate-400">
              Tap any reel to watch it right here — no app needed
            </p>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} i={i} />)}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6 py-16 text-center"
              >
                <div className="rounded-full bg-white/5 p-6 ring-1 ring-white/10">
                  <Instagram className="h-12 w-12 text-pink-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Instagram not connected</p>
                  <p className="mt-1 max-w-md text-sm text-slate-400">
                    Could not load reels.{" "}
                    <a
                      href="https://www.instagram.com/licpasaravanan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-pink-400 underline hover:text-pink-300"
                    >
                      View profile on Instagram
                    </a>
                  </p>
                </div>
                <button
                  onClick={fetchPosts}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
                >
                  Retry
                </button>
              </motion.div>
            ) : posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4 py-16"
              >
                <p className="text-center text-slate-400">No reels found yet. Stay tuned!</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {posts.map((p, i) => (
                  <VideoCard key={p.id} post={p} index={i} onPlay={() => setActivePost(p)} />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* CTA */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex justify-center"
            >
              <a
                href="https://www.instagram.com/licpasaravanan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-8 py-3.5 font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-105 hover:shadow-pink-500/40"
              >
                <Instagram className="h-5 w-5" />
                Follow @licpasaravanan
              </a>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}