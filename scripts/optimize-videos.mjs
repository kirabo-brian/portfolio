import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
let ffmpeg;

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "src/assets/video-previews");
await mkdir(output, { recursive: true });
const manifestFile = path.join(output, "manifest.json");
const previous = await readFile(manifestFile, "utf8").then(JSON.parse).catch(() => ({}));
const manifest = {};
const sources = [{ file: path.join(root, "public/videos/background_2.mp4"), key: "/videos/background_2.mp4", width: 1280 }];

async function collect(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) await collect(file);
    else if (/\.(mp4|webm)$/i.test(item.name)) sources.push({ file, key: `../assets/${path.relative(path.join(root, "src/assets"), file).split(path.sep).join("/")}`, width: 640 });
  }
}
await collect(path.join(root, "src/assets/gallery"));

let originalBytes = 0;
let previewBytes = 0;
for (const source of sources) {
  const info = await stat(source.file);
  const fingerprint = `${info.size}:${info.mtimeMs}:8sec-${source.width}-24fps-crf32-v1`;
  const file = `${createHash("sha256").update(source.key).digest("hex").slice(0, 16)}.mp4`;
  const destination = path.join(output, file);
  const exists = await stat(destination).then(() => true).catch(() => false);
  if (!exists || previous[source.key]?.fingerprint !== fingerprint) {
    ffmpeg ||= process.env.FFMPEG_PATH || (await import("@ffmpeg-installer/ffmpeg")).default.path;
    await new Promise((resolve, reject) => {
      const process = spawn(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", "-i", source.file,
        "-t", "8", "-an", "-vf", `scale=${source.width}:-2,fps=24`, "-c:v", "libx264",
        "-preset", "medium", "-crf", "32", "-pix_fmt", "yuv420p", "-threads", "2", "-movflags", "+faststart", destination], { windowsHide: true });
      let error = "";
      process.stderr.on("data", chunk => { error += chunk; });
      process.on("error", reject);
      process.on("close", code => code === 0 ? resolve() : reject(new Error(`Video preview failed: ${source.key}\n${error}`)));
    });
  }
  const bytes = (await stat(destination)).size;
  manifest[source.key] = { file, fingerprint, bytes };
  originalBytes += info.size;
  previewBytes += bytes;
}
await writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${sources.length} silent video previews: ${(originalBytes / 1e6).toFixed(2)} MB originals → ${(previewBytes / 1e6).toFixed(2)} MB previews.`);
