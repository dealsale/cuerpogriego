import { prisma } from "@/lib/prisma";
import { SuspendButton } from "@/components/admin/SuspendButton";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export default async function AdminUsersPage() {
  const [users, totalUsers, activeUsers, suspendedUsers, routineCount] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.user.count(),
    prisma.user.count({ where: { isSuspended: false } }),
    prisma.user.count({ where: { isSuspended: true } }),
    prisma.routine.count(),
  ]);

  const stats = [
    { label: "Usuarios totales", value: totalUsers },
    { label: "Activos", value: activeUsers },
    { label: "Suspendidos", value: suspendedUsers },
    { label: "Planes generados", value: routineCount },
  ];

  return (
    <div>
      <div className="flex items-end justify-between mb-7 flex-wrap gap-3">
        <div>
          <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
            Panel administrativo
          </span>
          <h1 className="font-display font-bold text-[34px] mt-2 mb-0">Usuarios registrados</h1>
        </div>
      </div>

      <div className="grid gap-3.5 mb-7" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-gold/16 p-5.5">
            <div className="text-[11px] tracking-[0.12em] uppercase text-muted-3">{s.label}</div>
            <div className="font-display text-[32px] text-gold-light mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-gold/16">
        <div
          className="grid gap-3 px-5 py-3.5 border-b border-gold/16 text-[11px] tracking-[0.1em] uppercase text-muted-3"
          style={{ gridTemplateColumns: "2fr 1.3fr 1fr 1fr 1.2fr" }}
        >
          <div>Usuario</div>
          <div>Objetivo</div>
          <div>Estado</div>
          <div>Planes</div>
          <div className="text-right">Acciones</div>
        </div>
        {users.map((u) => {
          const inicial = (u.name || "A").trim().charAt(0).toUpperCase() || "A";
          return (
            <div
              key={u.id}
              className="grid gap-3 px-5 py-4 border-b border-white/[0.04] items-center"
              style={{ gridTemplateColumns: "2fr 1.3fr 1fr 1fr 1.2fr" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-[#7A5F28] flex items-center justify-center text-ink font-display font-bold text-xs">
                  {inicial}
                </div>
                <div>
                  <div className="text-sm text-cream">{u.name}</div>
                  <div className="text-xs text-muted-4">{u.email}</div>
                </div>
              </div>
              <div className="text-[13.5px] text-muted-1">{u.goal || "—"}</div>
              <div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: u.isSuspended ? "rgba(210,120,80,0.15)" : "rgba(127,176,105,0.15)",
                    color: u.isSuspended ? "#D2784F" : "#8FBF75",
                  }}
                >
                  {u.isSuspended ? "Suspendido" : "Activo"}
                </span>
              </div>
              <div className="font-display text-[15px] text-gold-light">{u.isAdmin ? "—" : "1"}</div>
              <div className="flex gap-2 justify-end">
                <button className="bg-transparent border border-gold/30 text-muted-2 px-3 py-1.5 text-xs cursor-pointer hover:border-gold hover:text-gold">
                  Editar
                </button>
                {!u.isAdmin && <SuspendButton userId={u.id} isSuspended={u.isSuspended} />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3.5 mt-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div className="bg-card border border-gold/16 p-5.5">
          <div className="font-display text-[15px] text-gold-light mb-3.5">Anuncio global</div>
          <AnnouncementForm />
        </div>
        <div className="bg-card border border-gold/16 p-5.5">
          <div className="font-display text-[15px] text-gold-light mb-3.5">Parámetros generales</div>
          <div className="flex items-center justify-between py-2.5 border-b border-white/5 text-sm text-muted-1">
            <span>Registro de nuevos usuarios</span>
            <span className="text-[#6B8A5F]">Activo</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-white/5 text-sm text-muted-1">
            <span>Motor de IA</span>
            <span className="text-gold-light">
              {process.env.DEEPSEEK_API_KEY ? "DeepSeek" : "DeepSeek (sin API key — usando datos de respaldo)"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5 text-sm text-muted-1">
            <span>Plan Premium</span>
            <span className="text-muted-3">Próximamente</span>
          </div>
        </div>
      </div>
    </div>
  );
}
