import Link from "next/link";
import { requireUser } from "@/lib/session";
import { fromJson } from "@/lib/json";
import { ProfileForm } from "@/components/app/ProfileForm";
import { SignOutButton } from "@/components/app/SignOutButton";

export default async function PerfilPage() {
  const user = await requireUser();
  const inicial = (user.name || "A").trim().charAt(0).toUpperCase() || "A";
  const lesiones = fromJson<string[]>(user.injuriesJson, []);

  return (
    <div className="animate-[cgFade_0.4s_ease_both]">
      <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
        Tu cuenta
      </span>
      <h1 className="font-display font-bold text-[clamp(26px,5vw,38px)] mt-2 mb-5.5">Perfil</h1>

      <div className="flex items-center gap-4 bg-card border border-gold/16 p-5 mb-4.5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-[#7a1e5c] flex items-center justify-center text-ink font-display font-bold text-2xl">
          {inicial}
        </div>
        <div>
          <div className="font-display text-xl">{user.name}</div>
          <div className="text-[13px] text-muted-3">{user.email}</div>
        </div>
      </div>

      <ProfileForm
        initialPeso={user.weight?.toString() || ""}
        initialAltura={user.height?.toString() || ""}
        initialObjetivo={user.goal || ""}
        initialDias={String(user.daysPerWeek)}
        initialLesiones={lesiones}
      />

      <div className="flex gap-3">
        {user.isAdmin && (
          <Link
            href="/admin"
            className="flex-1 text-center bg-transparent text-muted-2 border border-gold/28 py-3.5 text-xs tracking-[0.1em] uppercase hover:border-gold hover:text-gold"
          >
            Panel administrativo
          </Link>
        )}
        <SignOutButton />
      </div>
    </div>
  );
}
