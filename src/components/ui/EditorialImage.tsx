import Image from "next/image";
import type { Photo } from "@/lib/images";

type Props = {
  photo: Photo;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Vertical drift as a fraction of frame height; 0 disables parallax. */
  parallax?: number;
  reveal?: boolean;
  quality?: number;
};

/**
 * A cropped photographic frame. The image is oversized vertically so it can
 * drift inside the frame (parallax) without ever exposing an edge.
 */
export function EditorialImage({
  photo,
  sizes,
  className = "",
  imgClassName = "",
  parallax = 0.07,
  reveal = true,
  quality,
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-stone ${className}`} {...(reveal ? { "data-reveal-img": "" } : {})}>
      <div
        className="absolute inset-x-0 -inset-y-[12%]"
        {...(parallax ? { "data-parallax": String(parallax) } : {})}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          quality={quality}
          className={`photo-grade object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );
}
