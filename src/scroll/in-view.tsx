import { useCallback, useSyncExternalStore } from "react";
import type { StyleWithVars } from "./css-vars";
import { useInViewOnce } from "./use-in-view-once";

function subscribeMounted(): () => void {
  return () => {};
}

function useMounted(): boolean {
  return useSyncExternalStore(subscribeMounted, () => true, () => false);
}

export interface InViewProps {
  stagger?: number;
  as?: "div" | "section" | "ul" | "p";
  className?: string;
  children: React.ReactNode;
}

export function InView(props: InViewProps): React.JSX.Element {
  const { stagger, as: Tag = "div", className, children } = props;
  const { ref: viewRef, seen } = useInViewOnce();
  const armed = useMounted();
  const ref = useCallback<React.RefCallback<HTMLElement>>(
    (el) => {
      if (el && stagger !== undefined) {
        let i = 0;
        for (const kid of el.children) {
          if (kid instanceof HTMLElement) kid.style.setProperty("--sc-i", String(i));
          i += 1;
        }
      }
      return viewRef(el);
    },
    [viewRef, stagger],
  );
  const classes = [armed && !seen ? "sc-arm" : undefined, seen ? "sc-in" : undefined, className]
    .filter((c) => c !== undefined)
    .join(" ");
  const style: StyleWithVars = {};
  if (stagger !== undefined) style["--sc-stagger"] = `${stagger}ms`;
  return (
    <Tag
      ref={ref}
      className={classes}
      data-sc-in=""
      data-sc-stagger={stagger === undefined ? undefined : ""}
      style={style}
    >
      {children}
    </Tag>
  );
}
