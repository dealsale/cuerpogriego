import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuerpo Griego — Entrenador & nutricionista con IA",
  description:
    "Rutinas y planes de alimentación creados por inteligencia artificial, únicos según tu cuerpo, tu objetivo y tus límites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="min-h-screen bg-ink text-cream font-body antialiased">
        {children}
      </body>
    </html>
  );
}
