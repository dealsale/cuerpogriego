import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

const schema = z.object({ message: z.string().trim().min(1) });

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });

  const announcement = await prisma.announcement.create({ data: { message: parsed.data.message } });
  return NextResponse.json({ ok: true, announcement });
}
