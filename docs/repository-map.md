# Repository Map

## Authored source

- `metadata/icons.json`
- `metadata/ontology.json`
- `metadata/categories.json`
- `metadata/aliases.json`
- `metadata/relationships.json`
- `icons/**/*.svg`
- source scripts under `scripts/`

## Generated/public output

- static catalogue HTML;
- category and use-case pages;
- `icons.json`;
- `api/icons.json`;
- sitemap;
- AI references;
- package source;
- optical audit/snapshots.

## Agent entry points

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `skills/jtt-icons/SKILL.md`
- `docs/agent-workflow.md`
- `docs/principles-for-ai-contributions.md`

## Deployment

Vercel serves isolated `dist/` output prepared by `scripts/prepare-vercel.mjs`. Repository source is not intended to be statically deployed.
