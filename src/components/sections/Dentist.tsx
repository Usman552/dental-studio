import { images } from "@/lib/images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialImage } from "@/components/ui/EditorialImage";

/** Visible placeholder for details only the clinic can supply. */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-start gap-2 border border-dashed border-espresso/35 bg-stone/40 px-3 py-2 text-[0.85rem] leading-snug text-ink-soft">
      <span aria-hidden className="eyebrow mt-[0.15em] shrink-0 text-[0.6rem] text-sage-deep">
        Edit
      </span>
      <span>{children}</span>
    </span>
  );
}

const credentials = [
  { term: "Qualifications", value: "Add dental degree(s), awarding institution and year" },
  { term: "Experience", value: "Add years in practice and areas of special interest" },
  { term: "Registration", value: "Add professional registration body and number" },
  { term: "Memberships", value: "Add professional associations, if applicable" },
];

export function Dentist() {
  return (
    <section id="dentist" aria-labelledby="dentist-title" className="relative bg-ivory py-28 text-espresso sm:py-36 lg:py-48">
      <div className="mx-auto grid max-w-[112rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <EditorialImage
              photo={images.dentist.portrait}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/5] lg:aspect-auto lg:h-[calc(100vh-9rem)]"
              imgClassName="object-[50%_20%]"
              parallax={0.05}
            />
            <div className="mt-4 flex justify-between text-ink-soft">
              <p className="eyebrow">Principal Dentist</p>
              <p className="eyebrow">Sample profile</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
          <SectionLabel index="05">Meet Your Dentist</SectionLabel>

          <h2
            id="dentist-title"
            data-reveal-lines
            className="display mt-10 text-[clamp(3.4rem,14vw,6rem)] lg:text-[clamp(4.5rem,7vw,8.5rem)]"
          >
            <span className="line-mask">
              <span>Dr. Amélie</span>
            </span>
            <span className="line-mask">
              <span className="pl-[0.8em] italic">Laurent</span>
            </span>
          </h2>

          <p data-reveal className="mt-6">
            <Placeholder>Sample name and portrait for this concept. Replace with your dentist&apos;s details.</Placeholder>
          </p>

          <p data-reveal className="mt-10 text-[0.98rem] leading-relaxed text-ink-soft">
            Amélie leads the studio&apos;s cosmetic and general care with a simple conviction: that the best dentistry
            begins with listening. Her approach combines meticulous planning with a natural, restrained aesthetic,
            so that treatment enhances a face rather than redesigning it.
          </p>

          <blockquote data-reveal className="mt-14 border-l border-champagne pl-6 sm:pl-8">
            <p className="font-serif text-[clamp(1.75rem,3vw,2.6rem)] font-light italic leading-[1.15]">
              &ldquo;I measure success by how little people notice the dentistry, and how much they notice your
              confidence.&rdquo;
            </p>
            <footer className="eyebrow mt-5 text-ink-soft">Treatment philosophy</footer>
          </blockquote>

          <dl className="mt-16 border-t border-espresso/15">
            {credentials.map((c) => (
              <div
                key={c.term}
                data-reveal
                className="grid gap-3 border-b border-espresso/15 py-5 sm:grid-cols-[10rem_1fr] sm:items-center"
              >
                <dt className="eyebrow">{c.term}</dt>
                <dd>
                  <Placeholder>{c.value}</Placeholder>
                </dd>
              </div>
            ))}
          </dl>

          <figure className="mt-16 sm:w-3/4 lg:w-[70%]">
            <EditorialImage
              photo={images.dentist.detail}
              sizes="(min-width: 1024px) 30vw, 75vw"
              className="aspect-[4/3]"
              parallax={0.08}
            />
            <figcaption className="eyebrow mt-4 text-ink-soft">Every plan begins with a conversation</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
