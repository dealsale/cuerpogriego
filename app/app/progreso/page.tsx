import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { buildWeightChart } from "@/lib/chart";
import { WeightForm } from "@/components/app/WeightForm";
import { MeasurementsForm } from "@/components/app/MeasurementsForm";
import { PhotoSlot } from "@/components/app/PhotoSlot";

export default async function ProgresoPage() {
  const user = await requireUser();
  const [logs, measurement, photos] = await Promise.all([
    prisma.weightLog.findMany({ where: { userId: user.id }, orderBy: { date: "asc" } }),
    prisma.bodyMeasurement.findUnique({ where: { userId: user.id } }),
    prisma.progressPhoto.findMany({ where: { userId: user.id } }),
  ]);

  const pesoLog =
    logs.length > 0
      ? logs.map((l) => ({
          fecha: l.date.toLocaleDateString("es", { day: "2-digit", month: "short" }),
          peso: l.weight,
        }))
      : user.weight
        ? [{ fecha: "Inicio", peso: user.weight }]
        : [{ fecha: "Inicio", peso: 0 }];

  const chart = buildWeightChart(pesoLog);
  const deltaNum = parseFloat(chart.deltaPeso);
  const photoBySlot = Object.fromEntries(photos.map((p) => [p.slot, p.url]));

  return (
    <div className="animate-[cgFade_0.4s_ease_both]">
      <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
        Tu evolución
      </span>
      <h1 className="font-display font-bold text-[clamp(26px,5vw,38px)] mt-2 mb-5.5">Mi progreso</h1>

      <div className="bg-card border border-gold/16 p-5.5 mb-4.5">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-xs tracking-[0.1em] uppercase text-muted-3">Peso</div>
            <div className="font-display text-[30px] text-cream mt-1">{chart.pesoUltimo} kg</div>
          </div>
          <div className="text-right">
            <div
              className="font-display text-xl"
              style={{ color: deltaNum <= 0 ? "#7FB069" : "#D2784F" }}
            >
              {deltaNum > 0 ? "+" : ""}
              {chart.deltaPeso} kg
            </div>
            <div className="text-xs text-muted-3">desde el inicio</div>
          </div>
        </div>
        <svg viewBox={`0 0 ${chart.W} ${chart.H}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="cgArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(62,230,255,0.32)" />
              <stop offset="100%" stopColor="rgba(62,230,255,0)" />
            </linearGradient>
          </defs>
          <path d={chart.areaPath} fill="url(#cgArea)" />
          <path d={chart.linePath} fill="none" stroke="#3ee6ff" strokeWidth={2.5} />
          {chart.pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill="#0d0a14" stroke="#3ee6ff" strokeWidth={2} />
          ))}
        </svg>
        <div className="flex justify-between mt-2">
          {pesoLog.map((p, i) => (
            <div key={i} className="text-[11px] text-muted-4">
              {p.fecha}
            </div>
          ))}
        </div>
        <WeightForm />
      </div>

      <div className="bg-card border border-gold/16 p-5.5 mb-4.5">
        <div className="font-display text-[15px] text-gold-light mb-4">Medidas corporales (cm)</div>
        <MeasurementsForm
          initial={{
            chest: measurement?.chest || "",
            waist: measurement?.waist || "",
            arm: measurement?.arm || "",
            leg: measurement?.leg || "",
          }}
        />
      </div>

      <div className="bg-card border border-gold/16 p-5.5">
        <div className="font-display text-[15px] text-gold-light mb-4">Fotografías de progreso</div>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
          <PhotoSlot slot="inicio" label="Inicio" url={photoBySlot.inicio || null} />
          <PhotoSlot slot="semana4" label="Semana 4" url={photoBySlot.semana4 || null} />
          <PhotoSlot slot="actual" label="Actual" url={photoBySlot.actual || null} />
        </div>
      </div>
    </div>
  );
}
