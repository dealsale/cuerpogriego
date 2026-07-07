import type { CSSProperties } from "react";
import type { Pattern } from "@/lib/exercisePatterns";

interface PatternAnim {
  armUpper?: string;
  armUpperFixed?: number;
  fore?: string;
  foreFixed?: number;
  torso?: string;
  torsoFixed?: number;
  body?: string;
  thigh?: string;
  thighFixed?: number;
  shin?: string;
  shinFixed?: number;
  alt?: boolean;
}

const PATTERN_ANIM: Record<Pattern, PatternAnim> = {
  "press-horizontal": { armUpperFixed: 34, fore: "cgExtendFore" },
  "press-vertical": { armUpper: "cgOverhead", fore: "cgForePress" },
  jalon: { armUpper: "cgPulldown", foreFixed: -14 },
  remo: { armUpperFixed: 48, fore: "cgRow", torsoFixed: 10 },
  curl: { armUpperFixed: 6, fore: "cgCurl" },
  "extension-triceps": { armUpperFixed: 152, fore: "cgTriExt" },
  "elevacion-lateral": { armUpper: "cgRaise" },
  sentadilla: { body: "cgSquatBody", thigh: "cgThighSquat", shin: "cgShinSquat" },
  "peso-muerto": { body: "cgHingeBody", torso: "cgHinge" },
  zancada: { body: "cgLungeBody", thigh: "cgMarch", shin: "cgShinBend", alt: true },
  abdomen: { torso: "cgCrunch", thighFixed: -26 },
  cardio: { body: "cgBob", thigh: "cgMarch", armUpper: "cgSwing", alt: true },
  generico: { body: "cgBob", armUpper: "cgSwing", alt: true },
};

const OL = "#0B0B0D";
const DUR = "2.4s";

function mk(anim: string | undefined, fixed: number | undefined, origin: string, delay: string): CSSProperties {
  if (anim) {
    return {
      animation: `${anim} ${DUR} ease-in-out infinite`,
      animationDelay: delay || "0s",
      transformBox: "fill-box",
      transformOrigin: origin,
    } as CSSProperties;
  }
  if (fixed != null) {
    return {
      transform: `rotate(${fixed}deg)`,
      transformBox: "fill-box",
      transformOrigin: origin,
    } as CSSProperties;
  }
  return {};
}

function Arm({ c, delay }: { c: PatternAnim; delay: string }) {
  return (
    <g style={mk(c.armUpper, c.armUpperFixed, "50% 0", delay)}>
      <rect x={64} y={64} width={16} height={46} rx={8} fill="#BD9950" stroke={OL} strokeWidth={2} />
      <g style={mk(c.fore, c.foreFixed, "50% 0", delay)}>
        <rect x={65} y={108} width={14} height={40} rx={7} fill="#C6A15B" stroke={OL} strokeWidth={2} />
        <circle cx={72} cy={150} r={7} fill="#C6A15B" stroke={OL} strokeWidth={2} />
      </g>
    </g>
  );
}

function Leg({ c, delay }: { c: PatternAnim; delay: string }) {
  return (
    <g style={mk(c.thigh, c.thighFixed, "50% 0", delay)}>
      <rect x={78} y={150} width={16} height={52} rx={8} fill="#B48F49" stroke={OL} strokeWidth={2} />
      <g style={mk(c.shin, c.shinFixed, "50% 0", delay)}>
        <rect x={79} y={200} width={14} height={48} rx={7} fill="#C6A15B" stroke={OL} strokeWidth={2} />
        <ellipse cx={92} cy={250} rx={11} ry={5} fill="#C6A15B" stroke={OL} strokeWidth={2} />
      </g>
    </g>
  );
}

function Mirror({ children }: { children: React.ReactNode }) {
  return (
    <g
      style={
        {
          transform: "translateX(200px) scaleX(-1)",
          transformBox: "view-box",
          transformOrigin: "0px 0px",
        } as CSSProperties
      }
    >
      {children}
    </g>
  );
}

export function AthleteFigure({ pattern }: { pattern: Pattern }) {
  const c = PATTERN_ANIM[pattern] || PATTERN_ANIM.generico;
  const delayR = c.alt ? "-1.2s" : "0s";

  return (
    <svg viewBox="0 0 200 268" style={{ width: "100%", height: "auto", maxHeight: "250px" }}>
      <g style={c.body ? ({ animation: `${c.body} ${DUR} ease-in-out infinite` } as CSSProperties) : {}}>
        <Leg c={c} delay="0s" />
        <Mirror>
          <Leg c={c} delay={delayR} />
        </Mirror>
        <g style={mk(c.torso, c.torsoFixed, "50% 100%", "0")}>
          <rect x={76} y={58} width={48} height={96} rx={20} fill="#C6A15B" stroke={OL} strokeWidth={2} />
          <rect x={92} y={48} width={16} height={14} rx={4} fill="#C6A15B" stroke={OL} strokeWidth={2} />
          <circle cx={100} cy={32} r={18} fill="#C6A15B" stroke={OL} strokeWidth={2} />
          <Arm c={c} delay="0s" />
          <Mirror>
            <Arm c={c} delay={delayR} />
          </Mirror>
        </g>
      </g>
    </svg>
  );
}
