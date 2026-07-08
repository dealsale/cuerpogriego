export function AppHeader({ name }: { name: string }) {
  const primerNombre = (name || "Atleta").split(" ")[0];
  const inicial = (name || "A").trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-[clamp(18px,4vw,34px)] py-4 bg-ink/90 backdrop-blur-md border-b border-gold/16">
      <div className="flex items-center gap-[11px]">
        <div className="w-[30px] h-[30px] border-[1.5px] border-gold flex items-center justify-center text-gold font-display font-extrabold text-[15px]">
          Y
        </div>
        <div className="font-display font-bold tracking-[0.24em] text-[13px]">CUERPO GRIEGO</div>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="text-[13px] text-muted-2">{primerNombre}</div>
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-gold to-[#7a1e5c] flex items-center justify-center text-ink font-display font-bold text-sm">
          {inicial}
        </div>
      </div>
    </div>
  );
}
