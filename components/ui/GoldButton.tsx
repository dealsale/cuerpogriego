import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "solid" | "outline" | "ghost";

const base =
  "font-body text-[13px] font-semibold tracking-[0.16em] uppercase cursor-pointer transition-all disabled:cursor-not-allowed inline-block text-center";

const variants: Record<Variant, string> = {
  solid:
    "bg-gradient-to-r from-neon-cyan via-neon-purple to-gold text-white px-8 py-4 neon-glow-pink hover:brightness-110 disabled:opacity-40 disabled:shadow-none",
  outline:
    "bg-transparent text-cream border border-gold/40 px-7 py-4 font-medium hover:border-gold hover:text-gold hover:neon-glow-pink",
  ghost:
    "bg-transparent text-muted-2 border border-gold/30 px-6 py-3.5 hover:border-neon-cyan hover:text-neon-cyan",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  variant?: Variant;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  variant?: Variant;
  href: string;
};

export function GoldButton(props: ButtonProps | AnchorProps) {
  const { variant = "solid", className = "", ...rest } = props;
  const cls = `${base} ${variants[variant]} ${className}`;

  if (props.as === "a") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _as, ...anchorProps } = rest as AnchorProps;
    return <Link className={cls} {...anchorProps} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _as, ...buttonProps } = rest as ButtonProps;
  return <button className={cls} {...buttonProps} />;
}
