import manifest from "../assets/video-previews/manifest.json";
const originals = import.meta.glob("../assets/gallery/**/*.{mp4,webm}", { eager: true, import: "default" });
const previews = import.meta.glob("../assets/video-previews/*.mp4", { eager: true, import: "default" });
const byUrl = new Map(Object.entries(manifest).map(([key, item]) => [
  originals[key] || key,
  previews[`../assets/video-previews/${item.file}`],
]));

export function videoPreview(src) {
  // New media without generated previews keeps its poster until the next build.
  return byUrl.get(src);
}
