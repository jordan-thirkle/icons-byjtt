# JTT Icons — Release Hardening 0.2

## Current status — 2026-09-28

**Source hardening: complete.** The 300-icon canonical catalogue, ontology, human/AI search, public site, generated surfaces and package verification are green on `main`.

**Publication blockers:** npm trusted publishing must be configured for each package against the GitHub Actions publish workflow. The previous token-based workflow reached `npm publish` and failed with `ENEEDAUTH`; the repository no longer requires a long-lived `NPM_TOKEN` because publishing is now prepared for OIDC trusted publishing. Production Vercel also needs a new deployment and verification.


## Objective

Turn the 300-icon catalogue from a strong production build into a verifiable public release.

## Gate A — Canonical source

- [ ] Every icon has canonical geometry.
- [ ] Every icon has explicit semantic fields.
- [ ] Tags are deduplicated.
- [ ] Aliases and top-level relationships match their canonical maps.
- [ ] Semantic relations resolve to canonical icon names.
- [ ] No generated surface becomes an independent source of truth.

## Gate B — Public catalogue

- [ ] Homepage exposes all 300 icons.
- [ ] Crawlable pagination resolves every icon.
- [ ] Every icon page has unique title, description, canonical URL and structured data.
- [ ] Category pages resolve all categories.
- [ ] Sitemap contains every intended public route.
- [ ] Search handles exact, alias, intent and natural-language queries without inventing identifiers.

## Gate C — Distribution

Publish these together at the same version:

- @byjtt/icons
- @byjtt/icons-react
- @byjtt/icons-vue
- @byjtt/icons-svelte
- @byjtt/icons-web

Before publishing, test each package from a clean temporary consumer project and verify its exports, types and representative icon imports.

## Gate D — AI

- [ ] /llms.txt is concise and link-first.
- [ ] /llms-full.txt matches the canonical catalogue.
- [ ] Agent Skill matches the package/API contract.
- [ ] MCP search, retrieval, recommendation and category tools return canonical records.
- [ ] MCP rejects unknown identifiers rather than inventing them.
- [ ] Real MCP client smoke tests pass.

## Gate E — Figma

- [ ] Development plugin loads.
- [ ] Semantic search retrieves canonical records.
- [ ] Inserted SVGs match the public canonical SVGs.
- [ ] Failure states are visible and recoverable.
- [ ] Plugin documentation matches the current manifest.
- [ ] Community publishing remains a separate account-side step.

## Gate F — Quality and discoverability

- [ ] Production Chromium smoke test.
- [ ] Verify the Vercel deployment serves only the prepared public output and does not expose repository source/configuration files.
- [ ] Lighthouse performance/accessibility/best-practices/SEO audit.
- [ ] Keyboard navigation and reduced-motion audit.
- [ ] Mobile layout audit.
- [ ] Search-result relevance spot checks.
- [ ] Broken-link and sitemap audit.
- [ ] Search Console submission/indexing verification.

## Gate G — Launch

Release 0.2 only when the gates above are green.

After launch, stop adding icons temporarily. Use real search demand, package usage and issue feedback to decide which semantic gaps and concepts justify the next catalogue expansion.
