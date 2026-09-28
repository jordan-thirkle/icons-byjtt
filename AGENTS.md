# JTT Icons — Agent Guidance

## Mission

JTT Icons is an open-source, SVG-first icon system with one canonical semantic identity across the website, packages, AI tooling and Figma.

Make changes that strengthen that system without creating parallel sources of truth.

## Read first

1. `README.md`
2. This file
3. The relevant document in `docs/`
4. The relevant canonical source and tests

## Repository map

- `metadata/icons.json` — canonical icon metadata and semantics.
- `metadata/ontology.json` — canonical semantic ontology.
- `metadata/categories.json` — allowed categories.
- `metadata/aliases.json` — canonical alias map.
- `metadata/relationships.json` — canonical relationship map.
- `icons/<category>/<name>.svg` — canonical SVG geometry.
- `scripts/` — generation and deterministic validation.
- `packages/` — distribution package surfaces.
- `index.html`, `categories/`, `icons/<name>/`, `use-cases/` — generated public website.
- `api/` — public machine-readable surfaces and MCP handler.
- `skills/jtt-icons/SKILL.md` — portable agent workflow.
- `docs/` — project operating rules.

## Non-negotiable invariants

1. Never invent a canonical icon name.
2. Metadata and canonical SVGs are authored source; generated files are outputs.
3. Preserve the documented 24×24 family contract.
4. Preserve semantic identity across website, packages, AI and Figma.
5. Never weaken validation to make a change pass.
6. Do not add dependencies without a clear use and maintenance case.
7. Never commit secrets, credentials, private data, local paths, archives, logs or internal-only material.
8. Never expose the repository source tree through the static deployment.
9. Keep public documentation truthful about what exists.
10. Prefer small, reviewable, coherent changes.

## Icon workflow

Before adding or changing an icon:
1. Search existing names, aliases and relationships.
2. Read `docs/design-principles.md`, `docs/naming.md` and `docs/accessibility.md`.
3. Establish the semantic gap and intended use.
4. Update canonical SVG and canonical metadata together.
5. Review at 12/14/16/20/24px.
6. Regenerate outputs.
7. Run `npm test` and `npm run check`.

## Website, package and AI workflow

Find the canonical source and generator before editing generated output.

For AI-facing work verify:
- identifiers remain stable;
- semantic vocabulary remains complete and unambiguous;
- `llms.txt`, `llms-full.txt`, Skills and docs agree with canonical data;
- MCP resolves known identifiers and rejects unknown ones.

## Verification ladder

During iteration:
1. targeted tests;
2. `npm test`;
3. `npm run check`;
4. regenerate;
5. inspect the diff.

Before completion:
- working tree clean;
- relevant public/package/MCP/visual checks pass;
- no accidental public files or config were introduced.

## Public repository hygiene

Treat everything committed here as public. Before opening a PR inspect for:
- secrets and credentials;
- personal or private information;
- local machine paths;
- screenshots with private data;
- temporary/debug material;
- stale internal planning;
- deployment or API credentials;
- generated churn.

Never place a secret in an issue, PR description or comment.

## PR standard

Every PR should state:
- what changed;
- why it is needed;
- which source-of-truth files changed;
- verification performed;
- any deliberate exception or account-side dependency.

Icon PRs should include semantic rationale and optical/small-size evidence.

## Uncertainty

Use the existing contracts and tests. When a decision changes public semantics or API and cannot be resolved from the repository rules, stop rather than inventing a convention.
