"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { Field, TextInput } from "@/components/ui/Field";
import { GoldButton } from "@/components/ui/GoldButton";

type Mode = "login" | "register";

export function AuthForm({ initialMode }: { initialMode: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!isLogin) {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "No se pudo crear la cuenta.");
          setLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError(isLogin ? "Correo o contraseña incorrectos." : "No se pudo iniciar sesión.");
        setLoading(false);
        return;
      }

      const session = await getSession();
      if (!session?.user?.onboarded) {
        router.push("/onboarding");
      } else {
        router.push("/app/inicio");
      }
      router.refresh();
    } catch {
      setError("Ocurrió un error inesperado.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[380px] animate-[cgFadeUp_0.6s_ease_both]">
      <h1 className="font-display font-bold text-[30px] mb-1.5">
        {isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
      </h1>
      <p className="text-[14.5px] text-muted-2 mb-7">
        {isLogin
          ? "Retoma tu disciplina donde la dejaste."
          : "Comienza a esculpir tu mejor versión."}
      </p>

      <div className="flex mb-6 border border-gold/25">
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-3 text-[12px] tracking-[0.12em] uppercase cursor-pointer ${
            !isLogin ? "bg-gold text-ink" : "bg-transparent text-muted-2"
          }`}
        >
          Registrarse
        </button>
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-3 text-[12px] tracking-[0.12em] uppercase cursor-pointer ${
            isLogin ? "bg-gold text-ink" : "bg-transparent text-muted-2"
          }`}
        >
          Iniciar sesión
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[18px]">
        {!isLogin && (
          <Field label="Nombre">
            <TextInput
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </Field>
        )}
        <Field label="Correo">
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
          />
        </Field>
        <Field label="Contraseña">
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />
        </Field>

        {error && <p className="text-sm text-danger">{error}</p>}

        <GoldButton type="submit" disabled={loading} className="w-full !py-4">
          {loading ? "Un momento…" : isLogin ? "Entrar" : "Crear cuenta"}
        </GoldButton>
      </form>

      <div className="text-center mt-5">
        <Link href="/" className="text-muted-3 text-[13px] hover:text-gold">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
