# Agent Contribution Workflow

Use this workflow for AI-assisted engineering in JTT Icons.

## Understand

Read `AGENTS.md`, `README.md` and the relevant document under `docs/`. Identify the desired outcome and source of truth.

## Inspect

Search for existing icons, aliases, relationships, generators, tests and public documentation before creating anything.

## Implement

Make the smallest coherent change. Keep source, metadata and tests together when they define one contract.

## Validate

Run:

```bash
npm test
npm run check
npm run generate
```

Inspect the resulting diff and confirm generated output is intentional.

## Public review

Check for secrets, private data, local paths, internal planning, accidental public routes, incorrect canonical URLs and accessibility regressions.

For UI changes also review keyboard behaviour, contrast, reduced motion, focus visibility and mobile layout.

## Report

State what changed, why, source-of-truth files, verification performed and any unresolved external dependency.

Never claim npm, Vercel, Figma or another external service is configured or deployed unless it was actually verified.
