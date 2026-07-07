"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoldButton } from "@/components/ui/GoldButton";

export function RegenerateButton({
  label = "↻ Regenerar",
  full = false,
}: {
  label?: string;
  full?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function regenerate() {
    setLoading(true);
    try {
      await fetch("/api/plan/generate", { method: "POST" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <GoldButton
      variant={full ? "solid" : "outline"}
      onClick={regenerate}
      disabled={loading}
      className={full ? "w-full !py-[15px] !mb-3.5" : "!py-[11px] !px-[18px] !text-[12px]"}
    >
      {loading ? "Regenerando…" : label}
    </GoldButton>
  );
}
