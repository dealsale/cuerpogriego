import Link from "next/link";
import Image from "next/image";
import { AuthForm } from "@/components/auth/AuthForm";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const initialMode = mode === "login" ? "login" : "register";

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative bg-gradient-to-b from-[#120d1c] to-[#1a1028] flex flex-col justify-between p-8 md:p-14 border-b md:border-b-0 md:border-r border-gold/18 min-h-[220px]">
        <Link href="/">
          <BrandLogo
            size={34}
            wordmarkClassName="font-display font-bold tracking-[0.26em] text-sm text-cream"
          />
        </Link>
        <div className="hidden md:flex justify-center py-6">
          <Image
            src="/logo.jpg"
            alt="Gym Cuerpo Griego"
            width={360}
            height={366}
            className="w-full max-w-[360px] h-auto rounded-2xl neon-glow-pink"
            priority
          />
        </div>
        <div>
          <div className="text-gold font-display text-3xl neon-text-pink">❝</div>
          <p className="font-quote italic text-[clamp(22px,2.6vw,34px)] leading-tight text-cream mt-2 max-w-md">
            Conócete a ti mismo, y luego supérate.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 md:p-14 bg-ink">
        <AuthForm initialMode={initialMode} />
      </div>
    </div>
  );
}
