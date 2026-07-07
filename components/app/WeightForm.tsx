"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function WeightForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    const v = parseFloat(value);
    if (!v) return;
    setLoading(true);
    try {
      await fetch("/api/weight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: v }),
      });
      setValue("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2.5 mt-4.5">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        placeholder="Registrar peso de hoy (kg)"
        className="flex-1 bg-ink border border-gold/22 text-cream placeholder:text-muted-4 px-4 py-3 text-[15px] outline-none focus:border-gold"
      />
      <button
        onClick={submit}
        disabled={loading}
        className="bg-gold text-ink px-5.5 py-3 text-xs font-semibold tracking-[0.12em] uppercase cursor-pointer hover:bg-gold-light disabled:opacity-50"
      >
        {loading ? "…" : "Registrar"}
      </button>
    </div>
  );
}
