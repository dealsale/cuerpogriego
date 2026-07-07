import { requireUser } from "@/lib/session";
import { getDietForUser } from "@/lib/queries";

export default async function AlimentacionPage() {
  const user = await requireUser();
  const dieta = await getDietForUser(user.id);

  return (
    <div className="animate-[cgFade_0.4s_ease_both]">
      <div className="flex items-end justify-between gap-4 mb-5.5 flex-wrap">
        <div>
          <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
            Tu plan nutricional
          </span>
          <h1 className="font-display font-bold text-[clamp(26px,5vw,38px)] mt-2 mb-0">
            Mi alimentación
          </h1>
        </div>
      </div>

      {!dieta ? (
        <div className="text-center py-20 px-5">
          <div className="w-10 h-10 border-[3px] border-gold/25 border-t-gold rounded-full animate-[cgSpin_0.8s_linear_infinite] mx-auto" />
          <p className="font-quote italic text-[22px] text-muted-1 mt-5.5">
            La IA está preparando tu dieta…
          </p>
        </div>
      ) : (
        <div>
          <p className="font-quote text-xl leading-[1.5] text-muted-1 mb-5">{dieta.resumen}</p>
          <div className="flex flex-wrap gap-2.5 mb-6">
            <div className="bg-card border border-gold/20 px-4 py-2.5">
              <span className="text-muted-3 text-xs">Energía</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{dieta.calorias}</span>
            </div>
            <div className="bg-card border border-gold/20 px-4 py-2.5">
              <span className="text-muted-3 text-xs">Agua</span>{" "}
              <span className="font-display text-gold-light ml-1.5">{dieta.agua}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {dieta.comidas.map((c) => (
              <div key={c.id} className="grid gap-4 bg-card border border-gold/16 px-5 py-4.5" style={{ gridTemplateColumns: "118px 1fr" }}>
                <div className="border-r border-gold/15 pr-3">
                  <div className="font-display text-[15px] text-gold-light leading-tight">{c.momento}</div>
                </div>
                <div>
                  {c.opciones.map((op, i) => (
                    <div key={i} className="flex gap-2.5 py-1 text-[14.5px] text-muted-1 leading-[1.5]">
                      <span className="text-gold">·</span>
                      <span>{op}</span>
                    </div>
                  ))}
                  {c.nota && <div className="text-[12.5px] text-muted-3 mt-1.5 italic">{c.nota}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3.5 mt-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            <div className="bg-card border border-gold/16 p-5">
              <div className="font-display text-[15px] text-gold-light mb-3">Recomendaciones</div>
              {dieta.recomendaciones.map((r, i) => (
                <div key={i} className="flex gap-2.5 py-1.5 text-sm text-muted-1 leading-[1.5]">
                  <span className="text-gold">✦</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
            <div className="bg-card border border-gold/16 p-5">
              <div className="font-display text-[15px] text-gold-light mb-3">Consejos saludables</div>
              {dieta.consejos.map((cs, i) => (
                <div key={i} className="flex gap-2.5 py-1.5 text-sm text-muted-1 leading-[1.5]">
                  <span className="text-gold">✦</span>
                  <span>{cs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
