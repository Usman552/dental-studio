"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { treatments, type Treatment, type TreatmentLayout } from "@/lib/content";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useScroll } from "@/components/layout/SmoothScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/Button";
import { SELECT_TREATMENT_EVENT, TreatmentDrawer } from "./TreatmentDrawer";

/**
 * Each layout is a different editorial composition on desktop.
 * Below `lg` every panel becomes part of a vertical editorial stack.
 */
const layouts: Record<TreatmentLayout, { article: string; media: string; text: string; ratio: string }> = {
  wide: {
    article: "lg:grid lg:w-[80vw] lg:grid-cols-12 lg:items-end lg:gap-10",
    media: "lg:col-span-7 lg:h-[68vh]",
    text: "lg:col-span-4 lg:col-start-9 lg:pb-2",
    ratio: "max-lg:aspect-[4/3]",
  },
  tall: {
    article: "lg:flex lg:w-[60vw] lg:items-center lg:gap-14",
    media: "lg:order-2 lg:h-[74vh] lg:w-[52%] lg:shrink-0",
    text: "lg:order-1 lg:flex-1",
    ratio: "max-lg:aspect-[4/5]",
  },
  offset: {
    article: "lg:flex lg:w-[72vw] lg:items-start lg:gap-14",
    media: "lg:mt-[12vh] lg:h-[60vh] lg:w-[58%] lg:shrink-0",
    text: "lg:flex-1 lg:pt-2",
    ratio: "max-lg:aspect-[1/1]",
  },
  portrait: {
    article: "lg:flex lg:w-[48vw] lg:flex-col lg:justify-end lg:gap-8",
    media: "lg:ml-auto lg:h-[54vh] lg:w-[68%]",
    text: "lg:w-[86%]",
    ratio: "max-lg:aspect-[4/5]",
  },
  split: {
    article: "lg:grid lg:w-[86vw] lg:grid-cols-2 lg:items-center lg:gap-20",
    media: "lg:h-[72vh]",
    text: "lg:pr-[6vw]",
    ratio: "max-lg:aspect-[4/3]",
  },
};

function TreatmentPanel({
  t,
  index,
  onOpen,
}: {
  t: Treatment;
  index: number;
  onOpen: (t: Treatment) => void;
}) {
  const l = layouts[t.layout];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      data-panel
      aria-labelledby={`treatment-${t.slug}`}
      className={`relative border-t border-espresso/15 py-14 max-lg:flex max-lg:flex-col max-lg:gap-8 sm:py-20 lg:h-full lg:shrink-0 lg:border-l lg:border-t-0 lg:px-[3.2vw] lg:pb-[104px] lg:pt-[120px] ${l.article}`}
    >
      <div
        data-panel-media
        className={`relative w-full overflow-hidden bg-ivory ${l.ratio} ${l.media} ${index % 2 ? "max-lg:ml-auto max-lg:w-[88%]" : "max-lg:w-[94%]"}`}
      >
        <div data-panel-img className="absolute inset-y-0 -inset-x-[8%]">
          <Image
            src={t.image.src}
            alt={t.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 94vw"
            className="photo-grade object-cover"
          />
        </div>
      </div>

      <div data-panel-text className={`flex flex-col ${l.text}`}>
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow text-sage-deep">
            <span className="font-serif text-base italic normal-case tracking-normal text-espresso">{num}</span>
            <span className="mx-2 opacity-50">/</span>
            {t.kicker}
          </p>
        </div>
        <h3
          id={`treatment-${t.slug}`}
          className="display mt-5 text-[clamp(3rem,13vw,5rem)] lg:text-[clamp(3.5rem,5.6vw,7rem)]"
        >
          {t.title[0]}
          <br />
          <em>{t.title[1]}</em>
        </h3>
        <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">{t.summary}</p>
        <button
          type="button"
          onClick={() => onOpen(t)}
          data-cursor="Open"
          className="group mt-8 flex w-fit items-center gap-4"
          aria-haspopup="dialog"
        >
          <span className="flex size-11 items-center justify-center border border-espresso/30 transition-colors duration-500 group-hover:border-espresso group-hover:bg-espresso group-hover:text-ivory">
            <Plus strokeWidth={1.25} className="size-4 transition-transform duration-500 group-hover:rotate-90" />
          </span>
          <span className="eyebrow link-u pb-1">
            Learn more<span className="sr-only"> about {t.name}</span>
          </span>
        </button>
      </div>
    </article>
  );
}

export function Treatments() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<Treatment | null>(null);
  const { scrollTo } = useScroll();

  const book = useCallback(
    (slug: string) => {
      setActive(null);
      window.dispatchEvent(new CustomEvent(SELECT_TREATMENT_EVENT, { detail: slug }));
      window.setTimeout(() => scrollTo("#appointment"), 650);
    },
    [scrollTo],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.desktop, () => {
        const el = track.current!;
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const distance = () => el.scrollWidth - window.innerWidth;
        let current = -1;

        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set("[data-progress]", { scaleX: self.progress });
              const x = self.progress * distance() + window.innerWidth * 0.55;
              let idx = 0;
              panels.forEach((p, i) => {
                if (p.offsetLeft <= x) idx = i;
              });
              if (idx !== current && counter.current) {
                current = idx;
                counter.current.textContent = String(idx + 1).padStart(2, "0");
              }
            },
          },
        });

        // Images drift sideways inside their frames, and text settles as each panel arrives.
        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelector("[data-panel-img]"),
            { xPercent: 6 },
            {
              xPercent: -6,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.fromTo(
            panel.querySelector("[data-panel-media]"),
            { clipPath: "inset(0% 0% 0% 100%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left 95%", end: "left 35%", scrub: true },
            },
          );
          gsap.fromTo(
            panel.querySelectorAll("[data-panel-text] > *"),
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.08,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left 70%", toggleActions: "play none none reverse" },
            },
          );
        });

        gsap.fromTo(
          "[data-treat-title] .line-mask > *",
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 70%" } },
        );

        ScrollTrigger.refresh();
      });

      mm.add(MOTION.mobile, () => {
        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: "top 82%", once: true } });
          tl.fromTo(
            panel.querySelector("[data-panel-media]"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          ).fromTo(
            panel.querySelectorAll("[data-panel-text] > *"),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 1.1, ease: "expo.out" },
            0.5,
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="treatments" ref={root} aria-labelledby="treatments-title" className="relative bg-stone text-espresso">
      <div className="lg:h-screen lg:overflow-hidden">
        <div ref={track} className="flex flex-col px-5 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:px-0">
          {/* Opening panel */}
          <header className="flex flex-col justify-between pb-14 pt-28 sm:pt-36 lg:h-full lg:w-[46vw] lg:shrink-0 lg:pb-[104px] lg:pl-12 lg:pr-[4vw] lg:pt-[120px]">
            <SectionLabel index="03">Signature Treatments</SectionLabel>
            <div>
              <h2
                id="treatments-title"
                data-treat-title
                className="display mt-12 text-[clamp(3.6rem,16vw,7rem)] lg:mt-0 lg:text-[clamp(5rem,8.4vw,10.5rem)]"
              >
                <span className="line-mask">
                  <span>Signature</span>
                </span>
                <span className="line-mask">
                  <span className="pl-[0.5em] italic">Treatments</span>
                </span>
              </h2>
              <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
                Seven disciplines, one philosophy. Each treatment is planned around your face, your health and the
                way you want to feel. Explore what&apos;s possible, then let&apos;s talk.
              </p>
            </div>
            <p className="eyebrow mt-12 hidden items-center gap-4 text-ink-soft lg:flex">
              <span aria-hidden className="h-px w-14 bg-current" />
              Scroll to explore
            </p>
          </header>

          {treatments.map((t, i) => (
            <TreatmentPanel key={t.slug} t={t} index={i} onOpen={setActive} />
          ))}

          {/* Closing panel */}
          <div className="flex flex-col justify-center gap-8 border-t border-espresso/15 py-20 lg:h-full lg:w-[40vw] lg:shrink-0 lg:border-l lg:border-t-0 lg:px-[4vw] lg:py-0">
            <p className="display text-[clamp(2.6rem,10vw,4rem)] lg:text-[clamp(3rem,4.4vw,5.5rem)]">
              Not sure where <em>to begin?</em>
            </p>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
              Most journeys start with a relaxed consultation. We&apos;ll listen, examine and talk through every
              option, with no obligation to proceed.
            </p>
            <LinkButton href="#appointment" className="w-full sm:w-fit">
              Book a consultation
            </LinkButton>
          </div>
        </div>

        {/* Progress (desktop) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-12 bottom-10 hidden items-center gap-6 lg:flex">
          <span className="eyebrow tabular-nums">
            <span ref={counter}>01</span>
            <span className="opacity-40"> / {String(treatments.length).padStart(2, "0")}</span>
          </span>
          <span className="relative h-px flex-1 bg-espresso/15">
            <span data-progress className="absolute inset-0 origin-left scale-x-0 bg-espresso" />
          </span>
        </div>
      </div>

      <TreatmentDrawer treatment={active} onClose={() => setActive(null)} onBook={book} />
    </section>
  );
}
