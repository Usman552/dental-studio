"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { articles, type Article } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScroll } from "@/components/layout/SmoothScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

export function Journal() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<Article | null>(null);
  // Keep the last article rendered while the drawer animates closed.
  const [shown, setShown] = useState<Article | null>(null);
  if (open && open !== shown) setShown(open);
  const { scrollTo } = useScroll();

  const [featured, ...rest] = articles;

  useGSAP(
    () => {
      moveX.current = gsap.quickTo(preview.current, "x", { duration: 0.7, ease: "expo.out" });
      moveY.current = gsap.quickTo(preview.current, "y", { duration: 0.7, ease: "expo.out" });
    },
    { scope: root },
  );

  const onMove = (e: MouseEvent) => {
    const rect = list.current?.getBoundingClientRect();
    if (!rect) return;
    moveX.current?.(e.clientX - rect.left);
    moveY.current?.(e.clientY - rect.top);
  };

  return (
    <section id="journal" ref={root} aria-labelledby="journal-title" className="relative bg-stone py-28 text-espresso sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="08">Smile Journal</SectionLabel>
            <h2
              id="journal-title"
              data-reveal-lines
              className="display mt-10 text-[clamp(3.6rem,16vw,7rem)] lg:text-[clamp(5rem,9vw,11rem)]"
            >
              <span className="line-mask">
                <span>Smile</span>
              </span>
              <span className="line-mask">
                <span className="pl-[1.2em] italic">Journal</span>
              </span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft lg:col-span-4 lg:mb-4">
            Notes on care, craft and confidence: practical guidance from the studio, written in plain language.
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Featured */}
          <article className="lg:col-span-6">
            <button
              type="button"
              onClick={() => setOpen(featured)}
              data-cursor="Read"
              aria-haspopup="dialog"
              className="group block w-full text-left"
            >
              <EditorialImage
                photo={featured.image}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="aspect-[6/5]"
                imgClassName="transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.04]"
              />
              <div data-reveal className="mt-7 flex items-center gap-4 text-ink-soft">
                <span className="eyebrow text-espresso">Featured</span>
                <span aria-hidden className="h-px w-6 bg-current opacity-40" />
                <span className="eyebrow">{featured.category}</span>
                <span className="eyebrow ml-auto">{featured.readTime}</span>
              </div>
              <h3 data-reveal className="mt-5 max-w-xl font-serif text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.015em]">
                <span className="link-u">{featured.title}</span>
              </h3>
              <p data-reveal className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink-soft">
                {featured.excerpt}
              </p>
            </button>
          </article>

          {/* Index */}
          <div
            ref={list}
            onMouseMove={onMove}
            onMouseLeave={() => setHovered(null)}
            className="relative lg:col-span-5 lg:col-start-8"
          >
            <ol className="border-t border-espresso/20">
              {rest.map((a, i) => (
                <li key={a.slug} data-reveal className="border-b border-espresso/20">
                  <button
                    type="button"
                    onClick={() => setOpen(a)}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(null)}
                    aria-haspopup="dialog"
                    className="group grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-6 text-left sm:grid-cols-[5.5rem_1fr_auto] lg:grid-cols-[2.5rem_1fr_auto] lg:py-8"
                  >
                    <span className="relative aspect-square w-full overflow-hidden bg-ivory lg:hidden">
                      <Image src={a.image.src} alt="" fill sizes="88px" className="photo-grade object-cover" />
                    </span>
                    <span className="hidden font-serif text-lg italic text-ink-soft lg:block">0{i + 2}</span>
                    <span>
                      <span className="eyebrow flex gap-3 text-ink-soft">
                        {a.category}
                        <span aria-hidden>·</span>
                        {a.readTime}
                      </span>
                      <span className="mt-2 block font-serif text-[clamp(1.35rem,2vw,1.85rem)] font-light leading-[1.12] transition-transform duration-700 ease-out-expo lg:group-hover:translate-x-3">
                        {a.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.25}
                      className="size-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </button>
                </li>
              ))}
            </ol>

            {/* Cursor-following preview (desktop, pointer only) */}
            <div
              ref={preview}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 hidden w-56 [@media(hover:hover)_and_(min-width:1024px)]:block"
              style={{ marginLeft: "-17rem", marginTop: "-9rem" }}
            >
              <div
                className="relative aspect-[4/5] overflow-hidden bg-ivory transition-[opacity,scale] duration-500 ease-out-expo"
                style={{ opacity: hovered === null ? 0 : 1, scale: hovered === null ? "0.85" : "1" }}
              >
                {rest.map((a, i) => (
                  <Image
                    key={a.slug}
                    src={a.image.src}
                    alt=""
                    fill
                    sizes="224px"
                    className="photo-grade object-cover transition-opacity duration-500"
                    style={{ opacity: hovered === i ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>

            <p data-reveal className="mt-8 text-xs leading-relaxed text-ink-soft">
              Journal articles offer general information only and are not a substitute for personal advice from
              your dentist.
            </p>
          </div>
        </div>
      </div>

      <Drawer open={!!open} onClose={() => setOpen(null)} label={shown?.title ?? "Article"}>
        {shown && (
          <article>
            <div className="relative aspect-[16/10] overflow-hidden bg-stone">
              <Image src={shown.image.src} alt={shown.image.alt} fill sizes="(min-width: 640px) 640px, 100vw" className="photo-grade object-cover" />
            </div>
            <div className="px-6 pb-14 pt-10 sm:px-12">
              <p data-drawer-item className="eyebrow flex gap-3 text-sage-deep">
                {shown.category}
                <span aria-hidden>·</span>
                {shown.readTime}
              </p>
              <h2 data-drawer-item className="mt-4 font-serif text-[clamp(2.2rem,6vw,3.4rem)] font-light leading-[1.02] tracking-[-0.02em]">
                {shown.title}
              </h2>
              <p data-drawer-item className="mt-6 font-serif text-xl italic leading-snug text-ink-soft">
                {shown.excerpt}
              </p>
              <div data-drawer-item className="mt-8 space-y-5 border-t border-espresso/15 pt-8 text-[0.98rem] leading-[1.75] text-ink-soft">
                {shown.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <p data-drawer-item className="mt-10 border-l border-champagne pl-4 text-xs leading-relaxed text-ink-soft">
                General information only. For advice about your own oral health, please speak with your dentist.
              </p>
              <div data-drawer-item className="mt-10">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    setOpen(null);
                    window.setTimeout(() => scrollTo("#appointment"), 650);
                  }}
                >
                  Book a consultation
                </Button>
              </div>
            </div>
          </article>
        )}
      </Drawer>
    </section>
  );
}
