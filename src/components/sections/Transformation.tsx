"use client";

import { Info } from "lucide-react";
import { useRef } from "react";
import { images } from "@/lib/images";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CompareSlider, type CompareSliderHandle } from "@/components/ui/CompareSlider";

const process = [
  { title: "Listen", text: "Your concerns, priorities and the result you'd like to feel." },
  { title: "Plan", text: "Photographs and digital records map proportion, shade and balance." },
  { title: "Preview", text: "Where suitable, a trial smile lets you see the direction before committing." },
  { title: "Refine", text: "Treatment in considered stages, reviewed together at every step." },
];

export function Transformation() {
  const root = useRef<HTMLElement>(null);
  const slider = useRef<CompareSliderHandle>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        // A gentle sweep the first time the slider appears, hinting that it can be dragged.
        const state = { v: 50 };
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-compare]", start: "top 65%", once: true } })
          .to(state, { v: 18, duration: 1.1, ease: "power3.inOut", onUpdate: () => slider.current?.setPosition(state.v) })
          .to(state, { v: 76, duration: 1.4, ease: "power3.inOut", onUpdate: () => slider.current?.setPosition(state.v) })
          .to(state, { v: 50, duration: 1, ease: "power3.inOut", onUpdate: () => slider.current?.setPosition(state.v) });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="transformation"
      ref={root}
      aria-labelledby="transformation-title"
      className="relative bg-espresso py-28 text-ivory sm:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="04" className="text-ivory/80">
              The Smile Transformation
            </SectionLabel>
            <h2
              id="transformation-title"
              data-reveal-lines
              className="display mt-10 text-[clamp(3.2rem,13vw,6rem)] lg:text-[clamp(5rem,8vw,10rem)]"
            >
              <span className="line-mask">
                <span>Small refinements.</span>
              </span>
              <span className="line-mask">
                <span className="italic text-champagne lg:pl-[1.2em]">A new perspective.</span>
              </span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-[0.95rem] leading-relaxed text-ivory/70 lg:mb-4">
            The most beautiful changes are often the most subtle: balanced shade, softened edges, harmony with your
            features. Drag to compare.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <ol className="order-2 self-end lg:order-1 lg:col-span-4 lg:pr-10">
            {process.map((p, i) => (
              <li key={p.title} data-reveal className="grid grid-cols-[2.75rem_1fr] border-t border-ivory/15 py-6">
                <span className="font-serif text-lg italic text-champagne">0{i + 1}</span>
                <div>
                  <p className="font-serif text-2xl font-light">{p.title}</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-ivory/65">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure data-compare data-reveal className="order-1 lg:order-2 lg:col-span-8">
            <CompareSlider
              ref={slider}
              before={images.transformation.before}
              after={images.transformation.after}
              afterAlign={{ scale: 1.5, origin: "47% 54%" }}
              className="aspect-[4/5] sm:aspect-[11/8]"
            />
            <figcaption className="mt-5 flex gap-3 text-xs leading-relaxed text-ivory/60">
              <Info aria-hidden strokeWidth={1.25} className="mt-0.5 size-4 shrink-0 text-champagne" />
              <span>
                <strong className="font-medium text-ivory/80">Illustrative comparison.</strong> These are two different
                stock photographs used to demonstrate how results can be presented. They are not a treatment result
                or a patient case. Individual outcomes vary; clinics should replace them with consented patient
                photography.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
