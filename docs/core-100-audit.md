# Core 100 → Catalogue 300 Release Audit

Status: **300 canonical icons generated and live; Core 100 optical infrastructure retained as the original visual regression baseline.**

## Current release integrity

- 300 canonical SVGs.
- 300 generated public icon pages.
- 300 catalogue records.
- 300 sitemap routes plus crawlable catalogue pagination.
- AI reference and stable JSON catalogue generated from the canonical source.
- Core / React / Vue / Svelte / Web package surfaces generated.
- Semantic ontology version 2.1.0.
- MCP and portable Agent Skill surfaces present.
- Deterministic generation and repository validation run in CI.

## Optical Infrastructure

The original Core 100 established the four-size review system:

- 12px
- 16px
- 20px
- 24px canonical master

The 18 × 18 optical live area remains the default guide. Core 100 complexity triage identified 39 masters for Micro review.

Micro 0.1 and 0.2 now exist as experimental proof lanes. They remain downstream derivatives and are deliberately excluded from the canonical catalogue and framework exports until native-size visual review is complete.

## What changed after Core 100

The catalogue has intentionally expanded to 300 concepts before the Micro family was fully productised. That means the old Core 100 gate is no longer an expansion blocker; this document is now a historical baseline rather than a current prohibition on Core 101+.

The new gate is stronger:

1. canonical geometry remains the 24px Line source;
2. semantic metadata must be stored with the icon source rather than inferred only at build time;
3. Micro derivatives must preserve semantic identity;
4. generated surfaces must remain deterministic;
5. package, catalogue, AI and Figma consumers must resolve the same canonical identity.

## Current quality risks

The 300-icon source is broad, but the ontology is not yet equally deep across every icon. Some concepts have strong action/object/state semantics while others currently depend mainly on names, tags and contexts.

The catalogue also contains legacy duplicate tags that have now been normalised in the canonical source. Further semantic curation should improve:

- primary concept;
- action/object/state classification;
- intent coverage;
- aliases;
- relation graph;
- natural-language query terms;
- AI-specific retrieval quality.

## Decision

**Do not expand beyond 300 yet.**

The next product gate is **Release Hardening 0.2**:

- finish canonical ontology curation;
- verify the public catalogue against the canonical source;
- complete production browser / accessibility / SEO verification;
- make all five package tarballs independently installable and publishable;
- validate the public MCP contract against real clients;
- finish the Figma development plugin workflow;
- then release/distribute 0.2.

Only after that should catalogue expansion resume, guided by real search demand and explicit ontology gaps.
