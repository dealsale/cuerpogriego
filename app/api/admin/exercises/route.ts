import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";
import { normalizeName } from "@/lib/exerciseMatch";
import { PATTERN_INFO } from "@/lib/exercisePatterns";

const schema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  pattern: z.string().nullable().optional(),
  mediaType: z.enum(["video", "gif"]).nullable().optional(),
  mediaUrl: z.string().url().nullable().optional(),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const exercises = await prisma.exerciseMedia.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ exercises });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Datos inválidos" },
      { status: 400 }
    );
  }

  const { name, pattern, mediaType, mediaUrl } = parsed.data;
  if (pattern && !(pattern in PATTERN_INFO)) {
    return NextResponse.json({ error: "Patrón inválido" }, { status: 400 });
  }

  const normalizedName = normalizeName(name);
  const exercise = await prisma.exerciseMedia.upsert({
    where: { normalizedName },
    update: { name, pattern, ...(mediaUrl ? { mediaType, mediaUrl } : {}) },
    create: { name, normalizedName, pattern: pattern ?? null, mediaType: mediaType ?? null, mediaUrl: mediaUrl ?? null },
  });

  return NextResponse.json({ ok: true, exercise });
}
