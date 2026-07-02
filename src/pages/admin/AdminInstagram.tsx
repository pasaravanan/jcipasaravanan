import { useEffect, useState } from "react";
import { Trash2, GripVertical, Info, ExternalLink, RefreshCw, Key, ShieldAlert } from "lucide-react";
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
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-neutral-100">
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground p-1 hover:bg-neutral-50 rounded-lg">
        <GripVertical className="h-4 w-4" />
      </button>
      <a href={item.post_url} target="_blank" rel="noreferrer" className="flex flex-1 items-center gap-1 truncate text-sm text-[hsl(222,68%,22%)] font-medium hover:underline">
        {item.post_url} <ExternalLink className="h-3 w-3" />
      </a>
      <label className="flex cursor-pointer items-center gap-2 text-xs">
        <input type="checkbox" checked={item.is_active} onChange={onToggle} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
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

  // Configuration settings state
  const [configToken, setConfigToken] = useState("");
  const [configUserId, setConfigUserId] = useState("");
  const [configAppId, setConfigAppId] = useState("");
  const [configAppSecret, setConfigAppSecret] = useState("");
  const [configExpiresAt, setConfigExpiresAt] = useState<string | null>(null);
  const [configUpdatedAt, setConfigUpdatedAt] = useState<string | null>(null);
  const [savingConfig, setSavingConfig] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("instagram_embeds")
      .select("*")
      .gt("display_order", -1) // excludes config row (-10)
      .order("display_order", { ascending: true });
    setItems(data || []);
  };

  const checkAndAutoRefresh = async (config: any) => {
    if (!config.expires_at) return;
    const expiresTime = new Date(config.expires_at).getTime();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    if (expiresTime < Date.now() + thirtyDays) {
      console.log("Token expiring soon. Attempting auto-refresh client-side...");
      try {
        let refreshUrl = "";
        if (config.app_id && config.app_secret) {
          refreshUrl = `https://graph.facebook.com/v25.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${config.app_id}&client_secret=${config.app_secret}&fb_exchange_token=${config.access_token}`;
        } else {
          refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${config.access_token}`;
        }
        
        const res = await fetch(refreshUrl);
        const data = await res.json();
        if (res.ok && data.access_token) {
          const newExpiry = new Date(Date.now() + (data.expires_in || 5184000) * 1000).toISOString();
          const updatedConfig = {
            ...config,
            access_token: data.access_token,
            expires_at: newExpiry,
            updated_at: new Date().toISOString()
          };
          
          await supabase
            .from("instagram_embeds")
            .update({ post_url: JSON.stringify(updatedConfig) })
            .eq("display_order", -10);
            
          console.log("Instagram Access Token auto-renewed successfully!");
          loadConfig();
        }
      } catch (e) {
        console.error("Auto refresh failed:", e);
      }
    }
  };

  const loadConfig = async () => {
    try {
      setLoadingConfig(true);
      const { data, error } = await supabase
        .from("instagram_embeds")
        .select("post_url")
        .eq("display_order", -10)
        .maybeSingle();

      if (!error && data?.post_url) {
        const config = JSON.parse(data.post_url);
        setConfigUserId(config.user_id || "");
        setConfigAppId(config.app_id || "");
        setConfigExpiresAt(config.expires_at || null);
        setConfigUpdatedAt(config.updated_at || null);
        if (config.access_token) {
          setConfigToken("••••••••••••••••••••");
        }
        if (config.app_secret) {
          setConfigAppSecret("••••••••••••••••••••");
        }

        // Perform auto refresh if needed
        if (config.access_token) {
          checkAndAutoRefresh(config);
        }
      }
    } catch (err) {
      console.error("Failed to load Instagram API config:", err);
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => { 
    load(); 
    loadConfig();
  }, []);

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
    await Promise.all(
      reordered.map((it, idx) =>
        supabase.from("instagram_embeds").update({ display_order: idx + 1 }).eq("id", it.id),
      ),
    );
    toast.success("Order updated");
  };

  const saveConfig = async () => {
    if (!configToken || !configUserId) {
      toast.error("Access Token and Instagram User ID are required");
      return;
    }

    try {
      setSavingConfig(true);

      let finalToken = configToken;
      let expiresAt: string | null = configExpiresAt;

      const isNewToken = configToken !== "••••••••••••••••••••" && !configToken.startsWith("••••");
      const isNewSecret = configAppSecret !== "••••••••••••••••••••" && !configAppSecret.startsWith("••••");

      // Load existing config to preserve variables if needed
      const { data: existingRow } = await supabase
        .from("instagram_embeds")
        .select("post_url")
        .eq("display_order", -10)
        .maybeSingle();

      let existingConfig: any = null;
      if (existingRow?.post_url) {
        try {
          existingConfig = JSON.parse(existingRow.post_url);
        } catch {}
      }

      let activeToken = isNewToken ? configToken : (existingConfig?.access_token || "");
      let activeSecret = isNewSecret ? configAppSecret : (existingConfig?.app_secret || "");

      if (configAppId && activeSecret && isNewToken) {
        console.log("App details provided. Exchanging for 60-day token client-side...");
        try {
          const exchangeUrl = `https://graph.facebook.com/v25.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${configAppId}&client_secret=${activeSecret}&fb_exchange_token=${encodeURIComponent(activeToken)}`;
          const res = await fetch(exchangeUrl);
          const data = await res.json();
          if (res.ok && data.access_token) {
            finalToken = data.access_token;
            const seconds = data.expires_in || 5184000;
            expiresAt = new Date(Date.now() + seconds * 1000).toISOString();
            toast.success("Successfully exchanged for a 60-day token!");
          } else {
            console.warn("Meta token exchange failed:", data);
            toast.warning("Token exchange failed, saving token directly.");
            finalToken = activeToken;
          }
        } catch (e) {
          console.error("Token exchange error:", e);
          toast.warning("Could not connect to Meta API. Saved token directly.");
          finalToken = activeToken;
        }
      } else {
        finalToken = activeToken;
      }

      const newConfig = {
        access_token: finalToken,
        user_id: configUserId,
        app_id: configAppId || "",
        app_secret: activeSecret || "",
        expires_at: expiresAt,
        updated_at: new Date().toISOString(),
      };

      // Check if config row already exists
      const { data: existingConfigRow } = await supabase
        .from("instagram_embeds")
        .select("id")
        .eq("display_order", -10)
        .maybeSingle();

      let dbErr = null;
      if (existingConfigRow) {
        const { error } = await supabase
          .from("instagram_embeds")
          .update({
            post_url: JSON.stringify(newConfig),
            is_active: true // Must be active so public site can read it
          })
          .eq("id", existingConfigRow.id);
        dbErr = error;
      } else {
        const { error } = await supabase
          .from("instagram_embeds")
          .insert({
            post_url: JSON.stringify(newConfig),
            display_order: -10,
            is_active: true,
          });
        dbErr = error;
      }

      if (dbErr) {
        toast.error("Database save failed: " + dbErr.message);
      } else {
        toast.success("Instagram API configuration saved successfully!");
        loadConfig();
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-normal text-[hsl(222,68%,17%)]">Instagram Management</h1>
        <p className="text-sm text-neutral-500 mt-1">Configure your Instagram API token directly inside the browser using React & TypeScript.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: Feed Custom Embeds List */}
        <div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm mb-6">
            <h2 className="font-display text-xl font-normal text-neutral-900 mb-4">Add Custom Instagram Embeds</h2>
            
            <div className="mb-4 flex gap-3 rounded-xl bg-blue-50/50 p-4 text-xs text-blue-900 border border-blue-100">
              <Info className="h-4 w-4 shrink-0 text-blue-600" />
              <p>
                Add specific post URLs to appear in your carousel. Open the post on Instagram, click the three dots, select "Copy Link", and paste it below.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/ABC12345/"
                className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-amber-600 focus:bg-white transition"
              />
              <button onClick={addPost} className="rounded-xl bg-[hsl(222,68%,17%)] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-navy transition">
                Add Post
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Custom Embeds List (Drag to Reorder)</h3>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2.5">
                  {items.map((it) => (
                    <Row key={it.id} item={it} onToggle={() => toggleActive(it)} onDelete={() => setConfirmDel(it.id)} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            {items.length === 0 && (
              <p className="py-10 text-center text-xs text-neutral-400 border border-dashed rounded-2xl bg-white">No custom Instagram embeds configured yet.</p>
            )}
          </div>
        </div>

        {/* Right: API Token Configuration Panel */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center gap-2 mb-4">
              <Key className="h-5 w-5 text-pink-500" />
              <h2 className="font-display text-lg font-normal text-neutral-900">API Access Token configuration</h2>
            </div>
            
            <p className="text-xs leading-relaxed text-neutral-500 mb-4">
              Save your Access Token and setup App Secrets here to enable automatic 60-day token rotation and keep your feed fresh. All operations run directly in your browser.
            </p>

            <div className="space-y-4 pt-2 border-t border-neutral-100">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Access Token *</label>
                <input
                  type="password"
                  value={configToken}
                  onChange={(e) => setConfigToken(e.target.value)}
                  placeholder="Paste Instagram Access Token"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm outline-none focus:border-amber-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Instagram Business Account ID *</label>
                <input
                  type="text"
                  value={configUserId}
                  onChange={(e) => setConfigUserId(e.target.value)}
                  placeholder="e.g. 17841407725296017"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm outline-none focus:border-amber-600 focus:bg-white transition"
                />
              </div>

              <div className="border-t border-dashed pt-4 border-neutral-100">
                <span className="block text-xs font-bold text-neutral-600 mb-2 uppercase tracking-wide">60-Day Auto-Refresh (Optional)</span>
                <p className="text-[10px] text-neutral-400 mb-3 leading-relaxed">
                  Provide your Meta App ID and App Secret. The React app will automatically renew your token in the background before expiry.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">App ID</label>
                    <input
                      type="text"
                      value={configAppId}
                      onChange={(e) => setConfigAppId(e.target.value)}
                      placeholder="e.g. 123456789012345"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm outline-none focus:border-amber-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">App Secret</label>
                    <input
                      type="password"
                      value={configAppSecret}
                      onChange={(e) => setConfigAppSecret(e.target.value)}
                      placeholder="Enter App Secret"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm outline-none focus:border-amber-600 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {configUpdatedAt && (
                <div className="text-[10px] text-neutral-400 space-y-0.5 border-t pt-3 border-neutral-100">
                  <p>Last Updated: {new Date(configUpdatedAt).toLocaleString()}</p>
                  {configExpiresAt && <p>Expires: {new Date(configExpiresAt).toLocaleString()}</p>}
                </div>
              )}

              <button
                onClick={saveConfig}
                disabled={savingConfig || loadingConfig}
                className="w-full mt-2 rounded-xl bg-[hsl(222,68%,17%)] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-navy disabled:opacity-50 transition"
              >
                {savingConfig ? "Saving & Exchanging..." : "Save Configuration"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmDel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-display text-lg font-normal text-neutral-900">Delete Instagram post?</h3>
            <p className="text-sm text-neutral-500">This will remove it from the custom display embeds loop.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDel(null)} className="flex-1 rounded-xl border py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:bg-neutral-50 transition">Cancel</button>
              <button onClick={del} className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}