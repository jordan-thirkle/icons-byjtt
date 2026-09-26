export function validateSvg(svgText, expectedPath) {
  const errors = [];
  if (typeof svgText !== "string" || !svgText.trim()) return { ok: false, errors: ["SVG is empty"] };
  if (!/^\s*<svg\b/i.test(svgText)) errors.push("SVG root element missing");
  if (!/viewBox=["']0 0 24 24["']/i.test(svgText)) errors.push("invalid viewBox: expected 0 0 24 24");
  if (/<(image|foreignObject)\b/i.test(svgText)) errors.push("raster or foreignObject content is not allowed");
  if (/(?:href|xlink:href)=["'](?!#)/i.test(svgText)) errors.push("external SVG references are not allowed");
  const brand = /^\/icons\/brands\//.test(expectedPath ?? "");
  if (brand) {
    if (!/fill=["']currentColor["']/i.test(svgText)) errors.push("brand icon must use currentColor fill");
  } else {
    const rules = [
      ["fill", /fill=["']none["']/i],
      ["stroke", /stroke=["']currentColor["']/i],
      ["stroke-width", /stroke-width=["']2["']/i],
      ["stroke-linecap", /stroke-linecap=["']round["']/i],
      ["stroke-linejoin", /stroke-linejoin=["']round["']/i]
    ];
    for (const [label, rule] of rules) if (!rule.test(svgText)) errors.push(`line contract missing: ${label}`);
  }
  return { ok: errors.length === 0, errors };
}
