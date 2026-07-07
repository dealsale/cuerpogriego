import { prisma } from "@/lib/prisma";
import { ExerciseMediaManager } from "@/components/admin/ExerciseMediaManager";

export default async function AdminExercisesPage() {
  const exercises = await prisma.exerciseMedia.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="mb-7">
        <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
          Panel administrativo
        </span>
        <h1 className="font-display font-bold text-[34px] mt-2 mb-0">Ejercicios</h1>
        <p className="text-muted-2 text-sm mt-2 max-w-xl">
          Cargá un video o GIF por ejercicio para reemplazar la animación por defecto en el detalle
          de la rutina. Si un ejercicio generado por la IA coincide con un nombre de este catálogo,
          se muestra el video/gif; si no hay coincidencia o no cargaste media, se sigue mostrando la
          animación.
        </p>
      </div>
      <ExerciseMediaManager exercises={exercises} />
    </div>
  );
}
