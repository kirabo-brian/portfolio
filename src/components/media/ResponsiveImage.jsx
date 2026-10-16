import { previewProps } from "../../data/responsiveImages";

export default function ResponsiveImage({ src, alt, sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw", ...props }) {
  return (
    <img
      {...previewProps(src)}
      alt={alt}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
