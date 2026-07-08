"use client";

import { useRouter } from "next/navigation";
import { MUSCLE_LABELS, PATTERN_INFO } from "@/lib/exercisePatterns";
import { findExerciseMedia, type ExerciseMediaLike } from "@/lib/exerciseMatch";
import { AthleteFigure } from "@/components/exercise/AthleteFigure";
import { MuscleMap } from "@/components/exercise/MuscleMap";
import type { ExerciseView } from "@/lib/queries";

interface Props {
  exercise: ExerciseView & { diaNombre: string; enfoque: string };
  catalog: ExerciseMediaLike[];
}

export function ExerciseModal({ exercise, catalog }: Props) {
  const router = useRouter();
  const close = () => router.push("/app/rutina", { scroll: false });

  const media = findExerciseMedia(exercise.nombre, catalog);
  const patronLabel = PATTERN_INFO[exercise.patron]?.label || "";

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-[60] bg-black/[0.82] backdrop-blur-sm flex items-start justify-center p-5 overflow-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[760px] bg-[#120d1c] border border-gold/30 animate-[cgModalIn_0.35s_ease_both] my-auto"
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gold/16 sticky top-0 bg-[#120d1c] z-[2]">
          <div>
            <div className="font-display tracking-[0.16em] text-[10.5px] text-gold uppercase">
              {exercise.diaNombre} · {exercise.enfoque}
            </div>
            <h2 className="font-display font-bold text-[clamp(21px,4vw,29px)] mt-1.5 mb-0">
              {exercise.nombre}
            </h2>
          </div>
          <button
            onClick={close}
            className="flex-shrink-0 w-[38px] h-[38px] bg-transparent border border-gold/30 text-gold text-[17px] cursor-pointer hover:bg-gold/10"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5.5">
          <div className="grid gap-4 mb-5.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
            <div className="bg-ink border border-gold/16 p-3.5 flex flex-col">
              <div className="text-[10.5px] tracking-[0.14em] uppercase text-muted-3 mb-1.5">
                Demostración del movimiento
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[230px] py-2">
                {media ? (
                  media.mediaType === "video" ? (
                    <video
                      src={media.mediaUrl!}
                      className="max-h-[230px] w-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={media.mediaUrl!} alt={exercise.nombre} className="max-h-[230px] w-full object-contain" />
                  )
                ) : (
                  <AthleteFigure pattern={exercise.patron} />
                )}
              </div>
              <div className="text-center font-display text-[13px] text-gold">{patronLabel}</div>
            </div>
            <div className="bg-ink border border-gold/16 p-3.5 flex flex-col">
              <div className="text-[10.5px] tracking-[0.14em] uppercase text-muted-3 mb-1.5">
                Músculos que trabaja
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[200px]">
                <MuscleMap primary={exercise.musculos} secondary={exercise.musculosSec} />
              </div>
              <div className="flex flex-wrap gap-2.5 justify-center mt-2.5">
                {exercise.musculos.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1.5 text-xs text-gold-light">
                    <span className="w-2 h-2 bg-[#ff6ec4] rounded-full" />
                    {MUSCLE_LABELS[k] || k}
                  </span>
                ))}
                {exercise.musculosSec.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1.5 text-xs text-muted-3">
                    <span className="w-2 h-2 bg-gold/50 rounded-full" />
                    {MUSCLE_LABELS[k] || k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4.5">
            <div className="bg-card border border-gold/20 px-3.5 py-2.5">
              <span className="text-muted-3 text-[11px]">Series × Reps</span>{" "}
              <span className="font-display text-gold-light ml-1.5">
                {exercise.series}×{exercise.reps}
              </span>
            </div>
            <div className="bg-card border border-gold/20 px-3.5 py-2.5">
              <span className="text-muted-3 text-[11px]">Descanso</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{exercise.descanso}</span>
            </div>
            <div className="bg-card border border-gold/20 px-3.5 py-2.5">
              <span className="text-muted-3 text-[11px]">Tempo</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{exercise.tempo}</span>
            </div>
            <div className="bg-card border border-gold/20 px-3.5 py-2.5">
              <span className="text-muted-3 text-[11px]">Equipo</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{exercise.equipo}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-gold/[0.06] border border-gold/16 px-4 py-3 mb-5.5 text-sm text-muted-1">
            <span className="text-gold text-base">◒</span> Respiración: {exercise.respiracion}
          </div>

          <div className="mb-5.5">
            <div className="font-display text-[15px] text-gold-light mb-3">Técnica</div>
            {exercise.tecnica.map((t, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-white/[0.04]">
                <div className="flex-shrink-0 w-6 h-6 border border-gold/40 text-gold font-display text-xs flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="text-[14.5px] text-muted-1 leading-[1.5]">{t}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="font-display text-[15px] text-gold-light mb-3">Errores comunes</div>
            {exercise.errores.map((er, i) => (
              <div key={i} className="flex gap-2.5 py-1.5 text-sm text-muted-1 leading-[1.5]">
                <span className="text-danger">✕</span>
                <span>{er}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
