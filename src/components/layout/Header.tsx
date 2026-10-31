"use client";

import { useEffect, useRef, useState } from "react";
import { clinic, navigation } from "@/lib/content";
import { ScrollLink } from "@/components/ui/ScrollLink";
import { MobileMenu } from "./MobileMenu";

/**
 * Transparent over the hero, then settles onto ivory. Hides while scrolling
 * down and returns on scroll up so it never competes with the photography.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const threshold = window.innerHeight * 0.85;
      setSolid(y > threshold);
      setHidden(y > threshold && y > lastY.current + 4);
      if (y < lastY.current - 4 || y <= threshold) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = solid ? "text-espresso" : "text-ivory";

  return (
    <>
      <a
        href="#main"
        className="eyebrow fixed left-4 top-4 z-[70] -translate-y-24 bg-espresso px-4 py-3 text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        data-hero-fade
        className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,color] duration-700 ease-out-expo ${tone} ${
          solid ? "bg-ivory/92 backdrop-blur-md" : "bg-transparent"
        } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="mx-auto flex h-[72px] max-w-[112rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[84px] lg:px-12">
          <ScrollLink href="#top" className="group flex items-baseline gap-3" aria-label={`${clinic.name}, back to top`}>
            <span className="font-serif text-[1.65rem] font-light leading-none tracking-[0.18em]">LUMIÈRE</span>
            <span className="eyebrow hidden whitespace-nowrap opacity-70 sm:inline">Dental Studio</span>
          </ScrollLink>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => (
                <li key={item.href}>
                  <ScrollLink href={item.href} className="eyebrow link-u pb-1 opacity-85 transition-opacity hover:opacity-100">
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ScrollLink
              href="#appointment"
              className={`eyebrow hidden whitespace-nowrap border px-5 py-3 transition-colors duration-500 sm:inline-block ${
                solid
                  ? "border-espresso bg-espresso text-ivory hover:bg-champagne hover:text-espresso hover:border-champagne"
                  : "border-ivory/50 hover:bg-ivory hover:text-espresso"
              }`}
            >
              Book a visit
            </ScrollLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 items-center gap-3 xl:hidden"
            >
              <span className="eyebrow">Menu</span>
              <span aria-hidden className="flex w-7 flex-col gap-[7px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
