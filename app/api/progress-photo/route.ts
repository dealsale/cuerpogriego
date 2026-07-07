import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteUploadedFile } from "@/lib/upload";

const VALID_SLOTS = new Set(["inicio", "semana4", "actual"]);

const schema = z.object({
  slot: z.enum(["inicio", "semana4", "actual"]),
  url: z.string().url(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success || !VALID_SLOTS.has(parsed.data.slot)) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const { slot, url } = parsed.data;

  const existing = await prisma.progressPhoto.findUnique({
    where: { userId_slot: { userId: session.user.id, slot } },
  });
  if (existing) await deleteUploadedFile(existing.url);

  await prisma.progressPhoto.upsert({
    where: { userId_slot: { userId: session.user.id, slot } },
    update: { url },
    create: { userId: session.user.id, slot, url },
  });

  return NextResponse.json({ ok: true, url });
}
