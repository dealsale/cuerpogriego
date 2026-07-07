const ICONS: Record<string, string> = {
  rutinas: "M12 3v18M7 6l-4 6 4 6M17 6l4 6-4 6",
  dieta: "M6 3v7a3 3 0 006 0V3M9 10v11M15 3c-1.5 1-2 3-2 5s.5 4 2 5v8",
  progreso: "M4 20V10M10 20V4M16 20v-7M4 20h16",
  disponible: "M12 7v5l3 2",
  lesiones: "M12 21c-4-3-8-6.5-8-11a4 4 0 018-1 4 4 0 018 1c0 4.5-4 8-8 11z",
  app: "M11 18.5h2",
};

export function BenefitIcon({ name }: { name: keyof typeof ICONS }) {
  if (name === "disponible") {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d={ICONS.disponible} />
      </svg>
    );
  }
  if (name === "app") {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.4">
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d={ICONS.app} />
      </svg>
    );
  }
  if (name === "rutinas") {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.4">
        <path d={ICONS.rutinas} />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    );
  }
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.4">
      <path d={ICONS[name]} />
    </svg>
  );
}
