export function generateAiReference(metadata, ontology = {}) {
  const icons = [...metadata.icons].sort((a,b) => a.name.localeCompare(b.name));
  const rows = icons.map(icon => {
    const semantic = icon.semantics || {};
    const relations = semantic.relations || {};
    return [
      `- \`${icon.name}\` — ${icon.title} · ${icon.category} · ${icon.accessibility.default}`,
      `  - tags: ${icon.tags.join(", ") || "none"}`,
      `  - aliases: ${icon.aliases.join(", ") || "none"}`,
      `  - contexts: ${icon.contexts.join(", ") || "none"}`,
      `  - intents: ${(semantic.intents || []).join(", ") || "none"}`,
      `  - actions: ${(semantic.actions || []).join(", ") || "none"}`,
      `  - objects: ${(semantic.objects || []).join(", ") || "none"}`,
      `  - states: ${(semantic.states || []).join(", ") || "none"}`,
      `  - related: ${(relations.related || []).join(", ") || "none"}`,
      `  - alternative: ${(relations.alternative || []).join(", ") || "none"}`,
      `  - opposite: ${(relations.opposite || []).join(", ") || "none"}`,
      `  - state: ${(relations.state || []).join(", ") || "none"}`,
      `  - paired: ${(relations.paired || []).join(", ") || "none"}`,
      `  - SVG: \`${icon.path}\``,
    ].join("\n");
  }).join("\n");
  const intents = Object.entries(ontology.intentGroups || {}).map(([name, terms]) => `- \`${name}\`: ${terms.join(", ")}`).join("\n");
  return `# JTT Icons — Full AI Reference

This document explains how agents should discover and consume JTT Icons. Semantic ontology version: \`${ontology.version || "unknown"}\`.

## Selection contract

1. Resolve the request against canonical name, title, aliases, tags and contexts.
2. Use semantic intents, actions, objects and states to understand meaning.
3. Use relationships to find opposites, paired concepts, alternatives and nearby concepts.
4. Prefer the canonical name when generating code.
5. Never invent an icon identifier.

## Semantic intent vocabulary

${intents}

## Canonical rendering

- Family: Line.
- ViewBox: \`0 0 24 24\`.
- Default colour: \`currentColor\`.
- Line stroke: 2.
- Line caps/joins: round.
- Line fill: none.
- Brand marks may use currentColor fill when the brand silhouette requires it.

## Semantic selection examples

- “close”, “dismiss”, “cancel” → resolve the \`dismiss\` intent and inspect relationships.
- “account”, “profile”, “user” → resolve the \`account\` intent and use people/context metadata.
- “developer”, “code”, “repository”, “deploy” → resolve the \`developer\` intent and developer contexts.
- “upload”, “import”, “attach” → resolve the \`transfer\` intent and file/action contexts.
- “what goes with a database?” → inspect \`paired\` and \`related\` relationships.

## Current catalogue

${rows}

## Consumption

- Raw SVG: resolve the \`path\` field against https://icons.byjtt.com.
- JavaScript package: \`@byjtt/icons\`.
- Public catalogue: https://icons.byjtt.com/icons.json
- Remote MCP: https://icons.byjtt.com/api/mcp
- Agent Skill: https://icons.byjtt.com/skills/jtt-icons/SKILL.md
- Integrations: https://icons.byjtt.com/docs/integrations/
- Stable API catalogue: https://icons.byjtt.com/api/icons.json

Never invent a JTT icon name. If no canonical concept exists, say so or choose the closest documented related concept.
`;
}