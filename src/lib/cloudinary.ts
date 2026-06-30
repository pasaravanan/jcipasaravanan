import { supabase } from "@/integrations/supabase/client";

const CLOUD_NAME = "dltti9hiw";

export function cldThumb(url: string, width = 400) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
export function cldFull(url: string, width = 1200) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

export async function uploadToCloudinary(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<{ secure_url: string; public_id: string }> {
  const { data: sig, error } = await supabase.functions.invoke("cloudinary", {
    body: { action: "sign-upload" },
  });
  if (error || !sig) throw new Error(error?.message || "Failed to sign upload");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.api_key);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(res);
        else reject(new Error(res.error?.message || "Upload failed"));
      } catch {
        reject(new Error("Invalid response"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(form);
  });
}

export async function destroyOnCloudinary(publicId: string) {
  const { data, error } = await supabase.functions.invoke("cloudinary", {
    body: { action: "destroy", public_id: publicId },
  });
  if (error) throw error;
  return data;
}