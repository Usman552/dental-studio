import { clinic } from "@/lib/content";
import { images } from "@/lib/images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { AppointmentForm } from "./AppointmentForm";

export function Appointment() {
  return (
    <section id="appointment" aria-labelledby="appointment-title" className="relative bg-ivory py-28 text-espresso sm:py-36 lg:py-44">
      <div className="mx-auto grid max-w-[112rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="flex flex-col lg:col-span-5">
          <SectionLabel index="09">Appointments</SectionLabel>
          <h2
            id="appointment-title"
            data-reveal-lines
            className="display mt-10 text-[clamp(3.4rem,14vw,6rem)] lg:text-[clamp(4.5rem,7.2vw,9rem)]"
          >
            <span className="line-mask">
              <span>Begin with a</span>
            </span>
            <span className="line-mask">
              <span className="pl-[0.6em] italic">conversation.</span>
            </span>
          </h2>
          <p data-reveal className="mt-8 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
            Share a few details and your preferred date. We&apos;ll be in touch to confirm a time, answer any
            questions and prepare for your visit.
          </p>

          <dl className="mt-12 grid gap-6 border-t border-espresso/15 pt-8 sm:grid-cols-[auto_1fr] sm:gap-12">
            <div data-reveal>
              <dt className="eyebrow text-ink-soft">Call the studio</dt>
              <dd className="mt-2 font-serif text-2xl">
                <a href={clinic.phoneHref} className="link-u">
                  {clinic.phone}
                </a>
              </dd>
            </div>
            <div data-reveal>
              <dt className="eyebrow text-ink-soft">Write to us</dt>
              <dd className="mt-2 break-words font-serif text-2xl">
                <a href={`mailto:${clinic.email}`} className="link-u">
                  {clinic.email}
                </a>
              </dd>
            </div>
          </dl>

          <figure className="mt-16 hidden w-[72%] lg:mt-auto lg:block lg:pt-16">
            <EditorialImage
              photo={images.appointment.portrait}
              sizes="(min-width: 1024px) 28vw, 70vw"
              className="aspect-[4/5]"
              parallax={0.08}
            />
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal className="bg-espresso px-6 py-12 text-ivory sm:px-12 sm:py-14 lg:px-14 lg:py-16">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
