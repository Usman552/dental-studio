"use client";

import { useRef } from "react";
import { images } from "@/lib/images";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialImage } from "@/components/ui/EditorialImage";

const headline: { words: string[]; italic?: boolean; indent?: string }[] = [
  { words: ["Exceptional"] },
  { words: ["Dentistry."], indent: "pl-[12vw] lg:pl-[18vw]" },
  { words: ["Naturally"], italic: true, indent: "pl-[4vw]" },
  { words: ["Beautiful", "Smiles."] },
];

const principles = [
  {
    title: "Precision",
    text: "Meticulous planning, careful records and craftsmanship you can feel, even when you can't see it.",
  },
  {
    title: "Comfort",
    text: "An unhurried pace, a calm studio and clear explanations before anything begins.",
  },
  {
    title: "Natural beauty",
    text: "Results designed around your face, your features and your life, never a template.",
  },
];

export function Introduction() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        // Words brighten as they move through the viewport, like ink settling.
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.25,
            ease: "none",
            scrollTrigger: { trigger: "[data-intro-headline]", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="philosophy" ref={root} className="relative bg-ivory py-28 text-espresso sm:py-36 lg:py-48">
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionLabel index="02" className="lg:col-span-4" >
            Philosophy
          </SectionLabel>
          <p data-reveal className="max-w-md text-[0.95rem] leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9">
            Lumière is a dental studio for people who notice detail: where clinical excellence is quiet, and the
            result simply looks like you, rested and at ease.
          </p>
        </div>

        <h2
          data-intro-headline
          className="display mt-14 text-[clamp(3.2rem,13.5vw,6rem)] sm:text-[clamp(4rem,11vw,9rem)] lg:mt-20 lg:text-[clamp(6rem,10.5vw,13.5rem)]"
        >
          {headline.map((line, i) => (
            <span key={i} className={`block ${line.indent ?? ""} ${line.italic ? "italic" : ""}`}>
              {line.words.map((w, j) => (
                <span key={j} data-word className="inline-block pr-[0.22em] last:pr-0">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="mt-20 grid gap-14 lg:mt-36 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-5">
            <EditorialImage
              photo={images.intro.portrait}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5]"
            />
            <figcaption className="eyebrow mt-4 flex justify-between text-ink-soft">
              <span>Fig. 01</span>
              <span>Natural, never overdone</span>
            </figcaption>
          </figure>

          <div className="relative flex flex-col lg:col-span-6 lg:col-start-7 lg:pt-24">
            <p data-reveal className="font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.12] tracking-[-0.01em]">
              We believe a beautiful smile should look like it has{" "}
              <em className="text-sage-deep">always been yours.</em>
            </p>
            <div className="mt-10 grid gap-6 text-[0.95rem] leading-relaxed text-ink-soft sm:grid-cols-2 sm:gap-8">
              <p data-reveal>
                Every plan begins with listening. We take time to understand how you feel about your smile, then
                combine careful diagnosis with an eye for proportion, colour and light.
              </p>
              <p data-reveal>
                From routine care to complete smile design, treatment is paced around your comfort and explained
                in plain language, so every decision is yours.
              </p>
            </div>

            <ol className="mt-16 border-t border-espresso/15">
              {principles.map((p, i) => (
                <li
                  key={p.title}
                  data-reveal
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-espresso/15 py-6 sm:grid-cols-[4rem_12rem_1fr] sm:items-baseline"
                >
                  <span className="font-serif text-lg italic text-sage-deep">0{i + 1}</span>
                  <span className="font-serif text-2xl font-light">{p.title}</span>
                  <span className="col-start-2 text-[0.9rem] leading-relaxed text-ink-soft sm:col-start-3">{p.text}</span>
                </li>
              ))}
            </ol>

            <figure className="mt-14 ml-auto w-[62%] sm:w-[46%] lg:-mb-40 lg:mt-20 lg:w-[48%]">
              <EditorialImage
                photo={images.intro.detail}
                sizes="(min-width: 1024px) 22vw, 60vw"
                className="aspect-[3/4]"
                parallax={0.12}
              />
              <figcaption className="eyebrow mt-4 text-ink-soft">Fig. 02 — Precision, quietly</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
