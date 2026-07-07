"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput } from "@/components/ui/Field";
import { ChoiceButton } from "@/components/ui/ChoiceButton";
import { GoldButton } from "@/components/ui/GoldButton";
import { OBJETIVOS, LESIONES, DIAS_OPTIONS } from "@/lib/options";

interface Props {
  initialPeso: string;
  initialAltura: string;
  initialObjetivo: string;
  initialDias: string;
  initialLesiones: string[];
}

export function ProfileForm({
  initialPeso,
  initialAltura,
  initialObjetivo,
  initialDias,
  initialLesiones,
}: Props) {
  const router = useRouter();
  const [peso, setPeso] = useState(initialPeso);
  const [altura, setAltura] = useState(initialAltura);
  const [objetivo, setObjetivo] = useState(initialObjetivo);
  const [dias, setDias] = useState(initialDias);
  const [lesiones, setLesiones] = useState<string[]>(initialLesiones);
  const [loading, setLoading] = useState(false);

  function toggleLesion(l: string) {
    setLesiones((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]));
  }

  async function updateAndRegenerate() {
    setLoading(true);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peso, altura, objetivo, dias, lesiones }),
      });
      await fetch("/api/plan/generate", { method: "POST" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-card border border-gold/16 p-5.5 mb-4.5">
        <div className="font-display text-[15px] text-gold-light mb-4">Datos para tu plan</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="Peso (kg)">
            <TextInput type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
          </Field>
          <Field label="Altura (cm)">
            <TextInput type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
          </Field>
        </div>
        <label className="block text-[11px] tracking-[0.1em] uppercase text-muted-3 mb-2.5">
          Objetivo
        </label>
        <div className="flex flex-wrap gap-2.5 mb-4.5">
          {OBJETIVOS.map((o) => (
            <ChoiceButton key={o} pill active={objetivo === o} onClick={() => setObjetivo(o)}>
              {o}
            </ChoiceButton>
          ))}
        </div>
        <label className="block text-[11px] tracking-[0.1em] uppercase text-muted-3 mb-2.5">
          Días de entrenamiento por semana
        </label>
        <div className="flex gap-2 mb-4.5 max-w-xs">
          {DIAS_OPTIONS.map((d) => (
            <ChoiceButton key={d} active={dias === d} onClick={() => setDias(d)} className="flex-1">
              {d}
            </ChoiceButton>
          ))}
        </div>
        <label className="block text-[11px] tracking-[0.1em] uppercase text-muted-3 mb-2.5">
          Lesiones
        </label>
        <div className="flex flex-wrap gap-2.5">
          {LESIONES.map((l) => (
            <ChoiceButton key={l} pill active={lesiones.includes(l)} onClick={() => toggleLesion(l)}>
              {l}
            </ChoiceButton>
          ))}
        </div>
      </div>

      <GoldButton
        onClick={updateAndRegenerate}
        disabled={loading}
        className="w-full !py-[15px] !mb-3.5"
      >
        {loading ? "Actualizando…" : "Actualizar y regenerar mi plan"}
      </GoldButton>
    </div>
  );
}
