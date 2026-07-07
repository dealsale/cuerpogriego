import { prisma } from "@/lib/prisma";
import { toJson, fromJson } from "@/lib/json";
import { normalizeRutina, type RawRutina } from "@/lib/exercisePatterns";
import {
  buildRoutinePrompt,
  buildDietPrompt,
  parseAIJson,
  FALLBACK_RUTINA,
  FALLBACK_DIETA,
  type PerfilInput,
} from "@/lib/planPrompts";
import { callDeepSeek } from "@/lib/deepseek";

interface RawDieta {
  resumen?: string;
  calorias?: string;
  agua?: string;
  comidas?: { momento?: string; opciones?: string[]; nota?: string }[];
  recomendaciones?: string[];
  consejos?: string[];
}

async function generateRutina(perfil: PerfilInput) {
  try {
    const txt = await callDeepSeek(buildRoutinePrompt(perfil), 8192);
    return normalizeRutina(parseAIJson<RawRutina>(txt));
  } catch (err) {
    console.error("generateRutina falló, usando fallback:", err);
    const fallback = {
      ...FALLBACK_RUTINA,
      advertencias: perfil.hasInjury
        ? ["Evita rangos de dolor en la zona lesionada; prioriza técnica sobre carga."]
        : [],
    };
    return normalizeRutina(fallback);
  }
}

async function generateDieta(perfil: PerfilInput): Promise<RawDieta> {
  try {
    const txt = await callDeepSeek(buildDietPrompt(perfil));
    return parseAIJson<RawDieta>(txt);
  } catch (err) {
    console.error("generateDieta falló, usando fallback:", err);
    return FALLBACK_DIETA;
  }
}

export async function generatePlanForUser(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const perfil: PerfilInput = {
    name: user.name,
    age: user.age,
    sex: user.sex,
    weight: user.weight,
    height: user.height,
    goal: user.goal,
    level: user.level,
    daysPerWeek: user.daysPerWeek,
    hasInjury: user.hasInjury,
    injuries: fromJson<string[]>(user.injuriesJson, []),
    injuryDesc: user.injuryDesc,
  };

  const [rutina, dieta] = await Promise.all([generateRutina(perfil), generateDieta(perfil)]);

  await prisma.$transaction(async (tx) => {
    await tx.routine.deleteMany({ where: { userId } });
    await tx.diet.deleteMany({ where: { userId } });

    await tx.routine.create({
      data: {
        userId,
        summary: rutina.resumen,
        daysPerWeek: rutina.diasPorSemana,
        durationEstimate: rutina.duracionEstimada,
        intensity: rutina.intensidad,
        warningsJson: toJson(rutina.advertencias),
        recommendationsJson: toJson(rutina.recomendaciones),
        days: {
          create: rutina.dias.map((dia, di) => ({
            name: dia.nombre,
            focus: dia.enfoque,
            duration: dia.duracion,
            order: di,
            exercises: {
              create: dia.ejercicios.map((ej, ei) => ({
                name: ej.nombre,
                series: ej.series,
                reps: ej.reps,
                rest: ej.descanso,
                note: ej.nota || null,
                pattern: ej.patron,
                musclesJson: toJson(ej.musculos),
                musclesSecJson: toJson(ej.musculosSec),
                techniqueJson: toJson(ej.tecnica),
                mistakesJson: toJson(ej.errores),
                tempo: ej.tempo,
                breathing: ej.respiracion,
                equipment: ej.equipo,
                order: ei,
              })),
            },
          })),
        },
      },
    });

    const comidas = Array.isArray(dieta.comidas) ? dieta.comidas : [];
    await tx.diet.create({
      data: {
        userId,
        summary: dieta.resumen || "",
        calories: dieta.calorias || "—",
        water: dieta.agua || "—",
        recommendationsJson: toJson(dieta.recomendaciones || []),
        tipsJson: toJson(dieta.consejos || []),
        meals: {
          create: comidas.map((c, i) => ({
            moment: c.momento || "Comida",
            optionsJson: toJson(c.opciones || []),
            note: c.nota || null,
            order: i,
          })),
        },
      },
    });
  });
}
