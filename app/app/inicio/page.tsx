import Link from "next/link";
import { requireUser } from "@/lib/session";
import { getRoutineForUser } from "@/lib/queries";
import { RotatingQuote } from "@/components/app/RotatingQuote";

const MESES = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];

export default async function InicioPage() {
  const user = await requireUser();
  const routine = await getRoutineForUser(user.id);

  const primerNombre = (user.name || "Atleta").split(" ")[0];
  const hoy = new Date();
  const hoyFecha = `${hoy.getDate()} ${MESES[hoy.getMonth()]}`;
  const imc = user.weight && user.height ? (user.weight / (user.height / 100) ** 2).toFixed(1) : "—";
  const primerDia = routine?.dias[0];

  return (
    <div className="animate-[cgFade_0.4s_ease_both]">
      <div className="mb-6.5">
        <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
          {hoyFecha}
        </span>
        <h1 className="font-display font-bold text-[clamp(28px,5vw,40px)] mt-2 mb-0">
          Hola, {primerNombre}
        </h1>
        <RotatingQuote className="font-quote italic text-[21px] text-muted-1 mt-2" />
      </div>

      <div className="grid gap-3.5 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
        <div className="bg-card border border-gold/16 p-5">
          <div className="text-[11px] tracking-[0.12em] uppercase text-muted-3">Objetivo</div>
          <div className="font-display text-[17px] text-gold-light mt-2">{user.goal || "Mantenerse"}</div>
        </div>
        <div className="bg-card border border-gold/16 p-5">
          <div className="text-[11px] tracking-[0.12em] uppercase text-muted-3">Peso actual</div>
          <div className="font-display text-[17px] text-cream mt-2">{user.weight ?? "—"} kg</div>
        </div>
        <div className="bg-card border border-gold/16 p-5">
          <div className="text-[11px] tracking-[0.12em] uppercase text-muted-3">IMC</div>
          <div className="font-display text-[17px] text-cream mt-2">{imc}</div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-[#16120A] to-card border border-gold/28 p-6.5 mb-5 overflow-hidden">
        <div className="absolute -top-5 -right-2.5 font-display text-[130px] text-gold/[0.06] leading-none">
          π
        </div>
        <div className="relative">
          <div className="text-[11px] tracking-[0.14em] uppercase text-gold">Próximo entrenamiento</div>
          {primerDia ? (
            <>
              <h2 className="font-display font-bold text-2xl mt-3 mb-1.5">{primerDia.enfoque}</h2>
              <div className="flex gap-4.5 text-muted-2 text-sm mb-4.5">
                <span>◷ {primerDia.duracion}</span>
                <span>◆ {primerDia.nombre}</span>
              </div>
              <Link
                href="/app/rutina"
                className="inline-block bg-gold text-ink px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase hover:bg-gold-light"
              >
                Ver mi rutina
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3.5 mt-4 text-muted-1">
              <div className="w-5.5 h-5.5 border-2 border-gold/30 border-t-gold rounded-full animate-[cgSpin_0.8s_linear_infinite]" />
              <span className="font-quote italic text-[19px]">La IA está creando tu rutina…</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <Link
          href="/app/rutina"
          className="text-left bg-card border border-gold/16 hover:border-gold/45 transition-colors p-5.5 block"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.4">
            <path d="M12 3v18M7 6l-4 6 4 6M17 6l4 6-4 6" />
          </svg>
          <div className="font-display text-base mt-3 text-cream">Mi rutina</div>
          <div className="text-[13px] text-muted-3 mt-1">Tu plan de entrenamiento</div>
        </Link>
        <Link
          href="/app/alimentacion"
          className="text-left bg-card border border-gold/16 hover:border-gold/45 transition-colors p-5.5 block"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.4">
            <path d="M6 3v7a3 3 0 006 0V3M9 10v11M15 3c-1.5 1-2 3-2 5s.5 4 2 5v8" />
          </svg>
          <div className="font-display text-base mt-3 text-cream">Mi alimentación</div>
          <div className="text-[13px] text-muted-3 mt-1">Tu plan nutricional</div>
        </Link>
      </div>
    </div>
  );
}
