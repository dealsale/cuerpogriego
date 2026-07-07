"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PATTERN_INFO, type Pattern } from "@/lib/exercisePatterns";
import { uploadToCloudinary } from "@/lib/clientUpload";

export interface ExerciseMediaItem {
  id: string;
  name: string;
  pattern: string | null;
  mediaType: string | null;
  mediaUrl: string | null;
}

const PATTERN_OPTIONS = Object.entries(PATTERN_INFO) as [Pattern, { label: string }][];
const SIGN_ENDPOINT = "/api/admin/exercises/sign";

function MediaPreview({ item }: { item: ExerciseMediaItem }) {
  if (!item.mediaUrl) {
    return (
      <div className="w-24 h-16 bg-ink border border-dashed border-gold/25 flex items-center justify-center text-[10px] text-muted-4 text-center px-1">
        Sin media
      </div>
    );
  }
  if (item.mediaType === "video") {
    return (
      <video
        src={item.mediaUrl}
        className="w-24 h-16 object-cover bg-ink border border-gold/20"
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.mediaUrl} alt={item.name} className="w-24 h-16 object-cover bg-ink border border-gold/20" />;
}

function ExerciseRow({ item }: { item: ExerciseMediaItem }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(item.name);
  const [pattern, setPattern] = useState(item.pattern || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function saveMetadata() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/exercises/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pattern: pattern || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "No se pudo guardar");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function replaceMedia(file: File) {
    setBusy(true);
    setError("");
    try {
      const { url, mediaType } = await uploadToCloudinary(file, SIGN_ENDPOINT);
      const res = await fetch(`/api/admin/exercises/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaUrl: url, mediaType }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "No se pudo subir el archivo");
        return;
      }
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "No se pudo subir el archivo");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`¿Eliminar "${item.name}" del catálogo?`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/exercises/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "No se pudo eliminar");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-3 px-5 py-4 border-b border-white/[0.04] items-center" style={{ gridTemplateColumns: "auto 1.6fr 1.2fr auto auto" }}>
      <MediaPreview item={item} />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={saveMetadata}
        className="bg-transparent border border-transparent hover:border-gold/20 focus:border-gold text-sm text-cream px-2 py-1.5 outline-none"
      />
      <select
        value={pattern}
        onChange={(e) => {
          setPattern(e.target.value);
        }}
        onBlur={saveMetadata}
        className="bg-ink border border-gold/20 text-muted-1 text-sm px-2 py-1.5 outline-none"
      >
        <option value="">Sin patrón</option>
        {PATTERN_OPTIONS.map(([key, info]) => (
          <option key={key} value={key}>
            {info.label}
          </option>
        ))}
      </select>
      <div>
        <input
          ref={fileRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime,image/gif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) replaceMedia(f);
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="bg-transparent border border-gold/30 text-muted-2 px-3 py-1.5 text-xs cursor-pointer hover:border-gold hover:text-gold whitespace-nowrap"
        >
          {busy ? "Subiendo…" : `${item.mediaUrl ? "Cambiar" : "Subir"} video/gif`}
        </button>
      </div>
      <button
        onClick={remove}
        disabled={busy}
        className="bg-transparent border border-[rgba(210,120,80,0.3)] text-[#C08466] px-3 py-1.5 text-xs cursor-pointer hover:border-danger hover:text-danger"
      >
        Eliminar
      </button>
      {error && (
        <div className="col-span-full text-xs text-danger -mt-1">{error}</div>
      )}
    </div>
  );
}

function AddExerciseForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pattern, setPattern] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function submit() {
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setLoading(true);
    setError("");
    try {
      let mediaUrl: string | null = null;
      let mediaType: string | null = null;
      if (file) {
        const uploaded = await uploadToCloudinary(file, SIGN_ENDPOINT);
        mediaUrl = uploaded.url;
        mediaType = uploaded.mediaType;
      }

      const res = await fetch("/api/admin/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pattern: pattern || null, mediaUrl, mediaType }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo guardar");
        return;
      }
      setName("");
      setPattern("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "No se pudo guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card border border-gold/16 p-5 mb-5">
      <div className="font-display text-[15px] text-gold-light mb-3.5">Agregar ejercicio</div>
      <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "1.6fr 1.2fr" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del ejercicio"
          className="bg-ink border border-gold/22 text-cream placeholder:text-muted-4 px-3.5 py-2.5 text-sm outline-none focus:border-gold"
        />
        <select
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="bg-ink border border-gold/22 text-muted-1 px-3.5 py-2.5 text-sm outline-none focus:border-gold"
        >
          <option value="">Sin patrón</option>
          {PATTERN_OPTIONS.map(([key, info]) => (
            <option key={key} value={key}>
              {info.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <input
          ref={fileRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm text-muted-2"
        />
        <button
          onClick={submit}
          disabled={loading}
          className="bg-gold text-ink px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase cursor-pointer hover:bg-gold-light disabled:opacity-50"
        >
          {loading ? "Guardando…" : "Guardar"}
        </button>
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    </div>
  );
}

export function ExerciseMediaManager({ exercises }: { exercises: ExerciseMediaItem[] }) {
  return (
    <div>
      <AddExerciseForm />
      <div className="bg-card border border-gold/16">
        <div
          className="grid gap-3 px-5 py-3.5 border-b border-gold/16 text-[11px] tracking-[0.1em] uppercase text-muted-3"
          style={{ gridTemplateColumns: "auto 1.6fr 1.2fr auto auto" }}
        >
          <div>Media</div>
          <div>Nombre</div>
          <div>Patrón</div>
          <div />
          <div />
        </div>
        {exercises.map((ex) => (
          <ExerciseRow key={ex.id} item={ex} />
        ))}
        {exercises.length === 0 && (
          <div className="px-5 py-8 text-center text-muted-3 text-sm">
            Todavía no hay ejercicios en el catálogo.
          </div>
        )}
      </div>
    </div>
  );
}
