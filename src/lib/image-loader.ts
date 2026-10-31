"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Unsplash's CDN (imgix) handles resizing and modern formats, so each
 * `srcset` entry maps directly to a CDN URL. Local images pass through.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.toString();
}
