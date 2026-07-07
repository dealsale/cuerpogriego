// Ported from the Cuerpo Griego design prototype (Component.patronInfo / inferPatron /
// inferEjercicio / normalizeRutina) — same domain logic, reimplemented for the real app.

export type Pattern =
  | "press-horizontal"
  | "press-vertical"
  | "jalon"
  | "remo"
  | "curl"
  | "extension-triceps"
  | "elevacion-lateral"
  | "sentadilla"
  | "peso-muerto"
  | "zancada"
  | "abdomen"
  | "cardio"
  | "generico";

export interface PatternInfo {
  label: string;
  musculos: string[];
  musculosSec: string[];
  tempo: string;
  respiracion: string;
  equipo: string;
  tecnica: string[];
  errores: string[];
}

export const PATTERN_INFO: Record<Pattern, PatternInfo> = {
  "press-horizontal": {
    label: "Empuje horizontal",
    musculos: ["pecho"],
    musculosSec: ["hombro", "triceps"],
    tempo: "2-0-1",
    respiracion: "Inhala al bajar, exhala al empujar",
    equipo: "Barra o mancuernas",
    tecnica: [
      "Retrae y deprime las escápulas.",
      "Baja al esternón con los codos a ~45°.",
      "Empuja sin bloquear los codos de golpe.",
    ],
    errores: ["Rebotar la barra en el pecho.", "Despegar los glúteos del banco."],
  },
  "press-vertical": {
    label: "Empuje vertical",
    musculos: ["hombro"],
    musculosSec: ["triceps", "trapecio"],
    tempo: "2-0-1",
    respiracion: "Exhala al subir",
    equipo: "Barra o mancuernas",
    tecnica: [
      "Core firme y costillas hacia abajo.",
      "Empuja sobre la cabeza sin arquear la espalda.",
      "Alinea las muñecas sobre los codos.",
    ],
    errores: ["Arquear la zona lumbar.", "Dejar la carga por delante de la cabeza."],
  },
  jalon: {
    label: "Tracción vertical",
    musculos: ["dorsal"],
    musculosSec: ["biceps", "trapecio"],
    tempo: "2-1-2",
    respiracion: "Exhala al jalar",
    equipo: "Polea alta",
    tecnica: [
      "Lleva los codos hacia las costillas.",
      "Baja a la clavícula sin balanceo.",
      "Controla la subida manteniendo la tensión.",
    ],
    errores: ["Impulsar con el tronco.", "Encoger los hombros."],
  },
  remo: {
    label: "Tracción horizontal",
    musculos: ["dorsal"],
    musculosSec: ["biceps", "trapecio"],
    tempo: "2-1-2",
    respiracion: "Exhala al jalar",
    equipo: "Barra, mancuerna o polea",
    tecnica: [
      "Espalda neutra y pecho arriba.",
      "Lleva el codo atrás pegado al cuerpo.",
      "Junta las escápulas al final.",
    ],
    errores: ["Redondear la espalda.", "Usar impulso de cadera."],
  },
  curl: {
    label: "Flexión de codo",
    musculos: ["biceps"],
    musculosSec: ["antebrazo"],
    tempo: "2-1-2",
    respiracion: "Exhala al subir",
    equipo: "Mancuernas o barra",
    tecnica: [
      "Codos fijos a los costados.",
      "Sube controlando, sin balancear.",
      "Aprieta arriba y baja lento.",
    ],
    errores: ["Adelantar los codos.", "Usar impulso de la espalda."],
  },
  "extension-triceps": {
    label: "Extensión de codo",
    musculos: ["triceps"],
    musculosSec: [],
    tempo: "2-0-2",
    respiracion: "Exhala al extender",
    equipo: "Polea o mancuerna",
    tecnica: [
      "Codos fijos apuntando al frente.",
      "Extiende del todo sin golpear.",
      "Controla el regreso.",
    ],
    errores: ["Abrir los codos.", "Mover el hombro."],
  },
  "elevacion-lateral": {
    label: "Abducción de hombro",
    musculos: ["hombro"],
    musculosSec: ["trapecio"],
    tempo: "1-1-2",
    respiracion: "Exhala al subir",
    equipo: "Mancuernas",
    tecnica: [
      "Mantén una ligera flexión de codo.",
      "Sube hasta la altura de los hombros.",
      "Lidera el gesto con los codos.",
    ],
    errores: ["Subir con impulso.", "Encoger el cuello."],
  },
  sentadilla: {
    label: "Dominante de rodilla",
    musculos: ["cuadriceps", "gluteos"],
    musculosSec: ["isquios", "lumbar"],
    tempo: "3-1-1",
    respiracion: "Inhala al bajar, exhala al subir",
    equipo: "Barra o peso corporal",
    tecnica: [
      "Pies al ancho de hombros, puntas algo afuera.",
      "Baja llevando la cadera atrás y abajo.",
      "Rodillas en línea con los pies.",
    ],
    errores: ["Que las rodillas se metan hacia dentro.", "Levantar los talones."],
  },
  "peso-muerto": {
    label: "Dominante de cadera",
    musculos: ["isquios", "gluteos"],
    musculosSec: ["lumbar", "dorsal"],
    tempo: "2-1-2",
    respiracion: "Exhala al subir",
    equipo: "Barra o mancuernas",
    tecnica: [
      "Espalda neutra en todo el recorrido.",
      "Empuja el suelo llevando la cadera al frente.",
      "Mantén la carga pegada al cuerpo.",
    ],
    errores: ["Redondear la espalda baja.", "Hiperextender al final."],
  },
  zancada: {
    label: "Unilateral de pierna",
    musculos: ["cuadriceps", "gluteos"],
    musculosSec: ["isquios"],
    tempo: "2-0-1",
    respiracion: "Exhala al subir",
    equipo: "Mancuernas o peso corporal",
    tecnica: [
      "Paso firme y tronco erguido.",
      "Baja la rodilla trasera hacia el suelo.",
      "Empuja con el talón delantero.",
    ],
    errores: ["Adelantar demasiado la rodilla.", "Perder el equilibrio del tronco."],
  },
  abdomen: {
    label: "Core",
    musculos: ["abdomen"],
    musculosSec: ["oblicuos"],
    tempo: "2-1-2",
    respiracion: "Exhala en el esfuerzo",
    equipo: "Peso corporal",
    tecnica: [
      "Activa el abdomen antes de moverte.",
      "No tires del cuello con las manos.",
      "Controla la fase de bajada.",
    ],
    errores: ["Aguantar la respiración.", "Usar impulso."],
  },
  cardio: {
    label: "Acondicionamiento",
    musculos: ["cuadriceps", "gemelos"],
    musculosSec: ["abdomen", "gluteos"],
    tempo: "Continuo",
    respiracion: "Rítmica y constante",
    equipo: "Peso corporal",
    tecnica: [
      "Mantén un ritmo sostenible.",
      "Aterriza suave con el mediopié.",
      "Respira de forma rítmica.",
    ],
    errores: ["Empezar demasiado fuerte.", "Perder la postura al cansarte."],
  },
  generico: {
    label: "General",
    musculos: [],
    musculosSec: [],
    tempo: "2-1-2",
    respiracion: "Exhala en el esfuerzo",
    equipo: "—",
    tecnica: [
      "Ejecuta con técnica controlada.",
      "Mantén el core activo.",
      "Respira de forma constante.",
    ],
    errores: ["Sacrificar la técnica por la carga."],
  },
};

export const KNOWN_MUSCLES = new Set([
  "pecho",
  "hombro",
  "biceps",
  "triceps",
  "antebrazo",
  "abdomen",
  "oblicuos",
  "dorsal",
  "trapecio",
  "lumbar",
  "cuadriceps",
  "isquios",
  "gluteos",
  "gemelos",
  "aductores",
]);

export const MUSCLE_LABELS: Record<string, string> = {
  pecho: "Pectoral",
  hombro: "Deltoides",
  biceps: "Bíceps",
  triceps: "Tríceps",
  antebrazo: "Antebrazo",
  abdomen: "Abdomen",
  oblicuos: "Oblicuos",
  dorsal: "Dorsal",
  trapecio: "Trapecio",
  lumbar: "Lumbar",
  cuadriceps: "Cuádriceps",
  isquios: "Isquiotibiales",
  gluteos: "Glúteos",
  gemelos: "Gemelos",
  aductores: "Aductores",
};

const DIACRITICS_RE = new RegExp("[\\u0300-\\u036f]", "g");

function stripAccents(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(DIACRITICS_RE, "");
}

export function inferPatron(nombre: string | undefined | null): Pattern {
  const n = stripAccents(nombre || "");
  const has = (...ks: string[]) => ks.some((k) => n.includes(k));
  if (has("zancada", "desplante", "lunge", "bulgar", "split squat")) return "zancada";
  if (has("sentadilla", "squat", "prensa", "pistol", "hack")) return "sentadilla";
  if (has("peso muerto", "muerto", "hip thrust", "puente", "rumano", "buenos dias", "glute"))
    return "peso-muerto";
  if (has("press militar", "militar", "press de hombro", "overhead", "arnold"))
    return "press-vertical";
  if (has("elevacion lateral", "lateral", "pajaro", "vuelo", "face pull"))
    return "elevacion-lateral";
  if (has("jalon", "dominada", "pull up", "pull-up", "pullover", "pulldown", "pull down"))
    return "jalon";
  if (has("remo", "row")) return "remo";
  if (has("curl")) return "curl";
  if (has("triceps", "patada", "frances", "copa", "fondo en banco", "extension de codo"))
    return "extension-triceps";
  if (has("press", "banca", "flexion", "fondo", "push up", "push-up", "pecho", "apertura", "pec"))
    return "press-horizontal";
  if (
    has(
      "plancha",
      "abdomen",
      "abdominal",
      "crunch",
      "core",
      "russian",
      "elevacion de pierna",
      "rueda",
      "ab wheel",
      "mountain",
      "encogimiento"
    )
  )
    return "abdomen";
  if (
    has(
      "burpee",
      "salto",
      "cuerda",
      "correr",
      "trote",
      "carrera",
      "jumping",
      "sprint",
      "eliptica",
      "bici",
      "cardio",
      "escalador"
    )
  )
    return "cardio";
  return "generico";
}

export interface RawExercise {
  nombre?: string;
  series?: number;
  reps?: string;
  descanso?: string;
  nota?: string;
  patron?: string;
  musculos?: string[];
  musculosSec?: string[];
  tecnica?: string[];
  errores?: string[];
  tempo?: string;
  respiracion?: string;
  equipo?: string;
}

export interface NormalizedExercise {
  nombre: string;
  series: number;
  reps: string;
  descanso: string;
  nota: string;
  patron: Pattern;
  patronLabel: string;
  musculos: string[];
  musculosSec: string[];
  tecnica: string[];
  errores: string[];
  tempo: string;
  respiracion: string;
  equipo: string;
}

function filterKnownMuscles(a: unknown): string[] {
  return Array.isArray(a) ? a.filter((x) => KNOWN_MUSCLES.has(x)) : [];
}

function orDefaultArr(a: unknown, fallback: string[]): string[] {
  return Array.isArray(a) && a.length ? (a as string[]) : fallback.slice();
}

export function inferEjercicio(ej: RawExercise | undefined | null): NormalizedExercise {
  const raw = ej || {};
  const pattern: Pattern =
    raw.patron && raw.patron in PATTERN_INFO ? (raw.patron as Pattern) : inferPatron(raw.nombre);
  const info = PATTERN_INFO[pattern] || PATTERN_INFO.generico;
  const musculos = filterKnownMuscles(raw.musculos);
  const musculosSec = filterKnownMuscles(raw.musculosSec);
  return {
    nombre: raw.nombre || "Ejercicio",
    series: raw.series || 3,
    reps: raw.reps || "10",
    descanso: raw.descanso || "60 s",
    nota: raw.nota || "",
    patron: pattern,
    patronLabel: info.label,
    musculos: musculos.length ? musculos : info.musculos.slice(),
    musculosSec: musculosSec.length ? musculosSec : info.musculosSec.slice(),
    tecnica: orDefaultArr(raw.tecnica, info.tecnica),
    errores: orDefaultArr(raw.errores, info.errores),
    tempo: raw.tempo || info.tempo,
    respiracion: raw.respiracion || info.respiracion,
    equipo: raw.equipo || info.equipo,
  };
}

export interface RawDay {
  nombre?: string;
  enfoque?: string;
  duracion?: string;
  ejercicios?: RawExercise[];
}

export interface NormalizedDay {
  nombre: string;
  enfoque: string;
  duracion: string;
  ejercicios: NormalizedExercise[];
}

export interface RawRutina {
  resumen?: string;
  diasPorSemana?: number;
  duracionEstimada?: string;
  intensidad?: string;
  advertencias?: string[];
  recomendaciones?: string[];
  dias?: RawDay[];
}

export interface NormalizedRutina {
  resumen: string;
  diasPorSemana: number;
  duracionEstimada: string;
  intensidad: string;
  advertencias: string[];
  recomendaciones: string[];
  dias: NormalizedDay[];
}

export function normalizeRutina(data: RawRutina | undefined | null): NormalizedRutina {
  const d = data || {};
  const dias = Array.isArray(d.dias) ? d.dias : [];
  return {
    resumen: d.resumen || "",
    diasPorSemana: d.diasPorSemana || dias.length || 0,
    duracionEstimada: d.duracionEstimada || "—",
    intensidad: d.intensidad || "Media",
    advertencias: Array.isArray(d.advertencias) ? d.advertencias : [],
    recomendaciones: Array.isArray(d.recomendaciones) ? d.recomendaciones : [],
    dias: dias.map((day) => ({
      nombre: day.nombre || "Día",
      enfoque: day.enfoque || "",
      duracion: day.duracion || "—",
      ejercicios: (Array.isArray(day.ejercicios) ? day.ejercicios : []).map(inferEjercicio),
    })),
  };
}
