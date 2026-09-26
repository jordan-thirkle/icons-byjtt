export function generateAiReference(metadata) {
  const icons = [...metadata.icons].sort((a,b) => a.name.localeCompare(b.name));
  const rows = icons.map(icon => `- \`${icon.name}\` — ${icon.title} · ${icon.category} · ${icon.accessibility.default} · ${icon.tags.join(", ")} · SVG: \`${icon.path}\``).join("\n");
  return `# JTT Icons — Full AI Reference

This document explains how agents should discover and consume JTT Icons. Canonical semantic data remains in \`/metadata/icons.json\`.

## Selection contract

1. Match the requested concept to \`name\` and \`title\`.
2. Expand with \`tags\` and \`aliases\`.
3. Use \`contexts\` to distinguish similar concepts.
4. Use \`related\` for nearby or paired concepts.
5. Prefer the canonical \`name\` in generated code.

## Canonical rendering

- Family: Line.
- ViewBox: \`0 0 24 24\`.
- Default colour: \`currentColor\`.
- Line stroke: 2.
- Line caps/joins: round.
- Line fill: none.
- Brand marks may use currentColor fill when the brand silhouette requires it.

## Current catalogue

${rows}

## Consumption

- Raw SVG: resolve the \`path\` field against https://icons.byjtt.com.
- JavaScript package: \`@byjtt/icons\`.
- Public catalogue: https://icons.byjtt.com/icons.json
- Stable API catalogue: https://icons.byjtt.com/api/icons.json

Never invent a JTT icon name. If no canonical concept exists, say so or choose the closest documented related concept.
`;
}
