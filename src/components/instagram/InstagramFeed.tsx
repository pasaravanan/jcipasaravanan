import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Embed = { id: string; post_url: string };

function toEmbedUrl(url: string) {
  const clean = url.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed`;
}

export default function InstagramFeed() {
  const [embeds, setEmbeds] = useState<Embed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("instagram_embeds")
      .select("id, post_url")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setEmbeds(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="instagram"
      className="bg-gradient-to-br from-slate-50 via-pink-50/40 to-purple-50/40 py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Follow Us on Instagram
          </h2>
          <p className="mt-3 text-muted-foreground">
            Latest updates, achievements & client moments
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-square animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : embeds.length === 0 ? (
          <p className="text-center text-muted-foreground">
            New posts coming soon — follow us on Instagram for updates.
          </p>
        ) : (
          <>
            {/* Mobile carousel */}
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:hidden">
              {embeds.map((e) => (
                <div
                  key={e.id}
                  className="aspect-square w-[85%] flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-white shadow-lg"
                >
                  <iframe
                    src={toEmbedUrl(e.post_url)}
                    className="h-full w-full"
                    loading="lazy"
                    allowTransparency
                    title="Instagram post"
                  />
                </div>
              ))}
            </div>
            {/* Desktop grid */}
            <div className="hidden grid-cols-3 gap-6 md:grid">
              {embeds.slice(0, 6).map((e, i) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg"
                >
                  <iframe
                    src={toEmbedUrl(e.post_url)}
                    className="h-full w-full"
                    loading="lazy"
                    allowTransparency
                    title="Instagram post"
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://www.instagram.com/licpasaravanan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <Instagram className="h-5 w-5" />
            Follow on Instagram
          </a>
          <a
            href="https://www.instagram.com/licpasaravanan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-navy hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
            @licpasaravanan
          </a>
        </div>
      </div>
    </section>
  );
}