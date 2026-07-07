const DIACRITICS_RE = new RegExp("[\\u0300-\\u036f]", "g");

export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_RE, "")
    .trim()
    .replace(/\s+/g, " ");
}

export interface ExerciseMediaLike {
  id: string;
  name: string;
  normalizedName: string;
  mediaType: string | null;
  mediaUrl: string | null;
}

export function findExerciseMedia<T extends ExerciseMediaLike>(
  exerciseName: string,
  catalog: T[]
): T | null {
  const withMedia = catalog.filter((m) => m.mediaUrl);
  if (!withMedia.length) return null;

  const target = normalizeName(exerciseName);

  const exact = withMedia.find((m) => m.normalizedName === target);
  if (exact) return exact;

  const fuzzy = withMedia.find(
    (m) => target.includes(m.normalizedName) || m.normalizedName.includes(target)
  );
  return fuzzy || null;
}
