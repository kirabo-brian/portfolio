import manifest from "../assets/previews/manifest.json";

const originals = import.meta.glob("../assets/gallery/**/*.{jpg,jpeg,png,webp,gif}", {
  eager: true,
  import: "default",
});
const previews = import.meta.glob("../assets/previews/*.webp", {
  eager: true,
  import: "default",
});

const imagesByUrl = new Map(Object.entries(originals).map(([path, url]) => {
  const entry = manifest[path.replace("../assets/gallery/", "")];
  if (!entry) return [url, null];
  const variants = (entry.cardVariants?.length ? entry.cardVariants : entry.variants).map((variant) => ({
    ...variant,
    src: previews[`../assets/previews/${variant.file}`],
  }));
  return [url, {
    src: variants.at(-1).src,
    srcSet: variants.map(({ src, width }) => `${src} ${width}w`).join(", "),
    width: variants.at(-1).height ? variants.at(-1).width : entry.width,
    height: variants.at(-1).height || entry.height,
  }];
}));

export function previewProps(src) {
  return imagesByUrl.get(src) || { src };
}

export function previewUrl(src) {
  return previewProps(src).src;
}
