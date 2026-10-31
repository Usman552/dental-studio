"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { useScroll } from "@/components/layout/SmoothScroll";
import { gsap } from "@/lib/gsap";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
};

/**
 * Side panel built on the native <dialog> element, which provides focus
 * trapping, Escape-to-close and an inert background for free.
 */
export function Drawer({ open, onClose, label, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useScroll();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open && !dialog.open) {
      dialog.showModal();
      lock();
      if (!reduce) {
        gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: "expo.out" });
        gsap.fromTo(
          dialog.querySelectorAll("[data-drawer-item]"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.9, delay: 0.15, ease: "expo.out" },
        );
      }
    } else if (!open && dialog.open) {
      const finish = () => {
        dialog.close();
        unlock();
      };
      if (reduce) finish();
      else gsap.to(panel.current, { xPercent: 100, duration: 0.6, ease: "expo.in", onComplete: finish });
    }
  }, [open, lock, unlock]);

  // Make sure scroll is released if the component unmounts while open.
  useEffect(() => {
    const dialog = ref.current;
    return () => {
      if (dialog?.open) unlock();
    };
  }, [unlock]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-espresso/50 backdrop:backdrop-blur-[2px] sm:w-[min(640px,92vw)]"
    >
      <div ref={panel} data-lenis-prevent className="relative h-full overflow-y-auto overscroll-contain bg-ivory text-espresso">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex size-11 items-center justify-center border border-espresso/20 transition-colors hover:bg-espresso hover:text-ivory"
        >
          <X strokeWidth={1.25} className="size-5" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </dialog>
  );
}
