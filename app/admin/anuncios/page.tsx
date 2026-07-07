import { prisma } from "@/lib/prisma";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-7">
        <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
          Panel administrativo
        </span>
        <h1 className="font-display font-bold text-[34px] mt-2 mb-0">Anuncios</h1>
      </div>

      <div className="bg-card border border-gold/16 p-5.5 mb-5">
        <div className="font-display text-[15px] text-gold-light mb-3.5">Anuncio global</div>
        <AnnouncementForm />
      </div>

      <div className="bg-card border border-gold/16">
        <div className="px-5 py-3.5 border-b border-gold/16 text-[11px] tracking-[0.1em] uppercase text-muted-3">
          Historial
        </div>
        {announcements.length === 0 && (
          <div className="px-5 py-8 text-center text-muted-3 text-sm">
            Todavía no publicaste ningún anuncio.
          </div>
        )}
        {announcements.map((a) => (
          <div key={a.id} className="px-5 py-4 border-b border-white/[0.04]">
            <div className="text-[14px] text-cream leading-[1.5]">{a.message}</div>
            <div className="text-xs text-muted-4 mt-1.5">
              {a.createdAt.toLocaleString("es", { dateStyle: "medium", timeStyle: "short" })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
