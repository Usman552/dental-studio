"use client";

import Image from "next/image";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { Photo } from "@/lib/images";

export type CompareSliderHandle = { setPosition: (value: number) => void };

type Props = {
  before: Photo;
  after: Photo;
  /** Optional transform applied to the "after" image to align framing. */
  afterAlign?: { scale: number; origin: string };
  className?: string;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Draggable before/after comparison. Works with mouse, touch, pen and keyboard
 * (arrows, Page Up/Down, Home/End) and exposes slider semantics to assistive tech.
 */
export const CompareSlider = forwardRef<CompareSliderHandle, Props>(function CompareSlider(
  { before, after, afterAlign, className = "" },
  ref,
) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useImperativeHandle(ref, () => ({ setPosition: (v) => setPos(clamp(v)) }), []);

  const fromPointer = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromPointer(e.clientX);
  };
  const stop = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowLeft: -2, ArrowDown: -2, ArrowRight: 2, ArrowUp: 2, PageDown: -10, PageUp: 10 }[e.key];
    if (step !== undefined) {
      e.preventDefault();
      setPos((p) => clamp(p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div
      ref={frame}
      data-cursor="Drag"
      className={`relative select-none overflow-hidden bg-espresso touch-pan-y ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      style={{ cursor: "ew-resize" }}
    >
      {/* Before (full) */}
      <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" draggable={false} />

      {/* After (revealed from the right of the handle) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          draggable={false}
          style={afterAlign ? { transform: `scale(${afterAlign.scale})`, transformOrigin: afterAlign.origin } : undefined}
        />
      </div>

      <span className="eyebrow pointer-events-none absolute left-4 top-4 bg-espresso/70 px-3 py-2 text-ivory backdrop-blur-sm sm:left-6 sm:top-6">
        Before
      </span>
      <span className="eyebrow pointer-events-none absolute right-4 top-4 bg-ivory/85 px-3 py-2 text-espresso backdrop-blur-sm sm:right-6 sm:top-6">
        After
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <span className="absolute inset-y-0 -left-px w-px bg-ivory" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison position: drag or use arrow keys to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ivory text-espresso shadow-[0_10px_40px_-10px_rgba(36,33,30,0.6)] focus-visible:outline-2 focus-visible:outline-champagne"
        >
          <svg aria-hidden width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 1 1 5l4 4M17 1l4 4-4 4M1 5h20" />
          </svg>
        </div>
      </div>
    </div>
  );
});
