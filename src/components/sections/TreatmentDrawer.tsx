"use client";

import Image from "next/image";
import { useState } from "react";
import type { Treatment } from "@/lib/content";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

export const SELECT_TREATMENT_EVENT = "lumiere:select-treatment";

export function TreatmentDrawer({
  treatment,
  onClose,
  onBook,
}: {
  treatment: Treatment | null;
  onClose: () => void;
  onBook: (slug: string) => void;
}) {
  // Keep the last treatment rendered while the drawer animates closed.
  const [shown, setShown] = useState<Treatment | null>(treatment);
  if (treatment && treatment !== shown) setShown(treatment);

  return (
    <Drawer open={!!treatment} onClose={onClose} label={shown ? shown.name : "Treatment details"}>
      {shown && (
        <article>
          <div className="relative aspect-[16/11] overflow-hidden bg-stone">
            <Image
              src={shown.image.src}
              alt={shown.image.alt}
              fill
              sizes="(min-width: 640px) 640px, 100vw"
              className="photo-grade object-cover"
            />
          </div>
          <div className="px-6 pb-14 pt-10 sm:px-12">
            <p data-drawer-item className="eyebrow text-sage-deep">
              {shown.kicker}
            </p>
            <h2 data-drawer-item className="display mt-4 text-[clamp(2.75rem,8vw,4.25rem)]">
              {shown.title[0]} <em>{shown.title[1]}</em>
            </h2>
            <div data-drawer-item className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-ink-soft">
              {shown.details.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <div data-drawer-item className="mt-10 border-t border-espresso/15 pt-8">
              <h3 className="eyebrow">Often considered for</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-2 text-[0.95rem] sm:grid-cols-2">
                {shown.suitedTo.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-espresso/40" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div data-drawer-item className="mt-10 border-t border-espresso/15 pt-8">
              <h3 className="eyebrow">What to expect</h3>
              <ol className="mt-6 space-y-6">
                {shown.steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
                    <span className="font-serif text-lg italic text-sage-deep">0{i + 1}</span>
                    <div>
                      <p className="font-serif text-2xl font-light">{s.title}</p>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div data-drawer-item className="mt-12">
              <Button type="button" className="w-full" onClick={() => onBook(shown.slug)}>
                Request a consultation
              </Button>
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                Suitability, timings and fees are confirmed at your consultation. Every smile is different, and so
                is every plan.
              </p>
            </div>
          </div>
        </article>
      )}
    </Drawer>
  );
}
