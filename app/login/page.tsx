import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const initialMode = mode === "login" ? "login" : "register";

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative bg-gradient-to-b from-[#101013] to-[#16120A] flex flex-col justify-between p-8 md:p-14 border-b md:border-b-0 md:border-r border-gold/18 min-h-[220px]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border-[1.5px] border-gold flex items-center justify-center text-gold font-display font-extrabold text-base">
            Y
          </div>
          <div className="font-display font-bold tracking-[0.26em] text-sm">CVERPO GRIEGO</div>
        </Link>
        <div>
          <div className="text-gold font-display text-3xl">❝</div>
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
