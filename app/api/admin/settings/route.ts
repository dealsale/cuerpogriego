import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { setRegistrationOpen } from "@/lib/appSettings";

const schema = z.object({ registrationOpen: z.boolean() });

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const settings = await setRegistrationOpen(parsed.data.registrationOpen);
  return NextResponse.json({ ok: true, settings });
}
