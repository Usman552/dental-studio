"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { stories } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Stories() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const first = useRef(true);
  const swipeStart = useRef<number | null>(null);
  const story = stories[index];

  const go = (dir: number) => setIndex((i) => (i + dir + stories.length) % stories.length);

  useGSAP(
    () => {
      // Skip the very first render; the section's scroll reveal handles that.
      if (first.current) {
        first.current = false;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-quote-word]",
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.012, ease: "expo.out" },
      );
      gsap.fromTo("[data-quote-meta]", { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.3 });
    },
    { scope: root, dependencies: [index] },
  );

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section id="stories" ref={root} aria-labelledby="stories-title" className="relative bg-ivory py-28 text-espresso sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <SectionLabel index="07">Patient Stories</SectionLabel>
            <h2 id="stories-title" className="sr-only">
              Patient stories (demonstration)
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-xs border border-dashed border-espresso/35 px-4 py-3 text-xs leading-relaxed text-ink-soft"
          >
            <span className="eyebrow mb-1 block text-espresso">Demonstration testimonials</span>
            Sample copy written for this concept site. These are not real patient reviews.
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Demonstration testimonials"
          className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div data-reveal className="flex items-start gap-4 lg:col-span-2 lg:flex-col">
            <span className="display text-[clamp(4rem,9vw,9rem)] italic leading-none text-champagne" aria-hidden>
              &ldquo;
            </span>
          </div>

          <figure
            aria-live="polite"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${stories.length}`}
            className="lg:col-span-9"
          >
            <blockquote data-reveal className="min-h-[9em] font-serif text-[clamp(1.9rem,5.4vw,3rem)] font-light leading-[1.12] tracking-[-0.015em] sm:min-h-[6.8em] lg:min-h-[4.6em] lg:text-[clamp(2.5rem,4vw,4.6rem)]">
              <p>
                {story.quote.split(" ").map((w, i) => (
                  <span key={`${index}-${i}`} className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span data-quote-word className="inline-block pr-[0.24em]">
                      {w}
                    </span>
                  </span>
                ))}
              </p>
            </blockquote>
            <figcaption data-quote-meta className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-serif text-2xl italic">{story.name}</span>
              <span aria-hidden className="h-px w-8 bg-espresso/30" />
              <span className="eyebrow text-ink-soft">{story.treatment}</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-16 flex items-center justify-between gap-8 border-t border-espresso/15 pt-8 lg:ml-[calc(2/12*100%)]">
          <div className="flex flex-1 items-center gap-2" aria-hidden>
            {stories.map((_, i) => (
              <span key={i} className="relative h-px flex-1 max-w-24 bg-espresso/15">
                <span
                  className="absolute inset-0 origin-left bg-espresso transition-transform duration-700 ease-out-expo"
                  style={{ transform: `scaleX(${i === index ? 1 : 0})` }}
                />
              </span>
            ))}
            <span className="eyebrow ml-4 tabular-nums text-ink-soft">
              {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex size-14 items-center justify-center border border-espresso/25 transition-colors duration-500 hover:bg-espresso hover:text-ivory"
            >
              <ArrowLeft strokeWidth={1.25} className="size-5" />
              <span className="sr-only">Previous story</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex size-14 items-center justify-center border border-espresso/25 transition-colors duration-500 hover:bg-espresso hover:text-ivory"
            >
              <ArrowRight strokeWidth={1.25} className="size-5" />
              <span className="sr-only">Next story</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
