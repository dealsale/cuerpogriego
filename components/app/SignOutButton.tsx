"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex-1 bg-transparent text-muted-3 border border-white/10 py-3.5 text-xs tracking-[0.1em] uppercase cursor-pointer hover:text-danger hover:border-[rgba(210,120,80,0.4)]"
    >
      Cerrar sesión
    </button>
  );
}
