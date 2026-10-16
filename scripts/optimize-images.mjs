import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const input = path.join(root, "src/assets/gallery");
const output = path.join(root, "src/assets/previews");
const manifestPath = path.join(output, "manifest.json");
await mkdir(output, { recursive: true });
const previous = await readFile(manifestPath, "utf8").then(JSON.parse).catch(() => ({}));
const manifest = {};
let originalsBytes = 0;
let previewBytes = 0;

async function* images(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* images(filename);
    else if (/\.(jpe?g|png|webp|gif)$/i.test(entry.name)) yield filename;
  }
}

for await (const filename of images(input)) {
  const relative = path.relative(input, filename).split(path.sep).join("/");
  const source = await stat(filename);
  const fingerprint = `${source.size}:${source.mtimeMs}:webp-80-v1`;
  const cached = previous[relative];
  const cachedFilesExist = cached && (await Promise.all(
    cached.variants.map(({ file }) => stat(path.join(output, file)).then(() => true).catch(() => false))
  )).every(Boolean);

  if (cached?.fingerprint === fingerprint && cachedFilesExist) {
    manifest[relative] = cached;
  } else {
    // Still previews for animated artwork; the viewer retains the original.
    const metadata = await sharp(filename).metadata();
    const rotated = [5, 6, 7, 8].includes(metadata.orientation);
    const width = rotated ? metadata.height : metadata.width;
    const height = rotated ? metadata.width : metadata.height;
    const id = createHash("sha256").update(relative).digest("hex").slice(0, 16);
    const variants = [];
    for (const target of [...new Set([Math.min(480, width), Math.min(960, width)])]) {
      const file = `${id}-${target}.webp`;
      const info = await sharp(filename).rotate().resize({ width: target, withoutEnlargement: true })
        .webp({ quality: 80 }).toFile(path.join(output, file));
      variants.push({ file, width: info.width, bytes: info.size });
    }
    manifest[relative] = { fingerprint, width, height, variants };
  }
  originalsBytes += source.size;
  previewBytes += manifest[relative].variants.at(-1).bytes;
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${Object.keys(manifest).length} responsive image previews. Originals: ${(originalsBytes / 1e6).toFixed(2)} MB; largest previews combined: ${(previewBytes / 1e6).toFixed(2)} MB.`);
