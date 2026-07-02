import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Play, X, ExternalLink, Volume2, VolumeX, Maximize2 } from "lucide-react";
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

// Premium financial placeholder posts to show if token expires or request fails
const FALLBACK_POSTS: Post[] = [
  {
    id: "fb_1",
    caption: "Secure your family's future today. Let's discuss the right LIC Life Insurance plan tailored for you. 💼✨ #lic #insurance #karaikal",
    media_type: "VIDEO",
    media_url: "",
    thumbnail_url: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=500&auto=format&fit=crop",
    permalink: "https://www.instagram.com/licpasaravanan",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fb_2",
    caption: "Grow your wealth with disciplined SIP investing. Start your mutual fund journey today. 📈💰 #mutualfunds #sip #investing",
    media_type: "VIDEO",
    media_url: "",
    thumbnail_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop",
    permalink: "https://www.instagram.com/licpasaravanan",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fb_3",
    caption: "Health is wealth. Protect your family from sudden medical bills with Star Health Insurance. 🏥❤️ #healthinsurance #starhealth",
    media_type: "VIDEO",
    media_url: "",
    thumbnail_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop",
    permalink: "https://www.instagram.com/licpasaravanan",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fb_4",
    caption: "Attitude, Skills, and Knowledge (ASK) is the foundation of successful planning. Let's achieve financial goals! 🎯🎓 #financialconsultant",
    media_type: "VIDEO",
    media_url: "",
    thumbnail_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop",
    permalink: "https://www.instagram.com/licpasaravanan",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fb_5",
    caption: "Plan for retirement early. Secure a monthly pension with LIC's top pension schemes. 🌅👴 #retirement #pension",
    media_type: "VIDEO",
    media_url: "",
    thumbnail_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=500&auto=format&fit=crop",
    permalink: "https://www.instagram.com/licpasaravanan",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fb_6",
    caption: "Tax savings shouldn't be stressful. Discover simple tax saving instruments under Sec 80C. 📑✍️ #taxsavings #investing",
    media_type: "VIDEO",
    media_url: "",
    thumbnail_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop",
    permalink: "https://www.instagram.com/licpasaravanan",
    timestamp: new Date().toISOString(),
  }
];

const IG_USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID;
const IG_TOKEN   = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const FB_API     = "https://graph.facebook.com/v25.0";
const FIELDS     = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (isNaN(diff) || diff < 0) return "Just now";
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function VideoModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 32 }}
          className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-[#0f0c29] shadow-2xl ring-1 ring-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-pink-400" />
              <span className="text-xs font-semibold text-white">@licpasaravanan</span>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative bg-black flex justify-center items-center">
            {post.media_url ? (
              <video
                ref={videoRef}
                src={post.media_url}
                poster={post.thumbnail_url}
                autoPlay
                playsInline
                className="max-h-[60vh] w-full object-contain"
                onClick={togglePlay}
              />
            ) : (
              <div className="relative aspect-[9/16] w-full max-h-[50vh] overflow-hidden flex items-center justify-center">
                <img src={post.thumbnail_url} alt={post.caption} className="w-full h-full object-cover opacity-60" />
                <Play className="absolute h-12 w-12 text-white/80" />
              </div>
            )}

            {post.media_url && !playing && (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                <div className="rounded-full bg-black/60 p-4"><Play className="h-8 w-8 text-white fill-white" /></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#141236]">
            <p className="text-[13px] leading-relaxed text-slate-300 line-clamp-3">{post.caption}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{timeAgo(post.timestamp)}</span>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-1.5 text-[11px] font-semibold text-white hover:opacity-90"
              >
                View Post
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    
    // Method 1: Try reading Config from Database table directly
    try {
      const { data: dbConfigRow, error: dbErr } = await supabase
        .from("instagram_embeds")
        .select("post_url")
        .eq("display_order", -10)
        .eq("is_active", true)
        .maybeSingle();

      if (dbErr || !dbConfigRow) {
        throw new Error("No database config row found, falling back to local...");
      }

      const config = JSON.parse(dbConfigRow.post_url);
      const token = config.access_token;
      const userId = config.user_id;

      if (!token || !userId) {
        throw new Error("Missing token or user ID in database config");
      }

      const res = await fetch(
        `${FB_API}/${userId}/media?fields=${FIELDS}&limit=20&access_token=${token}`
      );
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error?.message || "Meta API error response");
      }

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

      if (videos.length > 0) {
        setPosts(videos);
        setLoading(false);
        return;
      }
    } catch (dbErr) {
      console.warn("Direct DB config fetch failed. Trying environment variables backup...", dbErr);
    }

    // Method 2: Fall back to environment variables VITE_ prefix
    try {
      if (!IG_USER_ID || !IG_TOKEN) {
        throw new Error("Local config variables missing, using placeholders...");
      }

      const res = await fetch(
        `${FB_API}/${IG_USER_ID}/media?fields=${FIELDS}&limit=20&access_token=${IG_TOKEN}`
      );
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error?.message || "Meta API error response");
      }

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

      if (videos.length > 0) {
        setPosts(videos);
        setLoading(false);
        return;
      }
    } catch (clientErr) {
      console.warn("Direct environment Meta API request failed. Using professional placeholders.", clientErr);
    }

    // Method 3: Fall back to empty posts (no fake sample posts)
    setPosts([]);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePostClick = (post: Post) => {
    setActivePost(post);
  };

  const [activePost, setActivePost] = useState<Post | null>(null);

  return (
    <>
      {activePost && <VideoModal post={activePost} onClose={() => setActivePost(null)} />}

      <section
        id="instagram"
        className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(155deg, hsl(330,70%,96%) 0%, hsl(295,60%,95%) 40%, hsl(265,60%,95%) 70%, hsl(245,65%,96%) 100%)" }}
      >
        {/* Colorful brand blur blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 left-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"
            style={{ background: "hsl(330,85%,70%)" }} />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full opacity-15 blur-3xl"
            style={{ background: "hsl(265,80%,75%)" }} />
        </div>

        <div className="container relative mx-auto px-5">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-4 py-1.5 border border-pink-500/20 shadow-xs">
              <Instagram className="h-4 w-4 text-pink-500" />
              <span className="text-xs font-semibold text-pink-700">@licpasaravanan</span>
            </div>
            <h2 className="font-display text-3xl font-normal text-[hsl(222,68%,17%)] sm:text-4xl md:text-5xl">
              Watch Our Latest <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent font-semibold">Reels</span>
            </h2>
            <p className="mt-3 text-sm text-[hsl(215,16%,45%)]">
              Follow us on Instagram for daily financial insights and updates
            </p>
          </motion.div>

          {/* Cards grid / Fallback CTA */}
          {!loading && posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-xl rounded-3xl border border-pink-500/15 bg-white/60 p-8 text-center backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 text-white shadow-md shadow-pink-500/20">
                <Instagram className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-normal text-[hsl(222,68%,17%)] mb-2">Follow @licpasaravanan</h3>
              <p className="text-sm text-[hsl(215,16%,45%)] mb-6 leading-relaxed">
                Stay updated with mutual fund analysis, LIC updates, and useful financial tips by joining our online community directly on Instagram!
              </p>
              <a
                href="https://www.instagram.com/licpasaravanan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:scale-[1.02] hover:shadow-lg transition-all"
              >
                View Profile & Reels <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-[9/16] animate-pulse rounded-2xl bg-neutral-200" />
                  ))
                : posts.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      onClick={() => handlePostClick(p)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-black border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative aspect-[9/16]">
                        <img
                          src={p.thumbnail_url}
                          alt={p.caption}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        <Play className="absolute inset-0 m-auto h-8 w-8 text-white/85 group-hover:scale-110 transition-transform drop-shadow-md" />
                        
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="line-clamp-2 text-[11px] leading-relaxed text-white/90">{p.caption}</p>
                          <span className="mt-1 block text-[9px] text-white/50">{timeAgo(p.timestamp)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </div>
          )}

          {/* Bottom CTA (Only shows when posts exist) */}
          {posts.length > 0 && (
            <div className="mt-12 text-center">
              <a
                href="https://www.instagram.com/licpasaravanan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-500/20 hover:scale-105 transition-transform"
              >
                Follow on Instagram
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}