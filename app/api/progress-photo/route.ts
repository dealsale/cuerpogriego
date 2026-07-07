import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";

const VALID_SLOTS = new Set(["inicio", "semana4", "actual"]);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const form = await request.formData();
  const slot = String(form.get("slot") || "");
  const file = form.get("file");

  if (!VALID_SLOTS.has(slot) || !(file instanceof File)) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "El archivo debe ser una imagen" }, { status: 400 });
  }

  const existing = await prisma.progressPhoto.findUnique({
    where: { userId_slot: { userId: session.user.id, slot } },
  });
  if (existing) await deleteUploadedFile(existing.url);

  const url = await saveUploadedFile(file, "progress");

  await prisma.progressPhoto.upsert({
    where: { userId_slot: { userId: session.user.id, slot } },
    update: { url },
    create: { userId: session.user.id, slot, url },
  });

  return NextResponse.json({ ok: true, url });
}
