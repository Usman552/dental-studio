"use client";

import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Declarative scroll motion shared by every section, driven by data attributes:
 *
 *   data-reveal            fade + rise, batched so siblings stagger together
 *   data-reveal-lines      container whose `.line-mask > *` children slide up
 *   data-reveal-img        image frame that unveils from the bottom, image settles from scale
 *   data-parallax="0.12"   gentle vertical drift relative to the page
 *
 * Mount once, after all sections, so pinned sections are measured first.
 */
export function RevealController() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION.motion, () => {
      const reveal = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveal, { opacity: 0, y: 36 });
      ScrollTrigger.batch(reveal, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.3, stagger: 0.09, ease: "expo.out", overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-lines]").forEach((el) => {
        const lines = el.querySelectorAll(":scope .line-mask > *");
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.4,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-img]").forEach((frame) => {
        const img = frame.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 88%", once: true } });
        tl.fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
        );
        if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.1");
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Fonts and late layout can shift trigger positions; re-measure once settled.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  });

  return null;
}
