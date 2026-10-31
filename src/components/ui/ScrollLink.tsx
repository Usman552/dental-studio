"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useScroll } from "@/components/layout/SmoothScroll";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: `#${string}`; offset?: number };

/** In-page anchor that uses smooth scrolling, and still works without JavaScript. */
export function ScrollLink({ href, offset, onClick, ...rest }: Props) {
  const { scrollTo } = useScroll();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    scrollTo(href, { offset });
    history.replaceState(null, "", href);
  };

  return <a href={href} onClick={handle} {...rest} />;
}
