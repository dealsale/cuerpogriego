"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SuspendButton({ userId, isSuspended }: { userId: string; isSuspended: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSuspended: !isSuspended }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={
        isSuspended
          ? "bg-transparent border border-gold/30 text-muted-2 px-3 py-1.5 text-xs cursor-pointer hover:border-gold hover:text-gold"
          : "bg-transparent border border-[rgba(210,120,80,0.3)] text-[#C08466] px-3 py-1.5 text-xs cursor-pointer hover:border-danger hover:text-danger"
      }
    >
      {loading ? "…" : isSuspended ? "Reactivar" : "Suspender"}
    </button>
  );
}
