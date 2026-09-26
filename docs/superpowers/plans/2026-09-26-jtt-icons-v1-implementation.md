# JTT Icons v1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved JTT Icons v1 specification as a reproducible SVG-first icon system with canonical metadata, validation, generation, packages, AI discovery, and a Core 100-ready catalogue foundation.

**Architecture:** Keep canonical SVG geometry and semantic metadata as the only authored sources. Generate package exports and public catalogue data from those sources, with deterministic validation preventing drift. Preserve the current static-first site while moving its catalogue data and category model onto the v1 contract.

**Tech Stack:** SVG, JSON, Node.js ESM scripts, HTML/CSS/vanilla JavaScript for the static catalogue, generated TypeScript/JS package surfaces, npm package metadata, GitHub Actions for repeatable checks where appropriate.

**Spec:** `docs/superpowers/specs/2026-09-26-jtt-icons-v1-design.md`

## Global Constraints

- Canonical icon coordinate system: **24 × 24** with SVG `viewBox="0 0 24 24"`.
- Default rendering model: SVG.
- Default colour: `currentColor`.
- Line defaults: **stroke width 2**, `linecap="round"`, `linejoin="round"`, `fill="none"`.
- The canonical launch family is **Line**; future families derive from the same semantic identity.
- Canonical names are lowercase kebab-case stable API identifiers.
- The initial catalogue milestone is **Core 100**; architecture must support it without redesign.
- The repository is the source of truth; author once and generate everywhere.
- Metadata must include name, title, category, tags, aliases, contexts, related, and default accessibility classification.
- Initial categories are actions, navigation, communication, media, files, objects, people, commerce, developer, system, and brands.
- The canonical source remains framework-agnostic.
- The public catalogue remains static-first.
- AI discovery must publish `llms.txt`, `llms-full.txt`, semantic metadata, aliases, contexts, relationships, and canonical SVG resolution.
- The project uses MIT licensing.
- Do not add a dependency unless it directly serves the v1 implementation and can be maintained by a solo developer.

## Review Focus

- **Metadata/source drift:** an icon SVG exists without a canonical metadata record, or metadata points to a missing SVG; validation must fail.
- **Schema incompleteness:** malformed names, missing semantic fields, invalid categories/accessibility values, duplicate aliases, or broken relationships; validation must report deterministic failures.
- **SVG contract drift:** non-24 viewBox, unexpected stroke/fill defaults, external references, or malformed SVG; validation must reject it.
- **Generated-output drift:** packages or catalogue data no longer match canonical source metadata; generation must be deterministic and verification must detect stale output.
- **Small-size/system consistency:** canonical Line icons must retain the v1 geometry defaults and be reviewable at practical sizes; fixture tests must pin the structural contract.

---

## Task 1: Establish canonical metadata and category contracts

**Files:**
- Create: `metadata/schema.json`
- Create: `metadata/categories.json`
- Create: `metadata/aliases.json`
- Create: `metadata/relationships.json`
- Modify: `icons.json`
- Create: `metadata/icons.json`
- Test: `scripts/tests/metadata-contract.test.mjs`

**Interfaces:**
- Consumes: existing `icons.json` records and canonical SVG paths.
- Produces: `metadata/icons.json` as the canonical semantic catalogue; top-level `icons.json` becomes the generated/public compatibility catalogue.

- [ ] **Step 1: Write the failing metadata contract tests** asserting required fields, exact category vocabulary, accessibility enum, kebab-case names, unique names, and relationship/alias references.
- [ ] **Step 2: Run the metadata tests** with Node's test runner and verify they fail against the current incomplete records.
- [ ] **Step 3: Implement the metadata files** with the v1 schema and migrate the existing 12 icons without changing their canonical meanings.
- [ ] **Step 4: Run the metadata tests** and verify all current records pass.
- [ ] **Step 5: Commit** `feat: establish JTT Icons metadata contract`.

## Task 2: Normalize the canonical SVG library

**Files:**
- Modify: `icons/actions/*.svg`, `icons/navigation/*.svg`, `icons/communication/*.svg`, `icons/developer/*.svg`, `icons/brands/*.svg`, `icons/system/*.svg` as required by existing assets
- Create: `icons/<category>/` directories for all v1 categories
- Test: `scripts/tests/svg-contract.test.mjs`

**Interfaces:**
- Consumes: canonical metadata category/name mapping.
- Produces: canonical Line SVG assets at `icons/<category>/<name>.svg`.

- [ ] **Step 1: Write failing SVG contract tests** for 24×24 viewBox, SVG-only assets, `currentColor`, Line defaults, and absence of external references/raster content.
- [ ] **Step 2: Run the SVG tests** and capture the current violations.
- [ ] **Step 3: Move/normalize the existing icons** into category-owned canonical paths and update metadata paths without altering semantic names.
- [ ] **Step 4: Correct SVG markup** so the launch family follows the exact Line defaults, with explicit documented exceptions only where required by geometry.
- [ ] **Step 5: Run SVG tests** and verify the existing catalogue passes.
- [ ] **Step 6: Commit** `refactor: normalize canonical JTT line icons`.

## Task 3: Build deterministic validation

**Files:**
- Create: `scripts/validate.mjs`
- Create: `scripts/lib/validate-metadata.mjs`
- Create: `scripts/lib/validate-svg.mjs`
- Create: `scripts/lib/validate-library.mjs`
- Modify: `package.json`
- Test: `scripts/tests/validate.test.mjs`

**Interfaces:**
- `validateMetadata(catalogue, categories, aliases, relationships) -> ValidationResult`
- `validateSvg(svgText, expectedPath) -> ValidationResult`
- `validateLibrary(rootDir) -> ValidationResult`
- CLI exit code is non-zero for any validation error.

- [ ] **Step 1: Write failing unit tests** covering every Review Focus failure class.
- [ ] **Step 2: Run the tests** and verify they fail because the validator does not exist.
- [ ] **Step 3: Implement focused validators** with deterministic, human-readable error messages and no network dependency.
- [ ] **Step 4: Implement `scripts/validate.mjs`** as the repository-level gate invoked by `npm run check`.
- [ ] **Step 5: Run the full validation suite** and verify it passes against the canonical library.
- [ ] **Step 6: Commit** `feat: add deterministic icon validation`.

## Task 4: Create generation pipeline and generated catalogue

**Files:**
- Create: `scripts/generate.mjs`
- Create: `scripts/lib/generate-catalogue.mjs`
- Create: `scripts/lib/generate-package.mjs`
- Create: `api/icons.json`
- Modify: `icons.json`
- Test: `scripts/tests/generation.test.mjs`

**Interfaces:**
- `generateCatalogue(metadata) -> public catalogue JSON`
- `generatePackage(metadata) -> package source files`
- Generation must be deterministic for identical canonical inputs.

- [ ] **Step 1: Write failing generation tests** asserting stable ordering, canonical path resolution, metadata preservation, and repeatability.
- [ ] **Step 2: Run generation tests** and verify they fail.
- [ ] **Step 3: Implement deterministic catalogue generation** from `metadata/icons.json`.
- [ ] **Step 4: Implement deterministic package generation** without hand-maintained per-icon duplicates.
- [ ] **Step 5: Generate `icons.json` and `api/icons.json`** and verify the outputs contain the canonical semantic model.
- [ ] **Step 6: Run generation twice and compare output hashes** to prove determinism.
- [ ] **Step 7: Commit** `feat: add deterministic icon generation pipeline`.

## Task 5: Establish package foundation

**Files:**
- Create: `packages/core/package.json`
- Create: `packages/core/index.js`
- Create: `packages/core/index.d.ts`
- Create: `packages/core/icons/*.js` generated outputs
- Modify: root `package.json`
- Test: `scripts/tests/package-contract.test.mjs`

**Interfaces:**
- Core package exports icon metadata and raw SVG access without requiring a framework.
- Package name: `@byjtt/icons`.

- [ ] **Step 1: Write failing package contract tests** for package metadata, stable exports, and raw SVG access.
- [ ] **Step 2: Run the package tests** and verify they fail.
- [ ] **Step 3: Implement the generated core package** from canonical metadata/assets.
- [ ] **Step 4: Ensure tree-shakeable named exports do not require loading the entire catalogue for a single icon.**
- [ ] **Step 5: Run package tests** and verify the initial package contract passes.
- [ ] **Step 6: Commit** `feat: add JTT Icons core package`.

## Task 6: Upgrade AI discovery surfaces

**Files:**
- Modify: `llms.txt`
- Modify: `llms-full.txt`
- Modify: `README.md`
- Test: `scripts/tests/ai-discovery.test.mjs`

**Interfaces:**
- AI documentation resolves canonical names to semantic metadata and raw SVG paths.
- No AI document becomes a second source of truth; generated references derive from canonical metadata.

- [ ] **Step 1: Write failing AI discovery tests** for required documents, catalogue references, canonical naming rules, and SVG resolution examples.
- [ ] **Step 2: Implement `llms-full.txt`** and update `llms.txt` to describe the v1 semantic contract.
- [ ] **Step 3: Update README usage and contribution guidance** to match the v1 architecture.
- [ ] **Step 4: Run AI discovery tests** and verify all canonical references resolve.
- [ ] **Step 5: Commit** `docs: make JTT Icons AI discovery first-class`.

## Task 7: Align the public static catalogue with the source of truth

**Files:**
- Modify: `index.html`
- Create: `icons/<name>/index.html` or an equivalent deterministic static detail-page generation path
- Modify: `sitemap.xml`
- Test: `scripts/tests/catalogue.test.mjs`

**Interfaces:**
- Catalogue consumes generated public metadata rather than duplicating a hand-written icon array.
- Every published icon has a stable discoverable URL.

- [ ] **Step 1: Write failing catalogue tests** for search fields, category vocabulary, stable icon URLs, and generated-data usage.
- [ ] **Step 2: Remove the hand-maintained catalogue array from `index.html`** and load generated `icons.json`.
- [ ] **Step 3: Add stable per-icon catalogue surfaces** with semantic title, tags, accessibility information, raw SVG access, and usage guidance.
- [ ] **Step 4: Regenerate sitemap entries** from canonical catalogue data.
- [ ] **Step 5: Run catalogue tests** and verify all published icons resolve.
- [ ] **Step 6: Commit** `feat: connect public catalogue to canonical icon data`.

## Task 8: Add contributor and design-system documentation

**Files:**
- Create: `docs/design-principles.md`
- Create: `docs/naming.md`
- Create: `docs/accessibility.md`
- Create: `docs/contributing.md`
- Modify: `README.md`
- Test: documentation links and required headings via `scripts/tests/docs.test.mjs`

**Interfaces:**
- Documentation is the operational interpretation of the approved v1 spec.
- Contributors can add an icon without undocumented tribal knowledge.

- [ ] **Step 1: Write failing documentation coverage tests** for required documents, core rules, validation command, and contribution workflow.
- [ ] **Step 2: Write the four focused documents** from the approved spec, without creating conflicting rules.
- [ ] **Step 3: Update README navigation and quick-start instructions.**
- [ ] **Step 4: Run documentation tests** and verify all required guidance is present.
- [ ] **Step 5: Commit** `docs: document JTT Icons contribution system`.

## Task 9: Prepare Core 100 catalogue manifest

**Files:**
- Create: `metadata/core-100.json`
- Modify: `metadata/icons.json` only for icons actually implemented in this phase
- Test: `scripts/tests/core-100.test.mjs`

**Interfaces:**
- `metadata/core-100.json` is a planning manifest, not permission to publish nonexistent SVGs.
- Every planned icon has a proposed stable name, category, semantic intent, and priority.

- [ ] **Step 1: Write failing manifest tests** for uniqueness, category validity, naming patterns, and required semantic intent.
- [ ] **Step 2: Create the Core 100 manifest** covering recurring product-interface concepts across the approved categories.
- [ ] **Step 3: Keep unimplemented concepts out of the published catalogue.**
- [ ] **Step 4: Run manifest tests** and verify the plan is structurally ready for production in subsequent batches.
- [ ] **Step 5: Commit** `docs: define JTT Icons Core 100 manifest`.

## Task 10: Add repository-level CI and final verification

**Files:**
- Create: `.github/workflows/validate.yml`
- Modify: `package.json` as required
- Test: full repository test suite

**Interfaces:**
- Pull requests and pushes run the same deterministic local validation command.
- CI must not depend on private services or network availability for core validation.

- [ ] **Step 1: Write the CI configuration** to install only required dependencies and run the canonical check command.
- [ ] **Step 2: Run the complete local test and validation suite.**
- [ ] **Step 3: Run generation and verify the working tree remains clean after regeneration.
- [ ] **Step 4: Perform a final source-to-generated consistency check.**
- [ ] **Step 5: Commit** `ci: validate JTT Icons on every change`.

## Final verification

- [ ] Run `npm run check`.
- [ ] Run the complete Node test suite.
- [ ] Run generation twice and compare outputs.
- [ ] Verify every metadata icon resolves to one canonical SVG.
- [ ] Verify every canonical SVG has one metadata record.
- [ ] Verify generated package exports resolve.
- [ ] Verify AI discovery documents resolve canonical icon paths.
- [ ] Verify the public catalogue consumes generated data.
- [ ] Verify the repository is clean after generation.
- [ ] Review the final diff against `docs/superpowers/specs/2026-09-26-jtt-icons-v1-design.md`.

## Commit sequence

Each task produces one focused commit. The intended sequence is:

1. `feat: establish JTT Icons metadata contract`
2. `refactor: normalize canonical JTT line icons`
3. `feat: add deterministic icon validation`
4. `feat: add deterministic icon generation pipeline`
5. `feat: add JTT Icons core package`
6. `docs: make JTT Icons AI discovery first-class`
7. `feat: connect public catalogue to canonical icon data`
8. `docs: document JTT Icons contribution system`
9. `docs: define JTT Icons Core 100 manifest`
10. `ci: validate JTT Icons on every change`
