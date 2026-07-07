import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toJson } from "@/lib/json";

const schema = z.object({
  peso: z.coerce.number().positive(),
  altura: z.coerce.number().positive(),
  objetivo: z.string().min(1),
  lesiones: z.array(z.string()).default([]),
});

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const d = parsed.data;
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      weight: d.peso,
      height: d.altura,
      goal: d.objetivo,
      hasInjury: d.lesiones.length > 0,
      injuriesJson: toJson(d.lesiones),
    },
  });

  return NextResponse.json({ ok: true });
}
