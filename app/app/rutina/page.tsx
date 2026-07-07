import Link from "next/link";
import { requireUser } from "@/lib/session";
import { getRoutineForUser } from "@/lib/queries";
import { getExerciseCatalog } from "@/lib/exerciseCatalog";
import { RegenerateButton } from "@/components/app/RegenerateButton";
import { ExerciseModal } from "@/components/exercise/ExerciseModal";

export default async function RutinaPage({
  searchParams,
}: {
  searchParams: Promise<{ ej?: string }>;
}) {
  const user = await requireUser();
  const [routine, catalog] = await Promise.all([getRoutineForUser(user.id), getExerciseCatalog()]);
  const { ej } = await searchParams;

  const openExercise = ej
    ? routine?.dias.flatMap((d) => d.ejercicios.map((e) => ({ ...e, diaNombre: d.nombre, enfoque: d.enfoque }))).find((e) => e.id === ej)
    : null;

  return (
    <div className="animate-[cgFade_0.4s_ease_both]">
      <div className="flex items-end justify-between gap-4 mb-5.5 flex-wrap">
        <div>
          <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
            Tu plan de entrenamiento
          </span>
          <h1 className="font-display font-bold text-[clamp(26px,5vw,38px)] mt-2 mb-0">Mi rutina</h1>
        </div>
        <RegenerateButton />
      </div>

      {!routine ? (
        <div className="text-center py-20 px-5">
          <div className="w-10 h-10 border-[3px] border-gold/25 border-t-gold rounded-full animate-[cgSpin_0.8s_linear_infinite] mx-auto" />
          <p className="font-quote italic text-[22px] text-muted-1 mt-5.5">
            La IA está diseñando tu rutina a medida…
          </p>
        </div>
      ) : (
        <div>
          <p className="font-quote text-xl leading-[1.5] text-muted-1 mb-5">{routine.resumen}</p>
          <div className="flex flex-wrap gap-2.5 mb-5.5">
            <div className="bg-card border border-gold/20 px-4 py-2.5">
              <span className="text-muted-3 text-xs">Días/semana</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{routine.diasPorSemana}</span>
            </div>
            <div className="bg-card border border-gold/20 px-4 py-2.5">
              <span className="text-muted-3 text-xs">Duración</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{routine.duracionEstimada}</span>
            </div>
            <div className="bg-card border border-gold/20 px-4 py-2.5">
              <span className="text-muted-3 text-xs">Intensidad</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{routine.intensidad}</span>
            </div>
          </div>

          {routine.advertencias.length > 0 && (
            <div className="bg-danger/10 border border-[rgba(210,120,80,0.4)] border-l-[3px] border-l-danger px-4.5 py-4 mb-5.5">
              <div className="flex items-center gap-2 text-danger-soft text-xs tracking-[0.1em] uppercase mb-2">
                ⚠ Advertencias por tu lesión
              </div>
              {routine.advertencias.map((a, i) => (
                <div key={i} className="text-sm text-muted-1 leading-[1.55]">
                  · {a}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {routine.dias.map((dia) => (
              <div key={dia.id} className="bg-card border border-gold/16">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gold/12 bg-gradient-to-r from-gold/[0.06] to-transparent">
                  <div>
                    <div className="font-display font-semibold text-[17px] text-cream">{dia.nombre}</div>
                    <div className="text-[13px] text-gold mt-0.5">{dia.enfoque}</div>
                  </div>
                  <div className="text-xs text-muted-3">◷ {dia.duracion}</div>
                </div>
                <div className="px-5 pt-2 pb-4">
                  {dia.ejercicios.map((ej2) => (
                    <Link
                      key={ej2.id}
                      href={`/app/rutina?ej=${ej2.id}`}
                      scroll={false}
                      className="flex items-center justify-between gap-3 py-3 px-2 -mx-2 border-b border-white/[0.04] hover:bg-gold/[0.07] transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] text-cream">{ej2.nombre}</div>
                        <div className="text-[11px] text-gold mt-0.5 tracking-[0.04em]">
                          {/* pattern label resolved client-side isn't needed; show generic hint */}
                          ver músculos ▸
                        </div>
                        {ej2.nota && (
                          <div className="text-[12.5px] text-muted-3 mt-0.5 italic">{ej2.nota}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-right flex-shrink-0">
                        <div>
                          <div className="font-display text-base text-gold-light">
                            {ej2.series}×{ej2.reps}
                          </div>
                          <div className="text-[10px] text-muted-4 tracking-[0.08em] uppercase">
                            series × reps
                          </div>
                        </div>
                        <div className="min-w-[52px]">
                          <div className="font-display text-base text-muted-2">{ej2.descanso}</div>
                          <div className="text-[10px] text-muted-4 tracking-[0.08em] uppercase">
                            descanso
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/16 p-5.5 mt-4">
            <div className="font-display text-[15px] text-gold-light mb-3">Recomendaciones</div>
            {routine.recomendaciones.map((r, i) => (
              <div key={i} className="flex gap-2.5 py-1.5 text-[14.5px] text-muted-1 leading-[1.5]">
                <span className="text-gold">✦</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {openExercise && <ExerciseModal exercise={openExercise} catalog={catalog} />}
    </div>
  );
}
