"use client";

import { useEffect, useState } from "react";
import { QUOTES } from "@/lib/quotes";

export function QuoteBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden py-[clamp(40px,7vh,74px)] px-6 bg-gradient-to-b from-[#120d1c] to-[#1c1030] border-y border-gold/18 text-center">
      <div className="max-w-[900px] mx-auto min-h-24 flex flex-col justify-center">
        <div className="text-gold font-display text-[28px] mb-2.5 neon-text-pink">❝</div>
        <p
          key={index}
          className="font-quote italic font-medium text-[clamp(24px,3.6vw,40px)] leading-tight text-cream m-0 animate-[cgFade_0.7s_ease]"
        >
          {QUOTES[index]}
        </p>
      </div>
      <div className="flex justify-center gap-2.5 mt-7">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            aria-label={`Frase ${i + 1}`}
            onClick={() => setIndex(i)}
            className="w-6.5 h-[3px] border-none cursor-pointer p-0 transition-colors"
            style={{ background: i === index ? "#ff3fb4" : "rgba(255,63,180,0.28)" }}
          />
        ))}
      </div>
    </div>
  );
}
