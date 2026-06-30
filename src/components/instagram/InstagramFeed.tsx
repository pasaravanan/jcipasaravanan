import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Play, Heart, MessageCircle, ExternalLink, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const isVideo = post.media_type === "VIDEO" || post.media_type === "REELS";
  const poster = post.thumbnail_url || post.media_url;
  const shortCaption = post.caption?.slice(0, 90) + (post.caption?.length > 90 ? "…" : "");

  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative block overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-white/10 transition-shadow hover:shadow-2xl"
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={poster}
          alt={post.caption || "Instagram post"}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x400/1a1a2e/ffffff?text=Instagram";
          }}
        />

        {/* Play icon overlay for reels/videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/40 p-3 text-white backdrop-blur-sm ring-1 ring-white/20 transition duration-300 group-hover:scale-110 group-hover:bg-black/60">
              <Play className="h-7 w-7 fill-white" />
            </div>
          </div>
        )}

        {/* REEL badge */}
        {post.media_type === "REELS" && (
          <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
            Reel
          </div>
        )}

        {/* Gradient overlay + caption on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {shortCaption && (
            <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-white/90">{shortCaption}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/60">{timeAgo(post.timestamp)}</span>
            <ExternalLink className="h-3.5 w-3.5 text-white/60" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function SkeletonCard({ i }: { i: number }) {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.04 }}
      className="aspect-square animate-pulse rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100"
    />
  );
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("instagram-feed", {
        body: null,
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);
      setPosts(data?.posts || []);
    } catch (err: any) {
      setError(err.message || "Could not load Instagram posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
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
            Follow Us on{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Instagram
            </span>
          </h2>
          <p className="mt-3 text-slate-400">
            Latest posts, reels &amp; client moments — live from our profile
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} i={i} />
              ))}
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
                  To show live posts, connect your Instagram Business account.{" "}
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
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 py-16"
            >
              <div className="rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
                <Instagram className="h-12 w-12 text-pink-400" />
              </div>
              <p className="text-center text-slate-400">No posts yet. Stay tuned!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {posts.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
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
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
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
            <a
              href="https://www.instagram.com/licpasaravanan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Open on Instagram
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}