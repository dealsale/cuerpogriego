"use client";

import { useState } from "react";

const FIELDS: { key: "chest" | "waist" | "arm" | "leg"; label: string }[] = [
  { key: "chest", label: "Pecho" },
  { key: "waist", label: "Cintura" },
  { key: "arm", label: "Brazo" },
  { key: "leg", label: "Pierna" },
];

export function MeasurementsForm({
  initial,
}: {
  initial: { chest: string; waist: string; arm: string; leg: string };
}) {
  const [values, setValues] = useState(initial);

  async function save(key: string, value: string) {
    await fetch("/api/measurements", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: value }),
    });
  }

  return (
    <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
      {FIELDS.map((f) => (
        <div key={f.key}>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-muted-3 mb-1.5">
            {f.label}
          </label>
          <input
            value={values[f.key]}
            onChange={(e) => setValues((s) => ({ ...s, [f.key]: e.target.value }))}
            onBlur={(e) => save(f.key, e.target.value)}
            className="w-full bg-ink border border-gold/22 text-cream px-3.5 py-2.5 text-[15px] outline-none focus:border-gold"
          />
        </div>
      ))}
    </div>
  );
}
