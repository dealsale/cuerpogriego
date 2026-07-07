import { prisma } from "@/lib/prisma";
import { fromJson } from "@/lib/json";
import type { Pattern } from "@/lib/exercisePatterns";

export interface ExerciseView {
  id: string;
  nombre: string;
  series: number;
  reps: string;
  descanso: string;
  nota: string;
  patron: Pattern;
  musculos: string[];
  musculosSec: string[];
  tecnica: string[];
  errores: string[];
  tempo: string;
  respiracion: string;
  equipo: string;
}

export interface DayView {
  id: string;
  nombre: string;
  enfoque: string;
  duracion: string;
  ejercicios: ExerciseView[];
}

export interface RoutineView {
  resumen: string;
  diasPorSemana: number;
  duracionEstimada: string;
  intensidad: string;
  advertencias: string[];
  recomendaciones: string[];
  dias: DayView[];
}

export async function getRoutineForUser(userId: string): Promise<RoutineView | null> {
  const routine = await prisma.routine.findUnique({
    where: { userId },
    include: { days: { orderBy: { order: "asc" }, include: { exercises: { orderBy: { order: "asc" } } } } },
  });
  if (!routine) return null;

  return {
    resumen: routine.summary,
    diasPorSemana: routine.daysPerWeek,
    duracionEstimada: routine.durationEstimate,
    intensidad: routine.intensity,
    advertencias: fromJson<string[]>(routine.warningsJson, []),
    recomendaciones: fromJson<string[]>(routine.recommendationsJson, []),
    dias: routine.days.map((d) => ({
      id: d.id,
      nombre: d.name,
      enfoque: d.focus,
      duracion: d.duration,
      ejercicios: d.exercises.map((ex) => ({
        id: ex.id,
        nombre: ex.name,
        series: ex.series,
        reps: ex.reps,
        descanso: ex.rest,
        nota: ex.note || "",
        patron: ex.pattern as Pattern,
        musculos: fromJson<string[]>(ex.musclesJson, []),
        musculosSec: fromJson<string[]>(ex.musclesSecJson, []),
        tecnica: fromJson<string[]>(ex.techniqueJson, []),
        errores: fromJson<string[]>(ex.mistakesJson, []),
        tempo: ex.tempo,
        respiracion: ex.breathing,
        equipo: ex.equipment,
      })),
    })),
  };
}

export interface MealView {
  id: string;
  momento: string;
  opciones: string[];
  nota: string;
}

export interface DietView {
  resumen: string;
  calorias: string;
  agua: string;
  recomendaciones: string[];
  consejos: string[];
  comidas: MealView[];
}

export async function getDietForUser(userId: string): Promise<DietView | null> {
  const diet = await prisma.diet.findUnique({
    where: { userId },
    include: { meals: { orderBy: { order: "asc" } } },
  });
  if (!diet) return null;

  return {
    resumen: diet.summary,
    calorias: diet.calories,
    agua: diet.water,
    recomendaciones: fromJson<string[]>(diet.recommendationsJson, []),
    consejos: fromJson<string[]>(diet.tipsJson, []),
    comidas: diet.meals.map((m) => ({
      id: m.id,
      momento: m.moment,
      opciones: fromJson<string[]>(m.optionsJson, []),
      nota: m.note || "",
    })),
  };
}
