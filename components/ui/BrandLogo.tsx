import Image from "next/image";

/** Marca de la app: logo neón + wordmark. El logo trae fondo oscuro propio,
 *  así que se recorta redondeado y se le da un glow suave para integrarlo. */
export function BrandLogo({
  size = 34,
  withWordmark = true,
  wordmarkClassName = "font-display font-bold tracking-[0.24em] text-[14px] text-cream",
}: {
  size?: number;
  withWordmark?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/logo-small.png"
        alt="Gym Cuerpo Griego"
        width={size}
        height={size}
        className="rounded-full neon-glow-pink object-cover"
        priority
      />
      {withWordmark && <span className={wordmarkClassName}>CUERPO GRIEGO</span>}
    </span>
  );
}
