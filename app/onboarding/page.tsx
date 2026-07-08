"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Field, TextInput, TextArea } from "@/components/ui/Field";
import { ChoiceButton } from "@/components/ui/ChoiceButton";
import { GoldButton } from "@/components/ui/GoldButton";
import { OBJETIVOS, LESIONES, DIAS_OPTIONS } from "@/lib/options";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface FormState {
  nombre: string;
  edad: string;
  sexo: string;
  peso: string;
  altura: string;
  objetivo: string;
  dias: string;
  tieneLesion: boolean | null;
  lesiones: string[];
  lesionDesc: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState<FormState>({
    nombre: "",
    edad: "",
    sexo: "",
    peso: "",
    altura: "",
    objetivo: "",
    dias: "4",
    tieneLesion: null,
    lesiones: [],
    lesionDesc: "",
  });

  const step0Ok = !!(f.nombre && f.edad && f.sexo && f.peso && f.altura);
  const step1Ok = !!f.objetivo;
  const step2Ok = f.tieneLesion !== null && (!f.tieneLesion || f.lesiones.length > 0);

  function toggleLesion(l: string) {
    setF((s) => ({
      ...s,
      lesiones: s.lesiones.includes(l) ? s.lesiones.filter((x) => x !== l) : [...s.lesiones, l],
    }));
  }

  async function finish() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "No se pudo generar tu plan.");
        setSubmitting(false);
        return;
      }
      router.push("/app/inicio");
      router.refresh();
    } catch {
      setError("Ocurrió un error inesperado.");
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 pt-[clamp(24px,4vw,48px)] pb-[60px]"
      style={{ background: "radial-gradient(circle at 50% -10%, #1a1028, #0d0a14 55%)" }}
    >
      <Link href="/" className="mb-[34px]">
        <BrandLogo
          size={34}
          wordmarkClassName="font-display font-bold tracking-[0.26em] text-sm text-cream"
        />
      </Link>

      <div className="w-full max-w-[560px] flex items-center gap-2.5 mb-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex-1 h-0.5 ${step >= i ? "bg-gold" : "bg-gold/20"}`} />
        ))}
      </div>

      <div className="w-full max-w-[560px] animate-[cgFadeUp_0.5s_ease_both]">
        {step === 0 && (
          <div>
            <span className="font-display tracking-[0.28em] text-[11px] text-gold uppercase">
              Paso I · Sobre ti
            </span>
            <h1 className="font-display font-bold text-[clamp(28px,4vw,40px)] mt-3 mb-[30px]">
              Cuéntanos de ti
            </h1>
            <div className="mb-5">
              <Field label="Nombre">
                <TextInput
                  value={f.nombre}
                  onChange={(e) => setF((s) => ({ ...s, nombre: e.target.value }))}
                  placeholder="Tu nombre"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Field label="Edad">
                <TextInput
                  type="number"
                  value={f.edad}
                  onChange={(e) => setF((s) => ({ ...s, edad: e.target.value }))}
                  placeholder="Años"
                />
              </Field>
              <Field label="Sexo">
                <div className="flex gap-2">
                  <ChoiceButton
                    active={f.sexo === "Hombre"}
                    onClick={() => setF((s) => ({ ...s, sexo: "Hombre" }))}
                    className="flex-1"
                  >
                    Hombre
                  </ChoiceButton>
                  <ChoiceButton
                    active={f.sexo === "Mujer"}
                    onClick={() => setF((s) => ({ ...s, sexo: "Mujer" }))}
                    className="flex-1"
                  >
                    Mujer
                  </ChoiceButton>
                </div>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-[34px]">
              <Field label="Peso (kg)">
                <TextInput
                  type="number"
                  value={f.peso}
                  onChange={(e) => setF((s) => ({ ...s, peso: e.target.value }))}
                  placeholder="80"
                />
              </Field>
              <Field label="Altura (cm)">
                <TextInput
                  type="number"
                  value={f.altura}
                  onChange={(e) => setF((s) => ({ ...s, altura: e.target.value }))}
                  placeholder="178"
                />
              </Field>
            </div>
            <GoldButton
              disabled={!step0Ok}
              onClick={() => setStep(1)}
              className="w-full !py-[15px]"
            >
              Continuar
            </GoldButton>
          </div>
        )}

        {step === 1 && (
          <div>
            <span className="font-display tracking-[0.28em] text-[11px] text-gold uppercase">
              Paso II · Tu meta
            </span>
            <h1 className="font-display font-bold text-[clamp(28px,4vw,40px)] mt-3 mb-[30px]">
              ¿Cuál es tu objetivo?
            </h1>
            <div className="flex flex-col gap-3 mb-[30px]">
              {OBJETIVOS.map((o) => (
                <ChoiceButton
                  key={o}
                  active={f.objetivo === o}
                  onClick={() => setF((s) => ({ ...s, objetivo: o }))}
                  className="flex items-center justify-between text-left !text-base"
                >
                  <span>{o}</span>
                  {f.objetivo === o && <span className="font-display text-gold">✦</span>}
                </ChoiceButton>
              ))}
            </div>

            <label className="block text-xs tracking-[0.1em] uppercase text-muted-3 mb-3">
              ¿Cuántos días por semana podés entrenar?
            </label>
            <div className="flex gap-2 mb-[34px]">
              {DIAS_OPTIONS.map((d) => (
                <ChoiceButton
                  key={d}
                  active={f.dias === d}
                  onClick={() => setF((s) => ({ ...s, dias: d }))}
                  className="flex-1 !text-base"
                >
                  {d}
                </ChoiceButton>
              ))}
            </div>

            <div className="flex gap-3">
              <GoldButton variant="ghost" onClick={() => setStep(0)}>
                Atrás
              </GoldButton>
              <GoldButton
                disabled={!step1Ok}
                onClick={() => setStep(2)}
                className="flex-1 !py-[15px]"
              >
                Continuar
              </GoldButton>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="font-display tracking-[0.28em] text-[11px] text-gold uppercase">
              Paso III · Tu seguridad
            </span>
            <h1 className="font-display font-bold text-[clamp(28px,4vw,40px)] mt-3 mb-3">
              ¿Has sufrido alguna lesión?
            </h1>
            <p className="text-[14.5px] text-muted-2 mb-6">
              La IA adaptará tu rutina y te dará advertencias para protegerte.
            </p>
            <div className="flex gap-3 mb-6">
              <ChoiceButton
                active={f.tieneLesion === false}
                onClick={() => setF((s) => ({ ...s, tieneLesion: false, lesiones: [], lesionDesc: "" }))}
                className="flex-1 !text-[15px]"
              >
                No, ninguna
              </ChoiceButton>
              <ChoiceButton
                active={f.tieneLesion === true}
                onClick={() => setF((s) => ({ ...s, tieneLesion: true }))}
                className="flex-1 !text-[15px]"
              >
                Sí
              </ChoiceButton>
            </div>

            {f.tieneLesion === true && (
              <div className="mb-6 animate-[cgFadeUp_0.4s_ease_both]">
                <label className="block text-xs tracking-[0.1em] uppercase text-muted-3 mb-3">
                  Selecciona la zona
                </label>
                <div className="flex flex-wrap gap-2.5 mb-5">
                  {LESIONES.map((l) => (
                    <ChoiceButton
                      key={l}
                      pill
                      active={f.lesiones.includes(l)}
                      onClick={() => toggleLesion(l)}
                      className="!text-sm"
                    >
                      {l}
                    </ChoiceButton>
                  ))}
                </div>
                <Field label="Descripción (opcional)">
                  <TextArea
                    rows={3}
                    value={f.lesionDesc}
                    onChange={(e) => setF((s) => ({ ...s, lesionDesc: e.target.value }))}
                    placeholder="Ej: molestia en la rodilla derecha al flexionar"
                  />
                </Field>
              </div>
            )}

            {error && <p className="text-sm text-danger mb-4">{error}</p>}

            <div className="flex gap-3">
              <GoldButton variant="ghost" onClick={() => setStep(1)} disabled={submitting}>
                Atrás
              </GoldButton>
              <GoldButton
                disabled={!step2Ok || submitting}
                onClick={finish}
                className="flex-1 !py-[15px]"
              >
                {submitting ? "Generando tu plan…" : "Generar mi plan →"}
              </GoldButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
