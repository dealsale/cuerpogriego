import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { signUpload } from "@/lib/cloudinarySign";

export async function POST() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  return NextResponse.json(signUpload("cuerpo-griego/exercises"));
}
