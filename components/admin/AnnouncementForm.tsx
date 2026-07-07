"use client";

import { useState } from "react";

export function AnnouncementForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function publish() {
    if (!message.trim()) return;
    setStatus("publicando");
    const res = await fetch("/api/admin/announcement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setStatus(res.ok ? "Publicado ✓" : "Error");
    if (res.ok) setMessage("");
  }

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje para todos los usuarios…"
        rows={3}
        className="w-full bg-ink border border-gold/22 text-cream placeholder:text-muted-4 px-3.5 py-3 text-sm outline-none resize-y focus:border-gold mb-3"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={publish}
          className="bg-gold text-ink px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase cursor-pointer hover:bg-gold-light"
        >
          Publicar
        </button>
        {status && <span className="text-xs text-muted-3">{status}</span>}
      </div>
    </div>
  );
}
