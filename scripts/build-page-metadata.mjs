import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const pages = JSON.parse(await readFile(path.join(root, "src/data/pageMetadata.json"), "utf8"));
const template = await readFile(path.join(root, "dist/index.html"), "utf8");
const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const [route, page] of Object.entries(pages)) {
  const directory = path.join(root, "dist", route.slice(1));
  await mkdir(directory, { recursive: true });
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*(")/g, `$1${escape(page.description)}$2`)
    .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*(")/g, `$1${escape(page.title)}$2`);
  await writeFile(path.join(directory, "index.html"), html);
  // Vite preview resolves extensionless paths to .html, and trailing slashes
  // to directory/index.html. Keep both forms consistent with hosted rewrites.
  if (route !== "/") await writeFile(`${directory}.html`, html);
}
console.log("Generated route-specific HTML metadata for Home, Gallery and Contact.");
