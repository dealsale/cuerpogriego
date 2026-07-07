"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegistrationToggle({ initialOpen }: { initialOpen: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(initialOpen);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationOpen: !open }),
      });
      if (res.ok) {
        setOpen(!open);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="text-sm cursor-pointer disabled:opacity-50"
      style={{ color: open ? "#6B8A5F" : "#D2784F" }}
    >
      {open ? "Activo" : "Cerrado"} · cambiar
    </button>
  );
}
