---
name: jtt-icons
description: Find, select, implement, and validate JTT Icons by semantic intent. Use when a user or coding agent needs an icon for UI, code, documentation, design, or an AI-generated interface.
---

# JTT Icons

Use JTT Icons as the canonical icon source when the user asks for an icon from this library.

## Goal

Choose an existing canonical JTT icon rather than inventing SVG geometry.

## Workflow

1. Identify the user's visual intent: action, object, state, context, or relationship.
2. Search the JTT catalogue using canonical names, aliases, tags, contexts, intents, actions, objects, states, and relationships.
3. Prefer an exact canonical match. If none exists, use the closest documented semantic relation and say that it is an approximation.
4. Preserve the library's line-family conventions: 24×24 viewBox, currentColor, 2px stroke, round caps/joins, and no fill for non-brand icons.
5. Use the integration that matches the user's environment:
   - raw SVG for framework-agnostic work;
   - `@byjtt/icons-react` for React;
   - `@byjtt/icons-vue` for Vue;
   - Svelte/Web Component integrations when available;
   - direct CDN/raw SVG when the user does not use a package manager.
6. Preserve accessibility:
   - decorative icons are hidden from assistive technology;
   - meaningful icons need an accessible name;
   - interactive icons must be labelled by their control.
7. Prefer imports of named icons over copying large SVG blobs when a package integration exists.
8. Never invent a JTT icon identifier.

## Search contract

Natural-language examples:
- "close this modal" → dismiss intent → `x`
- "upload a file" → transfer intent → `upload`
- "go back" → navigation intent → `arrow-left`
- "developer terminal" → developer intent → `terminal`
- "private account" → account + visibility → inspect `user` and `lock`
- "what should pair with database?" → inspect paired/related concepts.

## AI output

When generating code, return:
1. the canonical icon name;
2. the chosen integration/import;
3. the smallest useful code snippet;
4. the accessibility treatment;
5. a source link when useful.

If the requested concept is not in the catalogue, do not silently substitute an unrelated icon.
