"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { clinic, navigation } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { useScroll } from "./SmoothScroll";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { lock, unlock, scrollTo } = useScroll();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open && !dialog.open) {
      dialog.showModal();
      lock();
      if (!reduce) {
        const tl = gsap.timeline();
        tl.fromTo(dialog, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" })
          .fromTo(
            dialog.querySelectorAll("[data-menu-line]"),
            { yPercent: 110 },
            { yPercent: 0, stagger: 0.06, duration: 1, ease: "expo.out" },
            "-=0.35",
          )
          .fromTo(dialog.querySelectorAll("[data-menu-fade]"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.7");
      }
    } else if (!open && dialog.open) {
      const finish = () => {
        dialog.close();
        unlock();
      };
      if (reduce) finish();
      else gsap.to(dialog, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut", onComplete: finish });
    }
  }, [open, lock, unlock]);

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  const go = (href: string) => {
    onClose();
    // Wait for the close animation so the page can scroll again.
    window.setTimeout(() => scrollTo(href), 760);
  };

  const items = [...navigation, { label: "Book a visit", href: "#appointment" }];

  return (
    <dialog
      id="mobile-menu"
      ref={ref}
      aria-label="Site menu"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-espresso p-0 text-ivory backdrop:bg-transparent"
    >
      <div className="flex h-full flex-col px-5 pb-8 pt-5 sm:px-8">
        <div className="flex h-[52px] items-center justify-between">
          <span className="font-serif text-[1.65rem] font-light tracking-[0.18em]">LUMIÈRE</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 items-center gap-3"
            aria-label="Close menu"
          >
            <span className="eyebrow">Close</span>
            <X strokeWidth={1.25} className="size-6" />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-10 flex-1">
          <ol className="space-y-1">
            {items.map((item, i) => (
              <li key={item.href} className="line-mask">
                <a
                  data-menu-line
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="flex items-baseline gap-4 py-1"
                >
                  <span className="w-7 font-serif text-sm italic text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(2.6rem,11vw,4.5rem)] leading-[1.02]">
                    {i === items.length - 1 ? <em className="text-champagne">{item.label}</em> : item.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div data-menu-fade className="grid grid-cols-2 gap-6 border-t border-ivory/15 pt-6 text-sm text-ivory/75">
          <div>
            <p className="eyebrow mb-2 text-ivory/50">Call</p>
            <a href={clinic.phoneHref}>{clinic.phone}</a>
          </div>
          <div>
            <p className="eyebrow mb-2 text-ivory/50">Studio</p>
            <p>{clinic.address[0]}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
