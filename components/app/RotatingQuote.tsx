"use client";

import { useEffect, useState } from "react";
import { QUOTES } from "@/lib/quotes";

export function RotatingQuote({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <p key={index} className={`${className} animate-[cgFade_0.7s_ease]`}>
      &ldquo;{QUOTES[index]}&rdquo;
    </p>
  );
}
