import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({ weight: z.coerce.number().positive() });

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Peso inválido" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.weightLog.create({ data: { userId: session.user.id, weight: parsed.data.weight } }),
    prisma.user.update({ where: { id: session.user.id }, data: { weight: parsed.data.weight } }),
  ]);

  return NextResponse.json({ ok: true });
}
