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

const microManifestPath = path.join(root, "metadata/micro-0-1.json");
if (fs.existsSync(microManifestPath)) {
  const microManifest = JSON.parse(fs.readFileSync(microManifestPath, "utf8"));
  const microSizes = microManifest.reviewSizes;
  const microIcons = [...microManifest.icons].sort((a, b) => a.name.localeCompare(b.name));
  const microAudit = microIcons.map(icon => {
    const sourceSvg = fs.readFileSync(path.join(root, icon.source.slice(1)), "utf8");
    const microSvg = fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8");
    const score = svg => {
      const drawableElements = count(svg, /<(?:path|circle|rect|line|polyline|polygon|ellipse)\b/g);
      const paths = [...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(match => match[1]);
      const commands = paths.reduce((total, data) => total + pathCommands(data), 0);
      return { drawableElements, pathCommands: commands, complexityScore: drawableElements * 2 + commands };
    };
    const sourceScore = score(sourceSvg);
    const microScore = score(microSvg);
    return {
      name: icon.name,
      source: icon.source,
      path: icon.path,
      sourceComplexityScore: sourceScore.complexityScore,
      microComplexityScore: microScore.complexityScore,
      complexityReduction: Number((1 - microScore.complexityScore / sourceScore.complexityScore).toFixed(3)),
      changes: icon.changes
    };
  });

  for (const size of microSizes) {
    const columns = 4;
    const cellWidth = 180;
    const cellHeight = 132;
    const headerHeight = 24;
    const rows = Math.ceil(microIcons.length / columns);
    const width = columns * cellWidth;
    const height = headerHeight + rows * cellHeight;
    const cells = microIcons.map((icon, index) => {
      const sourceSvg = fs.readFileSync(path.join(root, icon.source.slice(1)), "utf8");
      const microSvg = fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8");
      const sourceBody = sourceSvg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\\s*$/, "");
      const microBody = microSvg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\\s*$/, "");
      const x = (index % columns) * cellWidth;
      const y = headerHeight + Math.floor(index / columns) * cellHeight;
      const iconX = x + (cellWidth - size) / 2;
      const lineY = y + 20;
      const microY = y + 64;
      const guide = size * rules.optical.primaryLiveAreaRatio;
      const guideX = iconX + (size - guide) / 2;
      const guideLineY = lineY + (size - guide) / 2;
      const guideMicroY = microY + (size - guide) / 2;
      return [
        "<g data-icon=\"", escapeXml(icon.name), "\"><rect x=\"", x, "\" y=\"", y, "\" width=\"", cellWidth, "\" height=\"", cellHeight, "\" fill=\"#fff\"/>",
        "<text x=\"", x + 10, "\" y=\"", y + 13, "\" font-family=\"system-ui,sans-serif\" font-size=\"10\" font-weight=\"600\" fill=\"#111\">", escapeXml(icon.name), "</text>",
        "<text x=\"", x + 10, "\" y=\"", y + 34, "\" font-family=\"system-ui,sans-serif\" font-size=\"8\" fill=\"#666\">Line ", size, "px</text>",
        "<rect x=\"", guideX.toFixed(3), "\" y=\"", guideLineY.toFixed(3), "\" width=\"", guide.toFixed(3), "\" height=\"", guide.toFixed(3), "\" fill=\"none\" stroke=\"#d8d8d8\" stroke-width=\"0.5\" stroke-dasharray=\"2 2\"/>",
        "<svg x=\"", iconX, "\" y=\"", lineY, "\" width=\"", size, "\" height=\"", size, "\" viewBox=\"0 0 24 24\">", sourceBody, "</svg>",
        "<text x=\"", x + 10, "\" y=\"", y + 54, "\" font-family=\"system-ui,sans-serif\" font-size=\"8\" fill=\"#666\">Micro ", size, "px</text>",
        "<rect x=\"", guideX.toFixed(3), "\" y=\"", guideMicroY.toFixed(3), "\" width=\"", guide.toFixed(3), "\" height=\"", guide.toFixed(3), "\" fill=\"none\" stroke=\"#d8d8d8\" stroke-width=\"0.5\" stroke-dasharray=\"2 2\"/>",
        "<svg x=\"", iconX, "\" y=\"", microY, "\" width=\"", size, "\" height=\"", size, "\" viewBox=\"0 0 24 24\">", microBody, "</svg>",
        "</g>"
      ].join("");
    }).join("");
    const snapshot = [
      "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"", width, "\" height=\"", height, "\" viewBox=\"0 0 ", width, " ", height, "\" role=\"img\" aria-label=\"JTT Icons Micro 0.1 comparison at ", size, "px\">",
      "<rect width=\"100%\" height=\"100%\" fill=\"#f4f4f4\"/><text x=\"16\" y=\"16\" font-family=\"system-ui,sans-serif\" font-size=\"11\" font-weight=\"600\" fill=\"#111\">JTT Icons · Micro 0.1 · Line vs Micro · ", size, "px</text>",
      cells, "</svg>\n"
    ].join("");
    fs.writeFileSync(path.join(outputDir, "micro-0-1-" + size + ".svg"), snapshot);
  }

  fs.writeFileSync(path.join(root, "metadata/micro-audit.json"), JSON.stringify({
    version: 1,
    generatedAt: "deterministic",
    family: "micro",
    reviewSizes: microSizes,
    summary: {
      icons: microAudit.length,
      averageComplexityReduction: Number((microAudit.reduce((sum, icon) => sum + icon.complexityReduction, 0) / microAudit.length).toFixed(3))
    },
    icons: microAudit
  }, null, 2) + "\n");
}

console.log("Generated optical grids for " + icons.length + " icons at " + sizes.join(", ") + "px.");
