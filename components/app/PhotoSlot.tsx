"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function PhotoSlot({ slot, label, url }: { slot: string; label: string; url: string | null }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("slot", slot);
      formData.set("file", file);
      await fetch("/api/progress-photo", { method: "POST", body: formData });
      router.refresh();
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
    </div>
  );
}
