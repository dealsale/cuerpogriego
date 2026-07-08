"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Usuarios" },
  { href: "/admin/ejercicios", label: "Ejercicios" },
  { href: "/admin/estadisticas", label: "Estadísticas" },
  { href: "/admin/anuncios", label: "Anuncios" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-[#120d1a] border-r border-gold/16 p-6 flex flex-col">
      <div className="flex items-center gap-2.5 mb-8.5">
        <div className="w-[30px] h-[30px] border-[1.5px] border-gold flex items-center justify-center text-gold font-display font-extrabold text-[15px]">
          Y
        </div>
        <div className="font-display font-bold tracking-[0.18em] text-xs">ADMIN</div>
      </div>
      <div className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-2.5 text-sm ${
                active
                  ? "bg-gold/[0.12] border-l-2 border-gold text-gold-light"
                  : "text-muted-3 border-l-2 border-transparent hover:text-muted-1"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <Link
        href="/app/perfil"
        className="mt-auto text-center bg-transparent text-muted-2 border border-gold/28 py-2.5 text-xs tracking-[0.1em] uppercase hover:border-gold hover:text-gold"
      >
        ← Volver a la app
      </Link>
    </div>
  );
}
