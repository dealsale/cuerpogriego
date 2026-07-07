"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/clientUpload";

export function PhotoSlot({ slot, label, url }: { slot: string; label: string; url: string | null }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = await uploadToCloudinary(file, "/api/progress-photo/sign");
      const res = await fetch("/api/progress-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot, url: uploaded.url }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "No se pudo subir la foto");
        return;
      }
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "No se pudo subir la foto");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full aspect-[3/4] bg-card border border-gold/16 flex items-center justify-center text-muted-3 text-xs overflow-hidden cursor-pointer"
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={label} className="w-full h-full object-cover" />
        ) : uploading ? (
          "Subiendo…"
        ) : (
          "+ Foto"
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={onChange} className="hidden" />
      <div className="text-center text-xs text-muted-3 mt-1.5">{label}</div>
      {error && <div className="text-center text-xs text-danger mt-1">{error}</div>}
    </div>
  );
}
