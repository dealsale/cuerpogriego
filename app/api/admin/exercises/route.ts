import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";
import { normalizeName } from "@/lib/exerciseMatch";
import { saveUploadedFile } from "@/lib/upload";
import { PATTERN_INFO } from "@/lib/exercisePatterns";

const ACCEPTED_VIDEO = new Set(["video/mp4", "video/webm"]);
const ACCEPTED_GIF = new Set(["image/gif"]);
const MAX_SIZE = 20 * 1024 * 1024;

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const exercises = await prisma.exerciseMedia.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ exercises });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const pattern = String(form.get("pattern") || "") || null;
  const file = form.get("file");

  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }
  if (pattern && !(pattern in PATTERN_INFO)) {
    return NextResponse.json({ error: "Patrón inválido" }, { status: 400 });
  }

  let mediaType: string | null = null;
  let mediaUrl: string | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "El archivo supera los 20 MB" }, { status: 400 });
    }
    if (ACCEPTED_VIDEO.has(file.type)) mediaType = "video";
    else if (ACCEPTED_GIF.has(file.type)) mediaType = "gif";
    else return NextResponse.json({ error: "Formato no soportado (usa mp4, webm o gif)" }, { status: 400 });

    mediaUrl = await saveUploadedFile(file, "exercises");
  }

  const normalizedName = normalizeName(name);
  const exercise = await prisma.exerciseMedia.upsert({
    where: { normalizedName },
    update: { name, pattern, ...(mediaUrl ? { mediaType, mediaUrl } : {}) },
    create: { name, normalizedName, pattern, mediaType, mediaUrl },
  });

  return NextResponse.json({ ok: true, exercise });
}
