import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { PATTERN_INFO } from "@/lib/exercisePatterns";

const ACCEPTED_VIDEO = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const ACCEPTED_GIF = new Set(["image/gif"]);
const MAX_SIZE = 20 * 1024 * 1024;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const { id } = await params;
  const existing = await prisma.exerciseMedia.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const form = await request.formData();
  const name = form.get("name") ? String(form.get("name")).trim() : existing.name;
  const pattern = form.has("pattern") ? String(form.get("pattern")) || null : existing.pattern;
  const file = form.get("file");

  if (pattern && !(pattern in PATTERN_INFO)) {
    return NextResponse.json({ error: "Patrón inválido" }, { status: 400 });
  }

  let mediaType = existing.mediaType;
  let mediaUrl = existing.mediaUrl;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "El archivo supera los 20 MB" }, { status: 400 });
    }
    if (ACCEPTED_VIDEO.has(file.type)) mediaType = "video";
    else if (ACCEPTED_GIF.has(file.type)) mediaType = "gif";
    else return NextResponse.json({ error: "Formato no soportado (usa mp4, webm o gif)" }, { status: 400 });

    await deleteUploadedFile(existing.mediaUrl);
    mediaUrl = await saveUploadedFile(file, "exercises");
  }

  const exercise = await prisma.exerciseMedia.update({
    where: { id },
    data: { name, pattern, mediaType, mediaUrl },
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
