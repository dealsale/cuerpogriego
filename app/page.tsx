import { QuoteBanner } from "@/components/landing/QuoteBanner";
import { BenefitIcon } from "@/components/landing/BenefitIcon";
import { GoldButton } from "@/components/ui/GoldButton";

const BENEFICIOS = [
  {
    icon: "rutinas" as const,
    title: "Rutinas por IA",
    body: "Días, ejercicios, series, repeticiones, descansos e intensidad. Nunca una rutina genérica.",
  },
  {
    icon: "dieta" as const,
    title: "Dieta personalizada",
    body: "Desayuno, media mañana, almuerzo, merienda y cena, con agua y consejos nutricionales.",
  },
  {
    icon: "progreso" as const,
    title: "Progreso medible",
    body: "Registra peso, medidas y fotografías. Observa tu evolución semana a semana.",
  },
  {
    icon: "disponible" as const,
    title: "Disponible 24/7",
    body: "Tu entrenador siempre listo. Cambia tus datos y la IA ajusta el plan al instante.",
  },
  {
    icon: "lesiones" as const,
    title: "Cuida tus lesiones",
    body: "Indica cualquier lesión y recibirás advertencias y adaptaciones seguras.",
  },
  {
    icon: "app" as const,
    title: "Instálala como app",
    body: "Funciona en celular, tablet y computador. Instálala desde tu navegador (PWA).",
  },
];

const PASOS = [
  {
    n: "I",
    title: "Cuéntanos de ti",
    body: "Peso, altura, objetivo y posibles lesiones. Solo lo necesario.",
  },
  {
    n: "II",
    title: "La IA crea tu plan",
    body: "Rutina y dieta a tu medida, como las diseñaría un profesional.",
  },
  {
    n: "III",
    title: "Entrena y avanza",
    body: "Sigue tu plan, registra tu progreso y supérate cada día.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* NAV */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-[clamp(20px,5vw,64px)] py-[18px] bg-ink/[0.82] backdrop-blur-md border-b border-gold/18">
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] border-[1.5px] border-gold flex items-center justify-center text-gold font-display font-extrabold text-[17px]">
            Y
          </div>
          <div className="font-display font-bold tracking-[0.28em] text-[15px] text-cream">
            CVERPO GRIEGO
          </div>
        </div>
        <div className="flex items-center gap-[clamp(14px,3vw,34px)]">
          <a href="#beneficios" className="text-[13.5px] tracking-[0.08em] text-muted-2 hidden sm:inline">
            Beneficios
          </a>
          <a href="#como" className="text-[13.5px] tracking-[0.08em] text-muted-2 hidden sm:inline">
            Cómo funciona
          </a>
          <a
            href="/login?mode=login"
            className="text-[13.5px] tracking-[0.08em] text-cream px-1 py-2"
          >
            Iniciar sesión
          </a>
          <GoldButton
            as="a"
            href="/login?mode=register"
            className="!inline-block !py-[11px] !px-[22px] !text-[13px]"
          >
            Registrarse
          </GoldButton>
        </div>
      </div>

      {/* HERO */}
      <div className="relative grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center px-[clamp(20px,5vw,64px)] py-[clamp(48px,8vh,100px)] max-w-[1320px] mx-auto">
        <div className="animate-[cgFadeUp_0.9s_ease_both]">
          <div className="flex items-center gap-3.5 mb-6.5">
            <div className="w-[46px] h-px bg-gold" />
            <span className="font-display tracking-[0.34em] text-xs text-gold uppercase">
              Entrenador &amp; nutricionista con IA
            </span>
          </div>
          <h1 className="font-display font-extrabold text-[clamp(42px,6.2vw,82px)] leading-[0.98] m-0 text-cream tracking-tight">
            Esculpe tu
            <br />
            <span className="text-gold">mejor versión.</span>
          </h1>
          <p className="font-quote text-[clamp(19px,2.4vw,26px)] leading-[1.5] text-muted-1 mt-6.5 max-w-[520px]">
            Rutinas y planes de alimentación creados por inteligencia artificial, únicos según tu
            cuerpo, tu objetivo y tus límites. Disciplina de atleta, en tu bolsillo.
          </p>
          <div className="flex flex-wrap gap-3.5 mt-9">
            <GoldButton as="a" href="/login?mode=register">
              Comenzar gratis
            </GoldButton>
            <GoldButton as="a" href="/login?mode=login" variant="outline">
              Ya tengo cuenta
            </GoldButton>
          </div>
          <div className="flex gap-8 mt-12">
            {[
              ["100%", "Personalizado"],
              ["24/7", "Disponible"],
              ["0", "Experiencia previa"],
            ].map(([num, label], i) => (
              <div key={label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-10 bg-gold/20" />}
                <div>
                  <div className="font-display text-[30px] font-bold text-gold">{num}</div>
                  <div className="text-xs tracking-[0.12em] text-muted-3 uppercase mt-1">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative animate-[cgFade_1.2s_ease_both]">
          <div className="absolute -inset-3.5 border border-gold/30 pointer-events-none z-[2]" />
          <div className="w-full aspect-[4/5] bg-card flex items-center justify-center text-muted-4 text-sm border border-gold/10">
            Escultura griega
          </div>
        </div>
      </div>

      <QuoteBanner />

      {/* BENEFICIOS */}
      <div id="beneficios" className="px-[clamp(20px,5vw,64px)] py-[clamp(56px,9vh,110px)] max-w-[1320px] mx-auto">
        <div className="text-center mb-[60px]">
          <span className="font-display tracking-[0.32em] text-xs text-gold uppercase">
            Por qué Cuerpo Griego
          </span>
          <h2 className="font-display font-bold text-[clamp(30px,4vw,50px)] mt-[18px] text-cream">
            Todo lo que un entrenador te daría
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-10 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-10 h-px bg-gold/50" />
          </div>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {BENEFICIOS.map((b) => (
            <div
              key={b.title}
              className="bg-card border border-gold/16 hover:border-gold/45 transition-colors p-[34px_30px]"
            >
              <BenefitIcon name={b.icon} />
              <h3 className="font-display font-semibold text-[19px] mt-5 mb-2.5 text-cream">
                {b.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-muted-2 m-0">{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <div id="como" className="px-[clamp(20px,5vw,64px)] pt-[clamp(40px,6vh,80px)] pb-[clamp(56px,9vh,110px)] max-w-[1100px] mx-auto">
        <div className="text-center mb-[54px]">
          <span className="font-display tracking-[0.32em] text-xs text-gold uppercase">
            En tres pasos
          </span>
          <h2 className="font-display font-bold text-[clamp(30px,4vw,50px)] mt-[18px] text-cream">
            Cómo funciona
          </h2>
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {PASOS.map((p) => (
            <div key={p.n} className="text-center">
              <div className="font-display text-[52px] font-extrabold text-gold/35 leading-none">
                {p.n}
              </div>
              <h3 className="font-display font-semibold text-xl mt-4 mb-2.5 text-cream">
                {p.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-muted-2 m-0">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-[clamp(56px,10vh,120px)] px-6 bg-gradient-to-b from-ink to-[#14100A] border-t border-gold/18">
        <h2 className="font-display font-extrabold text-[clamp(30px,5vw,58px)] mx-auto text-cream max-w-[720px] leading-[1.05]">
          El mármol no se esculpe solo.
        </h2>
        <p className="font-quote text-[clamp(19px,2.4vw,26px)] text-muted-1 my-5 mx-auto max-w-[540px]">
          Empieza hoy. Tu primera rutina te espera.
        </p>
        <GoldButton as="a" href="/login?mode=register" className="!py-[17px] !px-[42px]">
          Crear mi cuenta
        </GoldButton>
      </div>

      {/* FOOTER */}
      <div className="px-[clamp(20px,5vw,64px)] py-10 border-t border-gold/14 flex flex-wrap items-center justify-between gap-4">
        <div className="font-display font-bold tracking-[0.28em] text-[13px] text-muted-2">
          CVERPO GRIEGO
        </div>
        <div className="text-[12.5px] text-muted-4 tracking-[0.06em]">
          © 2026 Cuerpo Griego · Impulsado por IA (DeepSeek)
        </div>
      </div>
    </div>
  );
}
