# JTT Icons v1 Design Specification

**Status:** Proposed — awaiting user review  
**Date:** 2026-09-26  
**Repository:** `jordan-thirkle/icons-byjtt`

## 1. Purpose

JTT Icons v1 defines a coherent, open-source icon system for BY JTT products and the wider web.

The goal is not to reproduce Lucide, Feather, Heroicons, or another existing library. JTT Icons should establish its own visual grammar, semantic model, naming contract, quality gates, and distribution architecture while retaining the practical strengths expected from a modern icon library.

The system must be useful to a solo developer today and structurally capable of becoming shared infrastructure across BY JTT products tomorrow.

### Primary consumers

- BY JTT websites and applications.
- FreeDrawColour.
- Games and game tooling.
- Developer tools and documentation.
- Third-party web projects.
- Humans selecting icons manually.
- AI coding agents and search systems selecting icons semantically.

### v1 success criteria

JTT Icons v1 is successful when:

1. Icons are recognisably part of one system without being visually generic.
2. The same semantic icon can be consumed consistently across products and frameworks.
3. Names, aliases, metadata, and relationships make icons discoverable without visual browsing.
4. Icons remain legible at real UI sizes, including approximately 12–16px.
5. New icons can be added through a repeatable process rather than subjective icon-by-icon invention.
6. Generated packages and public catalogue surfaces derive from one canonical source of truth.
7. Validation can reject malformed, inconsistent, or incomplete icon contributions automatically.

---

## 2. Non-goals

JTT Icons v1 will not attempt to:

- Replace every possible icon category immediately.
- Ship every visual variant at launch.
- Build a hosted SaaS icon editor.
- Depend on a database or backend for the canonical catalogue.
- Introduce framework-specific source files as the primary authoring format.
- Automatically generate arbitrary icons without human design review.
- Copy another library's geometry, naming taxonomy, or implementation structure wholesale.
- Optimise for maximum icon count at the expense of consistency.

The first meaningful catalogue milestone is **Core 100**, followed by controlled expansion.

---

## 3. Design philosophy

JTT Icons is a **system**, not a folder of SVGs.

Every icon must be governed by the same principles:

### 3.1 Recognition before decoration

An icon must communicate its concept quickly. Detail that does not improve recognition, hierarchy, or interaction meaning should be removed.

### 3.2 Geometry is shared infrastructure

Icons should reuse a common geometric vocabulary:

- canonical grid;
- stroke and terminal rules;
- corner and curve behaviour;
- optical alignment rules;
- spacing relationships;
- visual weight;
- negative-space discipline.

An individual icon may deviate when the concept requires it, but deviation must be deliberate and documented by the geometry rules rather than invented ad hoc.

### 3.3 Optical consistency over mathematical consistency

A mathematically centred icon is not necessarily visually centred.

JTT Icons will use a canonical coordinate system while permitting controlled optical adjustments for:

- perceived centre;
- visual weight;
- asymmetric shapes;
- diagonal forms;
- circular forms;
- text-like or directional symbols.

### 3.4 Real-size first

Every icon must be considered at practical UI sizes, especially 12px, 14px, 16px, 20px and 24px.

An icon that looks impressive at 64px but becomes ambiguous at 16px does not meet the system standard.

### 3.5 Minimal by default

The canonical style should favour clear silhouettes, controlled line weight, and useful negative space.

The system should feel modern without relying on fashionable visual effects.

---

## 4. Canonical geometry

### 4.1 Source coordinate system

The canonical icon coordinate system is:

- **ViewBox:** `0 0 24 24`
- **Primary grid:** 24 × 24
- **Default rendering model:** SVG
- **Default colour:** `currentColor`
- **Default background assumption:** transparent

All canonical source icons must use the same viewBox unless an explicit future system revision introduces another source grid.

### 4.2 Stroke vocabulary

The Line family uses a controlled stroke vocabulary rather than arbitrary per-icon values.

Default v1 line properties:

- stroke width: **2**
- linecap: **round**
- linejoin: **round**
- stroke: `currentColor`
- fill: `none`

Exceptions are permitted only where they materially improve recognition or small-size rendering and must be treated as system-level geometry decisions, not casual styling.

### 4.3 Negative space

Important shapes must preserve enough internal and external space to survive downscaling.

Designers must avoid:

- accidental tangencies;
- tiny enclosed counters;
- near-overlapping strokes;
- visually collapsed corners;
- ornamental micro-detail.

### 4.4 Pixel-aware rendering

Geometry should align predictably when rasterised at common UI sizes.

The system should avoid avoidable half-pixel artefacts while retaining optical adjustments where mathematically exact alignment would make the icon look worse.

---

## 5. Visual family architecture

JTT Icons will use one canonical semantic icon model with multiple controlled visual families.

### v1 family model

- **Line** — canonical launch family.
- **Fill** — future controlled filled counterpart.
- **Duotone** — future layered counterpart.
- **Solid** — future dense counterpart.
- **Micro** — future small-size-optimised counterpart.

Only **Line** is required for the initial v1 implementation.

Future families must derive from the same semantic identity and naming system. They must not become independent libraries with incompatible meanings or names.

### Family naming

The semantic identity remains stable:

`search` is always the search concept.

A family is an implementation/style dimension, not a new semantic icon:

- `search` → Line
- `search` → Fill
- `search` → Duotone

The public API should therefore avoid proliferating names such as `search-outline`, `search-filled`, and `search-solid` when those are merely family variants.

---

## 6. Icon semantic model

Every canonical icon has a machine-readable record.

Minimum required fields:

```json
{
  "name": "arrow-up-right",
  "title": "Arrow Up Right",
  "category": "navigation",
  "tags": ["arrow", "direction", "diagonal", "up", "right"],
  "aliases": [],
  "contexts": [],
  "related": [],
  "accessibility": {
    "default": "meaningful"
  }
}
```

### Required semantic fields

#### name

Stable kebab-case API identifier.

Rules:

- lowercase;
- kebab-case;
- descriptive;
- no visual-style suffixes;
- no arbitrary numbering;
- no implementation details.

#### title

Human-readable display name.

#### category

Exactly one primary category for catalogue organisation.

Initial categories:

- actions
- navigation
- communication
- media
- files
- objects
- people
- commerce
- developer
- system
- brands

Additional categories require a documented reason rather than being created for isolated icons.

#### tags

Natural-language semantic terms used for search and AI discovery.

Tags should include useful synonyms and conceptual relationships, not keyword spam.

#### aliases

Alternative names users or agents may reasonably search for.

Example:

`x` may have aliases such as `close`, `dismiss`, or `cancel` where those concepts are genuinely applicable.

Aliases must not create semantic ambiguity.

#### contexts

Common usage contexts such as:

- toolbar;
- navigation;
- form;
- editor;
- settings;
- game UI;
- developer tool;
- status;
- commerce.

#### related

Links to semantically adjacent canonical icons.

Relationships should be explicit and directional where useful.

---

## 7. Naming contract

Naming is a public API and must be treated as a compatibility surface.

### Canonical patterns

Directional icons:

- `arrow-up`
- `arrow-down`
- `arrow-left`
- `arrow-right`
- `arrow-up-right`
- `arrow-down-right`
- `arrow-down-left`
- `arrow-up-left`

Control icons:

- `plus`
- `minus`
- `check`
- `x`

Navigation controls:

- `chevron-up`
- `chevron-down`
- `chevron-left`
- `chevron-right`

Names should describe the semantic object/action rather than the artist's construction method.

### Stability rule

Once a canonical icon name is published, it should not be renamed casually.

Breaking renames require a documented migration path.

---

## 8. Accessibility model

Accessibility metadata is part of the icon contract.

Each icon must define a default semantic classification:

- **decorative** — visual enhancement with no independent meaning;
- **meaningful** — communicates information;
- **interactive** — represents an action/control;
- **status** — communicates system state;
- **brand** — identifies a brand or service.

The icon asset itself must remain usable without assuming that its shape is sufficient for accessible communication.

Framework adapters must support appropriate accessible naming patterns rather than silently relying on the SVG's visual appearance.

---

## 9. Source-of-truth architecture

The repository is the canonical source of truth.

### Canonical layers

```
icons/
  canonical SVG geometry

metadata/
  semantic catalogue
  aliases
  categories
  relationships

scripts/
  validation
  generation
  optimisation
  build

packages/
  generated consumer interfaces

docs/
  human-readable system rules

public catalogue
  generated/discoverable presentation
```

### Principle

**Author once, generate everywhere.**

Consumers must not require hand-maintained duplicates of the same icon definition.

---

## 10. Repository structure

Target structure:

```
icons-byjtt/
├── icons/
│   ├── actions/
│   ├── navigation/
│   ├── communication/
│   ├── media/
│   ├── files/
│   ├── objects/
│   ├── people/
│   ├── commerce/
│   ├── developer/
│   ├── system/
│   └── brands/
├── metadata/
│   ├── icons.json
│   ├── aliases.json
│   ├── categories.json
│   └── relationships.json
├── packages/
│   ├── core/
│   ├── react/
│   ├── vue/
│   └── svelte/
├── scripts/
│   ├── validate/
│   ├── generate/
│   ├── optimise/
│   └── build/
├── docs/
│   ├── design-principles.md
│   ├── naming.md
│   ├── accessibility.md
│   └── contributing.md
├── llms.txt
├── llms-full.txt
└── README.md
```

The structure is directional rather than a requirement that every directory contain files immediately.

---

## 11. Distribution contract

The system is framework-agnostic at its core.

Planned consumer surfaces:

- raw SVG;
- generated HTML/SVG snippets;
- JavaScript/TypeScript package;
- `@byjtt/icons`;
- `@byjtt/icons-react`;
- `@byjtt/icons-vue`;
- `@byjtt/icons-svelte`;
- CDN distribution;
- CLI discovery/generation in a later phase;
- AI-readable catalogue and documentation.

The canonical SVG remains the lowest common denominator.

Framework packages are adapters, not separate icon sources.

---

## 12. AI-native discovery

AI consumption is a first-class requirement, not a documentation afterthought.

The system will publish:

- `llms.txt`;
- `llms-full.txt`;
- canonical `icons.json`;
- stable API catalogue;
- semantic tags;
- aliases;
- contexts;
- relationships;
- canonical raw SVG paths;
- usage examples.

### AI selection principle

An agent should be able to answer:

> “I need an icon for closing a modal.”

and discover an appropriate JTT icon through semantic metadata without needing to visually inspect every SVG.

AI metadata must describe what an icon **means**, not merely what it **looks like**.

---

## 13. Catalogue strategy

JTT Icons will grow in controlled stages.

### Milestone 1 — Core 100

A deliberately selected reference catalogue covering common interface, developer, communication, navigation, system, media, files, and object concepts.

The Core 100 establishes:

- naming patterns;
- geometry patterns;
- category boundaries;
- metadata quality;
- visual consistency;
- validation behaviour.

### Milestone 2 — Core 300

Expand coverage without introducing redundant concepts.

### Milestone 3 — Core 500

Cover the majority of recurring product-interface requirements.

### Milestone 4 — 1,000+

Expand into specialist domains only after the underlying system remains coherent.

Icon count is not itself a success metric.

---

## 14. Icon contribution workflow

A new icon must pass the following conceptual sequence:

1. **Meaning** — define the concept and intended use.
2. **Naming** — select the canonical stable API name.
3. **Semantic metadata** — add title, tags, aliases, contexts and relationships.
4. **Geometry** — construct using canonical system rules.
5. **Optical review** — correct perceived alignment and weight.
6. **Small-size review** — inspect at real UI sizes.
7. **Family consistency** — confirm it belongs to the Line family.
8. **Accessibility classification** — assign default semantic behaviour.
9. **SVG validation** — validate structure and attributes.
10. **Metadata validation** — validate schema and relationships.
11. **Catalogue integration** — expose the icon through public discovery surfaces.
12. **Publish** — generated outputs must derive from the canonical source.

No icon should enter the catalogue solely because an SVG file exists.

---

## 15. Automated validation

The implementation must introduce automated validation for at least:

### SVG validity

- file exists;
- valid SVG document;
- canonical viewBox;
- no accidental raster assets;
- no unsupported external references;
- expected colour/stroke behaviour;
- predictable XML structure;
- no unnecessary metadata noise.

### Naming

- valid kebab-case;
- unique canonical name;
- no duplicate aliases;
- no family-style suffixes in canonical names.

### Metadata

- required fields present;
- valid category;
- tags non-empty;
- accessibility classification valid;
- relationships point to existing icons;
- aliases do not collide incorrectly.

### System consistency

- line icons use the canonical line defaults unless explicitly exempted;
- all published icons are represented in metadata;
- all metadata icons resolve to canonical SVG assets;
- generated catalogue output matches source metadata.

Validation should fail loudly and deterministically.

---

## 16. Public catalogue requirements

The public catalogue is a product surface, but not the source of truth.

It must provide:

- fast search;
- category filtering;
- icon preview;
- copyable SVG;
- stable per-icon URLs;
- machine-readable metadata;
- clear package/usage guidance;
- no dependency on a backend for basic catalogue rendering.

The catalogue should remain fast and resilient if JavaScript is unavailable where practical.

The current static-first approach remains the default architecture.

---

## 17. Versioning and compatibility

JTT Icons follows semantic-versioning principles for consumer-facing packages.

### Non-breaking

- adding icons;
- adding aliases;
- adding metadata;
- improving internal optimisation without changing semantics.

### Potentially breaking

- renaming an icon;
- removing an icon;
- changing the semantic meaning of an existing name;
- changing generated API contracts;
- changing default rendering behaviour in a way that materially affects consumers.

Breaking changes require explicit release notes and migration guidance.

---

## 18. Licensing

The project is intended to remain permissively open source.

The current project direction uses the MIT licence.

Individual brand marks may require separate usage considerations where applicable. Brand icons must not imply endorsement or affiliation.

---

## 19. Quality bar

JTT Icons v1 must optimise for:

**recognition → consistency → usability → discoverability → scale**

rather than:

**icon count → novelty → visual effects**

The system should feel unmistakably JTT through disciplined geometry and semantic coherence, not through decorative branding added to every icon.

---

## 20. v1 implementation boundary

The first implementation phase against this specification will establish:

1. canonical directory structure;
2. canonical Line family rules;
3. metadata schema and catalogue;
4. Core 100 planning set;
5. validation tooling;
6. generation pipeline;
7. package foundation;
8. AI discovery surfaces;
9. static catalogue integration;
10. contributor/design documentation.

Future families, large catalogue expansion, and additional framework adapters remain downstream work unless explicitly promoted into the implementation plan.

---

## 21. Definition of done for the v1 foundation

The foundation is considered implemented when:

- the repository follows the canonical source-of-truth model;
- the existing icons conform to the new schema;
- validation runs deterministically;
- generated outputs can be reproduced from source;
- the Core 100 can be added without changing the architecture;
- the public catalogue consumes canonical metadata/assets;
- AI discovery surfaces resolve to canonical icon definitions;
- package consumers can import the initial icon set;
- documentation explains how to add an icon without relying on tribal knowledge.

This specification intentionally separates **system design** from **catalogue volume**. The architecture must be correct before large-scale icon production begins.
