# Contributing to JTT Icons

JTT Icons is an open-source icon system. Contributions should improve the canonical system, not create parallel conventions.

## Before you change anything

1. Read `AGENTS.md`.
2. Read the relevant document in `docs/`.
3. Search the canonical metadata and existing tests.
4. Identify the source-of-truth file.
5. Check whether the requested change already exists under another name or relationship.

## Source of truth

Author canonical source files and regenerate outputs.

Do not hand-edit generated:
- `icons.json`
- `api/icons.json`
- generated icon detail pages
- package icon modules
- sitemap/AI reference outputs

unless the generator itself is the thing being changed.

## Adding an icon

An icon should close a real semantic gap.

Required:
1. stable lowercase kebab-case canonical name;
2. canonical 24×24 Line SVG;
3. title, category, tags, aliases, contexts;
4. semantic intent/action/object/state fields;
5. relevant relationships;
6. intentional accessibility classification;
7. optical review at practical sizes;
8. tests and deterministic generation.

Read `docs/design-principles.md`, `docs/naming.md` and `docs/accessibility.md` before submitting.

## Changing an icon

Assume the identifier and geometry are public API. Avoid changing meaning or geometry casually.

Explain any change that could affect:
- recognition;
- small-size rendering;
- semantic meaning;
- accessibility;
- package output;
- AI discovery.

## Website and AI changes

Change the generator/canonical source where possible. Verify:
- keyboard access;
- visible focus;
- colour contrast;
- reduced motion;
- responsive layout;
- crawlable links;
- canonical URLs;
- AI references;
- MCP behaviour.

## Pull requests

Keep PRs focused. Use the repository PR template.

Every PR should describe:
- the user or maintenance problem;
- the source-of-truth files changed;
- important design/semantic decisions;
- verification performed;
- deliberate exceptions;
- any account-side step that cannot be represented in repository code.

## Validation

Run before requesting review:

```bash
npm test
npm run check
npm run generate
```

Confirm generation leaves no unexpected diff.

## Security

Everything committed to the public repository is public. Never commit secrets, credentials, private data or local machine paths.

For vulnerabilities, follow `SECURITY.md` rather than opening a public issue.
