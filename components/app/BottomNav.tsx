"use client";

import { usePathname, useRouter } from "next/navigation";

const TABS = [
  {
    tab: "inicio",
    label: "Inicio",
    path: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  },
  {
    tab: "rutina",
    label: "Rutina",
    path: "M12 3v18M7 6l-4 6 4 6M17 6l4 6-4 6",
  },
  {
    tab: "alimentacion",
    label: "Comidas",
    path: "M6 3v7a3 3 0 006 0V3M9 10v11M15 3c-1.5 1-2 3-2 5s.5 4 2 5v8",
  },
  {
    tab: "progreso",
    label: "Progreso",
    path: "M4 20V10M10 20V4M16 20v-7M4 20h16",
  },
  {
    tab: "perfil",
    label: "Perfil",
    path: "",
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center bg-ink/[0.94] backdrop-blur-lg border-t border-gold/20">
      <div className="grid grid-cols-5 w-full max-w-[880px]">
        {TABS.map((t) => {
          const active = pathname.startsWith(`/app/${t.tab}`);
          const color = active ? "#C6A15B" : "#6B665E";
          return (
            <button
              key={t.tab}
              onClick={() => router.push(`/app/${t.tab}`)}
              className="flex flex-col items-center gap-[5px] pt-3 px-1 pb-3.5 bg-transparent border-none cursor-pointer"
              style={{ color }}
            >
              {t.tab === "perfil" ? (
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              ) : (
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                  <path d={t.path} />
                </svg>
              )}
              <span className="text-[10px] tracking-[0.06em]">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
