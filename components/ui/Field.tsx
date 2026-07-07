import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClass =
  "w-full bg-card border border-gold/22 text-cream placeholder:text-muted-4 px-4 py-3.5 text-[15px] outline-none focus:border-gold transition-colors";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[12px] tracking-[0.1em] uppercase text-muted-3 mb-2">
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return <input className={`${inputClass} ${className}`} {...rest} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return <textarea className={`${inputClass} resize-y ${className}`} {...rest} />;
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
