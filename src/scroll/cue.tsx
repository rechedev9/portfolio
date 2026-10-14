import { Children, isValidElement, useId } from "react";
import { actRange, useAct } from "./act-context";
import type { StyleWithVars } from "./css-vars";
import { clamp, clamp01 } from "./media";

export type CueTag = "div" | "p" | "h1" | "h2" | "h3" | "span";

export interface CueProps {
  from: number;
  to?: number;
  rampIn?: number;
  rampOut?: number;
  rise?: number;
  kinetic?: "words" | "chars";
  as?: CueTag;
  className?: string;
  style?: StyleWithVars;
  children: React.ReactNode;
}

const HOLD_RAMP = 0.18;
const KINETIC_SPREAD = 0.62;
const SMOOTH = "cubic-bezier(0.333, 0, 0.667, 1)";

interface CueWindow {
  from: number;
  to: number;
  inEnd: number;
  outStart: number;
  hold: boolean;
}

function cueWindow(props: CueProps): CueWindow {
  const from = clamp01(props.from);
  if (props.to === undefined) {
    return {
      from,
      to: Math.min(from + HOLD_RAMP, 1),
      inEnd: from + HOLD_RAMP,
      outStart: 1,
      hold: true,
    };
  }
  const to = Math.max(clamp01(props.to), from + 0.001);
  const w = to - from;
  const rIn = clamp01(props.rampIn ?? 0.3);
  const rOut = clamp01(props.rampOut ?? 0.3);
  return { from, to, inEnd: from + w * rIn, outStart: to - w * rOut, hold: false };
}

function pct(v: number): string {
  return `${(v * 100).toFixed(2)}%`;
}

function cueFrames(options: { name: string; w: CueWindow; hidden: string; shown: string; gone: string }): string {
  const { name, w, hidden, shown, gone } = options;
  if (w.hold) {
    return `@keyframes ${name}{0%{${hidden}animation-timing-function:${SMOOTH}}100%{${shown}}}`;
  }
  // rampIn 0 greets: lit before the range. Otherwise ramps stay off 0% and
  // 100%, where a second keyframe on that offset would light the fill.
  const rampIn = (w.inEnd - w.from) / (w.to - w.from);
  const a = pct(clamp(rampIn, { lo: 0.0001, hi: 0.9998 }));
  const rampOut = (w.outStart - w.from) / (w.to - w.from);
  const b = pct(clamp(rampOut, { lo: 0.0002, hi: 0.9999 }));
  const entry = rampIn <= 0 ? "" : `0%{${hidden}animation-timing-function:${SMOOTH}}`;
  return (
    `@keyframes ${name}{${entry}` +
    `${a}{${shown}animation-timing-function:linear}` +
    `${b}{${shown}animation-timing-function:${SMOOTH}}100%{${gone}}}`
  );
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: React.ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

interface Unit {
  key: string;
  node: React.ReactNode;
  order: number;
}

interface Group {
  key: string;
  text: string;
  units: Unit[];
}

function splitGroups(children: React.ReactNode, mode: "words" | "chars"): Group[] {
  const groups: Group[] = [];
  let order = 0;
  const word = (nodes: React.ReactNode[]): void => {
    const units = nodes.map((node) => {
      const u = { key: `u${order}`, node, order };
      order += 1;
      return u;
    });
    groups.push({ key: `g${groups.length}`, text: "", units });
  };
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      for (const part of String(child).split(/(\s+)/)) {
        if (part === "") continue;
        if (/^\s+$/.test(part)) groups.push({ key: `g${groups.length}`, text: part, units: [] });
        else word(mode === "words" ? [part] : [...part]);
      }
    } else if (child !== null && child !== undefined && typeof child !== "boolean") {
      word([child]);
    }
  });
  return groups;
}

export function Cue(props: CueProps): React.JSX.Element {
  const { rise = 1, kinetic, as: Tag = "div", className, style, children } = props;
  const act = useAct();
  const id = `sc-cue-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const w = cueWindow(props);
  const range = actRange({ pinned: act.pinned, from: w.from, to: w.to });
  const own: StyleWithVars = {
    ...style,
    animationName: id,
    animationRange: range,
    "--sc-rise": rise,
  };
  const peak = w.hold ? Math.min(w.inEnd, 1) : (w.inEnd + w.outStart) / 2;
  const classes = ["sc-cue", kinetic ? "sc-cue--kin" : undefined, className]
    .filter((c) => c !== undefined)
    .join(" ");
  const fadeHidden = kinetic ? "opacity: 1; visibility: hidden;" : "opacity: 0; visibility: hidden;";
  const fadeShown = "opacity: 1; visibility: visible;";
  const fadeGone = kinetic ? "opacity: 0; visibility: hidden;" : "opacity: 0; visibility: hidden;";
  const lift = "translate: 0 calc(2.4vh * var(--sc-rise, 1));";
  const riseId = `${id}-rise`;
  const css =
    cueFrames({ name: id, w, hidden: fadeHidden, shown: fadeShown, gone: fadeGone }) +
    (kinetic === undefined
      ? cueFrames({ name: riseId, w, hidden: lift, shown: "translate: 0 0;", gone: lift })
      : "");
  let body: React.ReactNode = children;
  if (kinetic) {
    const groups = splitGroups(children, kinetic);
    const n = Math.max(
      groups.reduce((sum, g) => sum + g.units.length, 0),
      1,
    );
    const ramp = w.inEnd - w.from;
    const unitStyle = (order: number): React.CSSProperties => {
      if (ramp <= 0) return { animationName: "none" };
      const start = w.from + ramp * (order / n) * KINETIC_SPREAD;
      const end = Math.min(w.inEnd, start + ramp * (1 - KINETIC_SPREAD));
      return { animationRange: actRange({ pinned: act.pinned, from: start, to: end }) };
    };
    body = (
      <>
        <span className="sc-sr">{textOf(children)}</span>
        <span aria-hidden="true">
          {groups.map((g) =>
            g.units.length === 0 ? (
              g.text
            ) : (
              <span key={g.key} className="sc-kin__w">
                {g.units.map((u) => (
                  <span key={u.key} className="sc-kin__m">
                    <span className="sc-kin__u" style={unitStyle(u.order)}>
                      {u.node}
                    </span>
                  </span>
                ))}
              </span>
            ),
          )}
        </span>
      </>
    );
  } else {
    const riseStyle: StyleWithVars = { animationName: riseId, animationRange: range };
    body = (
      <span className="sc-cue__rise" style={riseStyle}>
        {children}
      </span>
    );
  }
  return (
    <>
      <style href={id} precedence="sc-cue">
        {css}
      </style>
      <Tag className={classes} style={own} data-sc-peak={peak.toFixed(3)}>
        {body}
      </Tag>
    </>
  );
}
