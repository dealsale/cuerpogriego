import { ButtonHTMLAttributes } from "react";

export function ChoiceButton({
  active,
  pill = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean; pill?: boolean }) {
  return (
    <button
      className={[
        "cursor-pointer text-[13.5px] transition-colors border",
        pill ? "rounded-full px-4 py-2.5" : "px-4 py-3.5",
        active
          ? "bg-gold/[0.14] text-cream border-gold"
          : "bg-card text-muted-1 border-gold/22 hover:border-gold/45",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
