import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist");

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const files = [
  "index.html",
  "favicon.svg",
  "icons.json",
  "llms.txt",
  "llms-full.txt",
  "robots.txt",
  "sitemap.xml",
  "LICENSE"
];

const directories = [
  "ai",
  "assets",
  "categories",
  "icons",
  "use-cases",
  "skills",
  "metadata"
];

const singleFiles = [
  ["docs/index.html", "docs/index.html"],
  ["docs/ai-agents.md", "docs/ai-agents.md"],
  ["api/icons.json", "api/icons.json"]
];

for (const file of files) {
  fs.cpSync(path.join(root, file), path.join(out, file), { recursive: true });
}

for (const dir of directories) {
  fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
}

for (const [source, target] of singleFiles) {
  const destination = path.join(out, target);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(root, source), destination);
}

fs.copyFileSync(path.join(root, "icons.json"), path.join(out, "icons", "catalogue.json"));

console.log("Prepared Vercel public output:", out);
