"use client";

import Image from "next/image";
import { useRef } from "react";
import { images } from "@/lib/images";
import { clinic } from "@/lib/content";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { LinkButton } from "@/components/ui/Button";
import { ScrollLink } from "@/components/ui/ScrollLink";

const lines = [
  { text: "A New", className: "" },
  { text: "Perspective", className: "italic pl-[0.55em] lg:pl-[1.4em]" },
  { text: "on Your Smile.", className: "" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.motion, () => {
        // Query the document directly: the site header lives outside this section's scope.
        const fades = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-fade]"));

        const tl = gsap.timeline({ delay: 0.15 });
        tl.fromTo(
          "[data-hero-media]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "expo.inOut" },
        )
          .fromTo("[data-hero-image]", { scale: 1.32 }, { scale: 1.04, duration: 2.8, ease: "expo.out" }, 0.1)
          .fromTo(
            "[data-hero-line]",
            // y is zeroed explicitly: GSAP would otherwise inherit the CSS pre-hide offset as pixels.
            { yPercent: 110, y: 0 },
            { yPercent: 0, y: 0, duration: 1.5, stagger: 0.11, ease: "expo.out" },
            1.0,
          )
          .fromTo(fades, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.06 }, 1.45);

        // Scroll-out: the photograph drifts slower than the page while the type lifts away.
        gsap.to("[data-hero-image-wrap]", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          y: -90,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      aria-label="Introduction"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-espresso text-ivory"
    >
      <div data-hero-media className="absolute inset-0">
        <div data-hero-image-wrap className="absolute inset-0">
          <div data-hero-image className="absolute inset-0 will-change-transform">
            <Image
              src={images.hero.desktop.src}
              alt={images.hero.desktop.alt}
              fill
              preload
              quality={80}
              sizes="100vw"
              className="photo-grade hidden object-cover object-[68%_30%] md:block"
            />
            <Image
              src={images.hero.mobile.src}
              alt={images.hero.mobile.alt}
              fill
              preload
              quality={80}
              sizes="100vw"
              className="photo-grade object-cover object-[50%_35%] md:hidden"
            />
          </div>
        </div>
        {/* Legibility scrim for type over photography */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/45 to-espresso/15 md:from-espresso/70 md:via-espresso/5 md:to-espresso/25" />
      </div>

      <div
        data-hero-content
        className="relative mx-auto flex h-full max-w-[112rem] flex-col justify-between px-5 pb-8 pt-[104px] sm:px-8 lg:px-12 lg:pb-12 lg:pt-[128px]"
      >
        {/* Top editorial details */}
        <div className="flex items-start justify-between gap-6">
          <p data-hero-fade className="eyebrow flex items-center gap-3 text-ivory/85">
            <span className="font-serif text-[0.95rem] italic normal-case tracking-normal">(01)</span>
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            The Smile Edition
          </p>
          <p data-hero-fade className="eyebrow hidden text-right leading-relaxed text-ivory/85 md:block">
            Cosmetic &amp; General Dentistry
            <br />
            <span className="text-ivory/60">By appointment</span>
          </p>
        </div>

        {/* Headline and CTA */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="display text-[clamp(3.6rem,15.5vw,6.5rem)] md:text-[clamp(5rem,10.2vw,12.5rem)]">
            <span className="sr-only">{clinic.name}: </span>
            {lines.map((l) => (
              <span key={l.text} className="line-mask">
                <span data-hero-line className={l.className}>
                  {l.text}
                </span>
              </span>
            ))}
          </h1>

          <div className="flex w-full flex-col gap-6 sm:max-w-sm lg:mb-3 lg:w-[22rem]">
            <p data-hero-fade className="text-[0.95rem] leading-relaxed text-ivory/85">
              Premium cosmetic and general dentistry, delivered with calm precision, in a studio designed around
              you.
            </p>
            <div data-hero-fade>
              <LinkButton href="#appointment" variant="light" className="w-full">
                Book a consultation
              </LinkButton>
            </div>
            <div data-hero-fade className="flex items-center justify-between text-ivory/70">
              <ScrollLink href="#philosophy" className="eyebrow group flex items-center gap-3">
                <span aria-hidden className="scroll-line relative block h-8 w-px overflow-hidden bg-ivory/25" />
                Discover the studio
              </ScrollLink>
              <span className="eyebrow">Mon – Sat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
