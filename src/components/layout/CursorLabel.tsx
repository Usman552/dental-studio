"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A small label that trails the pointer over interactive media
 * (elements with `data-cursor="Drag"` etc.). The native cursor stays visible.
 * Only on fine pointers with motion allowed.
 */
export function CursorLabel() {
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || !el.current) return;
    const x = gsap.quickTo(el.current, "x", { duration: 0.5, ease: "expo.out" });
    const y = gsap.quickTo(el.current, "y", { duration: 0.5, ease: "expo.out" });
    let current: string | null = null;

    const onMove = (e: PointerEvent) => {
      x(e.clientX + 18);
      y(e.clientY + 18);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? null;
      if (next !== current) {
        current = next;
        setLabel(next);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={el} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80]">
      <span
        className="eyebrow block bg-ivory px-3 py-2 text-espresso shadow-[0_8px_30px_-12px_rgba(36,33,30,0.5)] transition-[opacity,scale] duration-300"
        style={{ opacity: label ? 1 : 0, scale: label ? "1" : "0.6" }}
      >
        {label ?? ""}
      </span>
    </div>
  );
}
