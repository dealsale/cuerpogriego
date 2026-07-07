import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";
import { deleteUploadedFile } from "@/lib/upload";
import { PATTERN_INFO } from "@/lib/exercisePatterns";

const schema = z.object({
  name: z.string().trim().min(1).optional(),
  pattern: z.string().nullable().optional(),
  mediaType: z.enum(["video", "gif"]).nullable().optional(),
  mediaUrl: z.string().url().nullable().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const { id } = await params;
  const existing = await prisma.exerciseMedia.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Datos inválidos" },
      { status: 400 }
    );
  }

  const d = parsed.data;
  if (d.pattern && !(d.pattern in PATTERN_INFO)) {
    return NextResponse.json({ error: "Patrón inválido" }, { status: 400 });
  }

  if (d.mediaUrl) {
    await deleteUploadedFile(existing.mediaUrl);
  }

  const exercise = await prisma.exerciseMedia.update({
    where: { id },
    data: {
      name: d.name ?? existing.name,
      pattern: d.pattern !== undefined ? d.pattern : existing.pattern,
      mediaType: d.mediaUrl ? d.mediaType : existing.mediaType,
      mediaUrl: d.mediaUrl ? d.mediaUrl : existing.mediaUrl,
    },
  });

  return NextResponse.json({ ok: true, exercise });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const { id } = await params;
  const existing = await prisma.exerciseMedia.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  await deleteUploadedFile(existing.mediaUrl);
  await prisma.exerciseMedia.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
