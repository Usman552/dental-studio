import { ArrowUp } from "lucide-react";
import { clinic, navigation } from "@/lib/content";
import { LinkButton } from "@/components/ui/Button";
import { ScrollLink } from "@/components/ui/ScrollLink";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory">
      <div className="mx-auto max-w-[112rem] px-5 pt-24 sm:px-8 lg:px-12 lg:pt-36">
        {/* Closing call to action */}
        <div className="flex flex-col gap-10 border-b border-ivory/15 pb-20 lg:flex-row lg:items-end lg:justify-between lg:pb-28">
          <p
            data-reveal-lines
            className="display text-[clamp(3rem,12vw,5.5rem)] lg:text-[clamp(4.5rem,7vw,8.5rem)]"
          >
            <span className="line-mask">
              <span>Your new perspective</span>
            </span>
            <span className="line-mask">
              <span className="italic text-champagne">begins here.</span>
            </span>
          </p>
          <div data-reveal className="w-full sm:w-auto">
            <LinkButton href="#appointment" variant="light" className="w-full sm:min-w-72">
              Book a consultation
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="eyebrow text-ivory/50">Studio</h2>
            <address className="mt-5 not-italic leading-relaxed text-ivory/85">
              {clinic.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a href={clinic.phoneHref} className="link-u mt-5 inline-block text-ivory/85">
              {clinic.phone}
            </a>
            <br />
            <a href={`mailto:${clinic.email}`} className="link-u mt-1 inline-block break-all text-ivory/85">
              {clinic.email}
            </a>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="eyebrow text-ivory/50">Opening hours</h2>
            <dl className="mt-5 space-y-2 text-ivory/85">
              {clinic.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 border-b border-ivory/10 pb-2">
                  <dt>{h.days}</dt>
                  <dd className="tabular-nums text-ivory/65">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-8">
            <h2 className="eyebrow text-ivory/50">Explore</h2>
            <ul className="mt-5 space-y-2">
              {navigation.map((n) => (
                <li key={n.href}>
                  <ScrollLink href={n.href} className="link-u text-ivory/85">
                    {n.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-ivory/50">Follow</h2>
            <ul className="mt-5 space-y-2">
              {clinic.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-ivory/85">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex items-start lg:col-span-1 lg:justify-end">
            <ScrollLink
              href="#top"
              className="flex size-14 items-center justify-center border border-ivory/25 transition-colors duration-500 hover:bg-ivory hover:text-espresso"
            >
              <ArrowUp strokeWidth={1.25} className="size-5" />
              <span className="sr-only">Back to top</span>
            </ScrollLink>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="select-none px-3 leading-none">
        <p className="display translate-y-[0.14em] text-center text-[23.5vw] leading-[0.8] tracking-[-0.02em] text-ivory/[0.07]">
          LUMIÈRE
        </p>
      </div>

      <div className="mx-auto flex max-w-[112rem] flex-col gap-3 border-t border-ivory/15 px-5 py-6 text-xs text-ivory/45 sm:px-8 md:flex-row md:justify-between lg:px-12">
        <p>© {clinic.name}. All rights reserved.</p>
        <p className="md:max-w-xl md:text-right">
          Concept website. Clinic details, team profile and testimonials are sample content for customisation.
          Information on this site is general and does not replace professional advice.
        </p>
      </div>
    </footer>
  );
}
