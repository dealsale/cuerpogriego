// Ported from the prototype's generarRutina()/generarDieta() prompts and fallback data.

export interface PerfilInput {
  name: string;
  age: number | null;
  sex: string | null;
  weight: number | null;
  height: number | null;
  goal: string | null;
  level: string;
  daysPerWeek: number;
  hasInjury: boolean | null;
  injuries: string[];
  injuryDesc: string | null;
}

export function buildPerfilTexto(f: PerfilInput): string {
  const les =
    f.hasInjury && f.injuries.length
      ? `${f.injuries.join(", ")}${f.injuryDesc ? " (" + f.injuryDesc + ")" : ""}`
      : "ninguna";
  return `Nombre: ${f.name || "Usuario"}. Edad: ${f.age ?? "n/d"}. Sexo: ${f.sex ?? "n/d"}. Peso: ${f.weight ?? "n/d"} kg. Altura: ${f.height ?? "n/d"} cm. Objetivo: ${f.goal || "Mantenerse"}. Nivel: ${f.level}. Días disponibles: ${f.daysPerWeek}. Lesiones: ${les}.`;
}

export function buildRoutinePrompt(f: PerfilInput): string {
  return `Eres un entrenador personal profesional. Crea una rutina de entrenamiento COMPLETAMENTE personalizada para este usuario:
${buildPerfilTexto(f)}

Responde SOLO con JSON válido (sin texto extra), con esta forma exacta:
{"resumen":"1-2 frases motivadoras y sobrias","diasPorSemana":number,"duracionEstimada":"ej: 50 min","intensidad":"Baja|Media|Media-alta|Alta","advertencias":["si hay lesión, cómo protegerla"],"recomendaciones":["3-4 consejos"],"dias":[{"nombre":"Día 1","enfoque":"grupo muscular","duracion":"ej: 50 min","ejercicios":[{"nombre":"","series":number,"reps":"ej: 8-10","descanso":"ej: 90 s","nota":"opcional o vacío","patron":"exactamente uno de: press-horizontal|press-vertical|jalon|remo|curl|extension-triceps|elevacion-lateral|sentadilla|peso-muerto|zancada|abdomen|cardio","musculos":["1-2 claves de: pecho,hombro,biceps,triceps,antebrazo,abdomen,oblicuos,dorsal,trapecio,lumbar,cuadriceps,isquios,gluteos,gemelos,aductores"],"musculosSec":["0-2 de la misma lista"],"tecnica":["3 claves de ejecución"],"errores":["2 errores comunes"],"tempo":"ej: 2-1-2","respiracion":"ej: exhala al empujar","equipo":"ej: mancuernas"}]}]}
Usa SOLO los valores de patron y de músculos indicados. Genera entre ${f.daysPerWeek || 4} días. Cada día 4-6 ejercicios. Español. Tono sobrio y elegante.`;
}

export function buildDietPrompt(f: PerfilInput): string {
  return `Eres un nutricionista profesional. Crea un plan de alimentación diario COMPLETAMENTE personalizado para este usuario:
${buildPerfilTexto(f)}

Responde SOLO con JSON válido (sin texto extra), con esta forma exacta:
{"resumen":"1-2 frases","calorias":"ej: ~2200 kcal","agua":"ej: 3 L","comidas":[{"momento":"Desayuno|Media mañana|Almuerzo|Merienda|Cena","opciones":["2-3 opciones concretas con porciones"],"nota":"opcional"}],"recomendaciones":["3-4"],"consejos":["3-4 consejos saludables"]}
Incluye las 5 comidas. Español. Tono sobrio y elegante.`;
}

export function parseAIJson<T = unknown>(txt: string): T {
  let t = (txt || "").trim();
  t = t
    .replace(/^```(json)?/i, "")
    .replace(/```$/, "")
    .trim();
  const a = t.indexOf("{");
  const b = t.lastIndexOf("}");
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  return JSON.parse(t) as T;
}

export const FALLBACK_RUTINA = {
  resumen: "Rutina equilibrada para construir fuerza y control corporal con progresión gradual.",
  diasPorSemana: 4,
  duracionEstimada: "50 min",
  intensidad: "Media-alta",
  advertencias: [] as string[],
  recomendaciones: [
    "Calienta 8-10 min antes de cada sesión.",
    "Descansa al menos 48 h por grupo muscular.",
    "Hidrátate durante el entrenamiento.",
  ],
  dias: [
    {
      nombre: "Día 1",
      enfoque: "Pecho y tríceps",
      duracion: "50 min",
      ejercicios: [
        { nombre: "Press de banca con mancuernas", series: 4, reps: "8-10", descanso: "90 s", nota: "" },
        { nombre: "Press inclinado", series: 3, reps: "10-12", descanso: "75 s", nota: "" },
        { nombre: "Aperturas", series: 3, reps: "12-15", descanso: "60 s", nota: "" },
        { nombre: "Fondos en banco", series: 3, reps: "10-12", descanso: "60 s", nota: "" },
      ],
    },
    {
      nombre: "Día 2",
      enfoque: "Espalda y bíceps",
      duracion: "50 min",
      ejercicios: [
        { nombre: "Remo con barra", series: 4, reps: "8-10", descanso: "90 s", nota: "" },
        { nombre: "Jalón al pecho", series: 3, reps: "10-12", descanso: "75 s", nota: "" },
        { nombre: "Curl de bíceps", series: 3, reps: "12", descanso: "60 s", nota: "" },
      ],
    },
    {
      nombre: "Día 3",
      enfoque: "Pierna y core",
      duracion: "55 min",
      ejercicios: [
        { nombre: "Sentadilla", series: 4, reps: "8-10", descanso: "120 s", nota: "Técnica primero" },
        { nombre: "Peso muerto rumano", series: 3, reps: "10", descanso: "90 s", nota: "" },
        { nombre: "Plancha", series: 3, reps: "45 s", descanso: "45 s", nota: "" },
      ],
    },
    {
      nombre: "Día 4",
      enfoque: "Hombro y full body",
      duracion: "45 min",
      ejercicios: [
        { nombre: "Press militar", series: 4, reps: "8-10", descanso: "90 s", nota: "" },
        { nombre: "Elevaciones laterales", series: 3, reps: "12-15", descanso: "60 s", nota: "" },
        { nombre: "Burpees", series: 3, reps: "12", descanso: "60 s", nota: "" },
      ],
    },
  ],
};

export const FALLBACK_DIETA = {
  resumen: "Alimentación balanceada que sostiene tu energía y favorece tu objetivo.",
  calorias: "~2200 kcal",
  agua: "3 L",
  comidas: [
    {
      momento: "Desayuno",
      opciones: ["3 huevos + avena (40 g) + fruta", "Yogur griego + granola + arándanos"],
      nota: "",
    },
    {
      momento: "Media mañana",
      opciones: ["Puñado de almendras + manzana", "Batido de proteína"],
      nota: "",
    },
    {
      momento: "Almuerzo",
      opciones: ["Pechuga de pollo + arroz + ensalada", "Salmón + quinoa + vegetales"],
      nota: "",
    },
    {
      momento: "Merienda",
      opciones: ["Requesón + nueces", "Tostada integral + aguacate"],
      nota: "",
    },
    {
      momento: "Cena",
      opciones: ["Carne magra + vegetales al vapor", "Tortilla de claras + ensalada"],
      nota: "",
    },
  ],
  recomendaciones: [
    "Prioriza proteína en cada comida.",
    "Elige carbohidratos integrales.",
    "Modera azúcares y ultraprocesados.",
  ],
  consejos: [
    "Bebe agua antes de cada comida.",
    "Come despacio y sin pantallas.",
    "Duerme 7-8 h para recuperar.",
  ],
};
