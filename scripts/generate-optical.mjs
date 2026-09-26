import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const rules = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-rules.json"), "utf8"));
const sizes = rules.reviewSizes;
const columns = 10;
const cellWidth = 112;
const cellHeight = 96;
const headerHeight = 24;
const outputDir = path.join(root, "visual-snapshots");
fs.mkdirSync(outputDir, { recursive: true });

const escapeXml = value => String(value).replace(/[&<>]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[character]));
const icons = [...metadata.icons].sort((a, b) => a.name.localeCompare(b.name));
const count = (value, expression) => [...value.matchAll(expression)].length;
const pathCommands = data => count(data, /[AaCcHhLlMmQqSsTtVvZz]/g);

const audit = icons.map(icon => {
  const svg = fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8");
  const drawableElements = count(svg, /<(?:path|circle|rect|line|polyline|polygon|ellipse)\b/g);
  const paths = [...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(match => match[1]);
  const commands = paths.reduce((total, data) => total + pathCommands(data), 0);
  const complexityScore = drawableElements * 2 + commands;
  return { name: icon.name, drawableElements, pathCommands: commands, complexityScore, microReview: complexityScore >= rules.micro.reviewScoreThreshold };
});

for (const size of sizes) {
  const rows = Math.ceil(icons.length / columns);
  const width = columns * cellWidth;
  const height = headerHeight + rows * cellHeight;
  const cells = icons.map((icon, index) => {
    const svg = fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8");
    const body = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
    const x = (index % columns) * cellWidth;
    const y = headerHeight + Math.floor(index / columns) * cellHeight;
    const iconX = x + (cellWidth - size) / 2;
    const iconY = y + 8;
    const guide = size * rules.optical.primaryLiveAreaRatio;
    const guideX = iconX + (size - guide) / 2;
    const guideY = iconY + (size - guide) / 2;
    return [
      "<g data-icon=\"", escapeXml(icon.name), "\"><rect x=\"", x, "\" y=\"", y, "\" width=\"", cellWidth, "\" height=\"", cellHeight, "\" fill=\"#fff\"/>",
      "<rect x=\"", guideX.toFixed(3), "\" y=\"", guideY.toFixed(3), "\" width=\"", guide.toFixed(3), "\" height=\"", guide.toFixed(3), "\" fill=\"none\" stroke=\"#d8d8d8\" stroke-width=\"0.5\" stroke-dasharray=\"2 2\"/>",
      "<svg x=\"", iconX, "\" y=\"", iconY, "\" width=\"", size, "\" height=\"", size, "\" viewBox=\"0 0 24 24\">", body, "</svg>",
      "<text x=\"", x + cellWidth / 2, "\" y=\"", y + 56, "\" text-anchor=\"middle\" font-family=\"system-ui,sans-serif\" font-size=\"9\" fill=\"#111\">", escapeXml(icon.name), "</text></g>"
    ].join("");
  }).join("");
  const snapshot = [
    "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"", width, "\" height=\"", height, "\" viewBox=\"0 0 ", width, " ", height, "\" role=\"img\" aria-label=\"JTT Icons Core 100 optical grid at ", size, "px\">",
    "<rect width=\"100%\" height=\"100%\" fill=\"#f4f4f4\"/><text x=\"16\" y=\"16\" font-family=\"system-ui,sans-serif\" font-size=\"11\" font-weight=\"600\" fill=\"#111\">JTT Icons · Core 100 · ", size, "px</text>",
    cells, "</svg>\n"
  ].join("");
  fs.writeFileSync(path.join(outputDir, "core-100-" + size + ".svg"), snapshot);
}

const opticalAudit = {
  version: 1,
  generatedAt: "deterministic",
  rules,
  summary: { icons: audit.length, microReviewCount: audit.filter(icon => icon.microReview).length, maxComplexityScore: Math.max(...audit.map(icon => icon.complexityScore)) },
  icons: audit
};
fs.writeFileSync(path.join(root, "metadata/optical-audit.json"), JSON.stringify(opticalAudit, null, 2) + "\n");
console.log("Generated optical grids for " + icons.length + " icons at " + sizes.join(", ") + "px.");
