"use client";

import { useRef, useState } from "react";
import { visitSteps } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialImage } from "@/components/ui/EditorialImage";

const frames = [
  { width: "w-full", ratio: "aspect-[4/5]" },
  { width: "w-[86%] ml-auto lg:w-[80%]", ratio: "aspect-[1/1]" },
  { width: "w-full", ratio: "aspect-[4/3]" },
  { width: "w-[86%] lg:w-[78%]", ratio: "aspect-[3/4]" },
  { width: "w-full ml-auto lg:w-[90%]", ratio: "aspect-[4/5]" },
];

export function Visit() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      // Works regardless of motion preference: it only tracks which step is in view.
      gsap.utils.toArray<HTMLElement>("[data-visit-frame]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="visit" ref={root} aria-labelledby="visit-title" className="relative bg-sage py-28 text-espresso sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="06">Your Visit</SectionLabel>
            <h2
              id="visit-title"
              data-reveal-lines
              className="display mt-10 text-[clamp(3.4rem,14vw,6rem)] lg:text-[clamp(5rem,8.5vw,10.5rem)]"
            >
              <span className="line-mask">
                <span>A visit,</span>
              </span>
              <span className="line-mask">
                <span className="pl-[1em] italic">reconsidered.</span>
              </span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-[0.95rem] leading-relaxed text-espresso/85 lg:col-span-4 lg:mb-4">
            Natural light, soft materials and an unhurried rhythm. Every detail of the studio has been considered
            to make dentistry feel calm.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:mt-32 lg:grid-cols-12">
          {/* Sticky narrative (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-0 flex h-screen flex-col justify-center py-24">
              <ol className="border-t border-espresso/25">
                {visitSteps.map((s, i) => {
                  const on = i === active;
                  return (
                    <li
                      key={s.title}
                      aria-current={on ? "step" : undefined}
                      className="border-b border-espresso/25 py-5 transition-opacity duration-700"
                      style={{ opacity: on ? 1 : 0.42 }}
                    >
                      <div className="flex items-baseline gap-6">
                        <span className="w-8 font-serif text-lg italic">0{i + 1}</span>
                        <span className="font-serif text-[clamp(1.8rem,2.6vw,2.8rem)] font-light leading-none">{s.title}</span>
                      </div>
                      <div
                        className="grid transition-[grid-template-rows] duration-700 ease-out-expo"
                        style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                      >
                        <p className="overflow-hidden pl-14 text-[0.95rem] leading-relaxed text-espresso/85">
                          <span className="block max-w-sm pt-3">{s.text}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Photography */}
          <div className="flex flex-col gap-20 lg:col-span-6 lg:col-start-7 lg:gap-[22vh] lg:py-[12vh]">
            {visitSteps.map((s, i) => (
              <figure key={s.title} data-visit-frame className={frames[i].width}>
                <EditorialImage photo={s.image} sizes="(min-width: 1024px) 45vw, 100vw" className={frames[i].ratio} />
                <figcaption className="mt-5 lg:hidden">
                  <p className="flex items-baseline gap-4">
                    <span className="font-serif text-lg italic">0{i + 1}</span>
                    <span className="font-serif text-3xl font-light">{s.title}</span>
                  </p>
                  <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-espresso/85">{s.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
