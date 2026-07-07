import { prisma } from "@/lib/prisma";

export default async function AdminStatsPage() {
  // eslint-disable-next-line react-hooks/purity -- server component, computed fresh per request
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [totalUsers, activeUsers, suspendedUsers, routineCount, dietCount, newThisWeek, exerciseMediaCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isSuspended: false } }),
      prisma.user.count({ where: { isSuspended: true } }),
      prisma.routine.count(),
      prisma.diet.count(),
      prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.exerciseMedia.count({ where: { mediaUrl: { not: null } } }),
    ]);

  const stats = [
    { label: "Usuarios totales", value: totalUsers },
    { label: "Activos", value: activeUsers },
    { label: "Suspendidos", value: suspendedUsers },
    { label: "Nuevos esta semana", value: newThisWeek },
    { label: "Rutinas generadas", value: routineCount },
    { label: "Dietas generadas", value: dietCount },
    { label: "Ejercicios con video/gif", value: exerciseMediaCount },
  ];

  return (
    <div>
      <div className="mb-7">
        <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
          Panel administrativo
        </span>
        <h1 className="font-display font-bold text-[34px] mt-2 mb-0">Estadísticas</h1>
      </div>
      <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-gold/16 p-5.5">
            <div className="text-[11px] tracking-[0.12em] uppercase text-muted-3">{s.label}</div>
            <div className="font-display text-[32px] text-gold-light mt-2">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
