import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toJson } from "@/lib/json";
import { generatePlanForUser } from "@/lib/planGeneration";

const onboardingSchema = z.object({
  nombre: z.string().trim().min(1),
  edad: z.coerce.number().int().positive(),
  sexo: z.string().trim().min(1),
  peso: z.coerce.number().positive(),
  altura: z.coerce.number().positive(),
  objetivo: z.string().trim().min(1),
  tieneLesion: z.boolean(),
  lesiones: z.array(z.string()).default([]),
  lesionDesc: z.string().optional().default(""),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Datos inválidos" },
      { status: 400 }
    );
  }

  const d = parsed.data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: d.nombre,
      age: d.edad,
      sex: d.sexo,
      weight: d.peso,
      height: d.altura,
      goal: d.objetivo,
      hasInjury: d.tieneLesion,
      injuriesJson: toJson(d.tieneLesion ? d.lesiones : []),
      injuryDesc: d.tieneLesion ? d.lesionDesc : "",
      onboarded: true,
    },
  });

  await generatePlanForUser(session.user.id);

  return NextResponse.json({ ok: true });
}
