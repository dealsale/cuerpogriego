import type { CSSProperties } from "react";

const G = "#1a1526";
const GS = "#383046";

function bodyColor(key: string, primary: Set<string>, secondary: Set<string>): string {
  if (primary.has(key)) return "#ff6ec4";
  if (secondary.has(key)) return "rgba(255,63,180,0.5)";
  return "#282236";
}

function Muscle({
  muscleKey,
  primary,
  secondary,
  tag,
  attrs,
}: {
  muscleKey: string;
  primary: Set<string>;
  secondary: Set<string>;
  tag: "rect" | "ellipse";
  attrs: Record<string, number>;
}) {
  const fill = bodyColor(muscleKey, primary, secondary);
  const style: CSSProperties = primary.has(muscleKey)
    ? { animation: "cgMusclePulse 1.6s ease-in-out infinite" }
    : {};
  const Tag = tag as "rect";
  return <Tag fill={fill} stroke="#0d0a14" strokeWidth={0.6} style={style} {...attrs} />;
}

function Base({ ox }: { ox: number }) {
  return (
    <g>
      <circle cx={ox + 55} cy={22} r={14} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 48} y={33} width={14} height={12} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 33} y={42} width={44} height={76} rx={18} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 19} y={46} width={15} height={42} rx={7} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 18} y={86} width={13} height={36} rx={6} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 76} y={46} width={15} height={42} rx={7} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 79} y={86} width={13} height={36} rx={6} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 37} y={116} width={16} height={52} rx={8} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 38} y={166} width={13} height={46} rx={6} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 57} y={116} width={16} height={52} rx={8} fill={G} stroke={GS} strokeWidth={1.4} />
      <rect x={ox + 58} y={166} width={13} height={46} rx={6} fill={G} stroke={GS} strokeWidth={1.4} />
    </g>
  );
}

function Front({ ox, primary, secondary }: { ox: number; primary: Set<string>; secondary: Set<string> }) {
  const m = (muscleKey: string, tag: "rect" | "ellipse", attrs: Record<string, number>) => (
    <Muscle muscleKey={muscleKey} primary={primary} secondary={secondary} tag={tag} attrs={attrs} />
  );
  return (
    <g>
      {m("trapecio", "rect", { x: ox + 40, y: 40, width: 11, height: 8, rx: 3 })}
      {m("trapecio", "rect", { x: ox + 59, y: 40, width: 11, height: 8, rx: 3 })}
      {m("hombro", "ellipse", { cx: ox + 27, cy: 52, rx: 9, ry: 8 })}
      {m("hombro", "ellipse", { cx: ox + 83, cy: 52, rx: 9, ry: 8 })}
      {m("pecho", "ellipse", { cx: ox + 46, cy: 58, rx: 10, ry: 8 })}
      {m("pecho", "ellipse", { cx: ox + 64, cy: 58, rx: 10, ry: 8 })}
      {m("biceps", "ellipse", { cx: ox + 26, cy: 74, rx: 7, ry: 11 })}
      {m("biceps", "ellipse", { cx: ox + 84, cy: 74, rx: 7, ry: 11 })}
      {m("antebrazo", "ellipse", { cx: ox + 24, cy: 100, rx: 6, ry: 12 })}
      {m("antebrazo", "ellipse", { cx: ox + 86, cy: 100, rx: 6, ry: 12 })}
      {m("abdomen", "rect", { x: ox + 46, y: 70, width: 18, height: 40, rx: 5 })}
      {m("oblicuos", "ellipse", { cx: ox + 40, cy: 92, rx: 4, ry: 12 })}
      {m("oblicuos", "ellipse", { cx: ox + 70, cy: 92, rx: 4, ry: 12 })}
      {m("cuadriceps", "ellipse", { cx: ox + 45, cy: 146, rx: 9, ry: 22 })}
      {m("cuadriceps", "ellipse", { cx: ox + 65, cy: 146, rx: 9, ry: 22 })}
      {m("aductores", "ellipse", { cx: ox + 55, cy: 142, rx: 5, ry: 16 })}
    </g>
  );
}

function Back({ ox, primary, secondary }: { ox: number; primary: Set<string>; secondary: Set<string> }) {
  const m = (muscleKey: string, tag: "rect" | "ellipse", attrs: Record<string, number>) => (
    <Muscle muscleKey={muscleKey} primary={primary} secondary={secondary} tag={tag} attrs={attrs} />
  );
  return (
    <g>
      {m("trapecio", "rect", { x: ox + 42, y: 40, width: 26, height: 17, rx: 4 })}
      {m("hombro", "ellipse", { cx: ox + 27, cy: 52, rx: 9, ry: 8 })}
      {m("hombro", "ellipse", { cx: ox + 83, cy: 52, rx: 9, ry: 8 })}
      {m("dorsal", "ellipse", { cx: ox + 43, cy: 76, rx: 9, ry: 17 })}
      {m("dorsal", "ellipse", { cx: ox + 67, cy: 76, rx: 9, ry: 17 })}
      {m("lumbar", "rect", { x: ox + 48, y: 98, width: 14, height: 14, rx: 4 })}
      {m("triceps", "ellipse", { cx: ox + 26, cy: 74, rx: 7, ry: 11 })}
      {m("triceps", "ellipse", { cx: ox + 84, cy: 74, rx: 7, ry: 11 })}
      {m("gluteos", "ellipse", { cx: ox + 46, cy: 122, rx: 10, ry: 11 })}
      {m("gluteos", "ellipse", { cx: ox + 64, cy: 122, rx: 10, ry: 11 })}
      {m("isquios", "ellipse", { cx: ox + 45, cy: 150, rx: 9, ry: 20 })}
      {m("isquios", "ellipse", { cx: ox + 65, cy: 150, rx: 9, ry: 20 })}
      {m("gemelos", "ellipse", { cx: ox + 45, cy: 188, rx: 7, ry: 14 })}
      {m("gemelos", "ellipse", { cx: ox + 65, cy: 188, rx: 7, ry: 14 })}
    </g>
  );
}

function Cap({ x, t }: { x: number; t: string }) {
  return (
    <text
      x={x}
      y={228}
      fill="#675e7f"
      fontSize={9}
      fontFamily="Jost, sans-serif"
      letterSpacing={1.5}
      textAnchor="middle"
    >
      {t}
    </text>
  );
}

export function MuscleMap({ primary, secondary }: { primary: string[]; secondary: string[] }) {
  const P = new Set(primary || []);
  const S = new Set(secondary || []);

  return (
    <svg viewBox="0 0 240 234" style={{ width: "100%", height: "auto", maxHeight: "250px" }}>
      <Base ox={5} />
      <Front ox={5} primary={P} secondary={S} />
      <Base ox={125} />
      <Back ox={125} primary={P} secondary={S} />
      <Cap x={60} t="FRENTE" />
      <Cap x={180} t="ESPALDA" />
    </svg>
  );
}
