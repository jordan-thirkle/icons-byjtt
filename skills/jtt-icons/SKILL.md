---
name: jtt-icons
description: Find, select, implement, validate, and contribute JTT Icons by semantic intent. Use for UI, code, documentation, design, AI-generated interfaces, icon additions, metadata changes, and repository contributions.
---

# JTT Icons Agent Skill

## Purpose

Use the same canonical JTT icon identity across human development, AI coding, website search, MCP, packages and Figma.

## Canonical sources

1. `metadata/icons.json` — icon semantics and public metadata.
2. `metadata/ontology.json` — semantic vocabulary and relationships.
3. `icons/**/*.svg` — canonical Line geometry.
4. `metadata/categories.json`, `metadata/aliases.json`, `metadata/relationships.json` — supporting contracts.

Generated HTML, JSON, packages, sitemap and AI references are outputs.

## Selecting an icon

1. Identify the requested meaning, action, object, state and context.
2. Search canonical metadata and ontology.
3. Prefer an exact canonical name.
4. Use aliases only to discover the canonical name.
5. Inspect relationships when an exact match is absent.
6. Never invent a JTT icon identifier.
7. Preserve the icon's accessibility classification in the consuming UI.

## Implementing an icon

Use:
- raw SVG for framework-agnostic work;
- `@byjtt/icons-react` for React;
- `@byjtt/icons-vue` for Vue;
- `@byjtt/icons-svelte` for Svelte;
- `@byjtt/icons-web` for Web Components;
- `@byjtt/icons` for framework-agnostic package access.

Prefer named imports/direct entrypoints when available.

## Contributing code

Before editing:
- read `AGENTS.md`;
- inspect existing implementation and tests;
- identify the source-of-truth file;
- avoid editing generated output directly.

For icon changes:
- establish a real semantic gap;
- update canonical SVG and metadata together;
- review at 12/14/16/20/24px;
- run `npm test`, `npm run check`, and generation;
- inspect the final diff.

For website/AI/package changes:
- modify the source/generator;
- regenerate;
- verify affected public surfaces;
- ensure docs do not contradict canonical metadata.

## Quality and safety

Treat every repository file as public. Do not add:
- credentials or tokens;
- private user data;
- local machine paths;
- debug endpoints;
- temporary archives;
- internal-only planning material.

Never weaken tests to make CI pass.

## Search and MCP

MCP endpoint: `https://icons.byjtt.com/api/mcp`

Use:
- `search_icons` for semantic discovery;
- `get_icon` for canonical metadata;
- `get_icon_svg` for canonical SVG;
- `recommend_icons` for requirement-to-icon discovery;
- `list_categories` for category inventory.

Unknown identifiers must produce a clear error rather than an invented substitute.

## Completion

A task is complete when the canonical source, generated surfaces, validation, public documentation and relevant integrations agree.

Report verification performed and any external deployment/publication configuration that remains outside the repository.
