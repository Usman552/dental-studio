"use client";

import { ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ScrollLink } from "./ScrollLink";

type Variant = "dark" | "light" | "outline-dark" | "outline-light";

const base =
  "group/btn relative isolate inline-flex whitespace-nowrap items-center justify-between gap-6 overflow-hidden px-6 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500";

const variants: Record<Variant, string> = {
  dark: "bg-espresso text-ivory hover:text-espresso",
  light: "bg-ivory text-espresso",
  "outline-dark": "border border-espresso/30 text-espresso hover:text-espresso",
  "outline-light": "border border-ivory/40 text-ivory hover:text-espresso",
};

function Inner({ children, icon = true }: { children: ReactNode; icon?: boolean }) {
  return (
    <>
      {/* Champagne fill that rises on hover */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-champagne transition-transform duration-700 ease-out-expo group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100"
      />
      <span className="relative">{children}</span>
      {icon && (
        <span aria-hidden className="relative block size-4 overflow-hidden">
          <ArrowUpRight
            strokeWidth={1.25}
            className="absolute inset-0 size-4 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-full group-hover/btn:-translate-y-full"
          />
          <ArrowUpRight
            strokeWidth={1.25}
            className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          />
        </span>
      )}
    </>
  );
}

export function LinkButton({
  href,
  children,
  variant = "dark",
  className = "",
  ...rest
}: {
  href: `#${string}`;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <ScrollLink href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner>{children}</Inner>
    </ScrollLink>
  );
}

export function Button({
  children,
  variant = "dark",
  className = "",
  icon = true,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; icon?: boolean }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
