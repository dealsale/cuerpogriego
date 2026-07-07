import { prisma } from "@/lib/prisma";

export async function getExerciseCatalog() {
  return prisma.exerciseMedia.findMany({
    select: { id: true, name: true, normalizedName: true, mediaType: true, mediaUrl: true },
    orderBy: { name: "asc" },
  });
}

export type ExerciseCatalogEntry = Awaited<ReturnType<typeof getExerciseCatalog>>[number];
