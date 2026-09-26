# Core 100 Release Audit

Status: **release pipeline green**

## Release integrity

The Core 100 now has one canonical source and reproducible generated surfaces:

- 100 canonical SVGs.
- 100 package icon modules.
- 100 public icon pages.
- 100 catalogue records.
- 100 sitemap icon routes.
- AI reference generated from canonical metadata.
- Package root exports generated from the same catalogue.
- Generation, tests, metadata validation, SVG validation, and generated-drift checks run in CI.

Main-branch generation owns regeneration and commits generated artifacts. Pull-request validation owns the zero-drift check. This prevents an expected generated commit from appearing as a false-red validation run.

## Semantic audit

### Passed

- 100 unique canonical names.
- Kebab-case naming remains stable.
- No alias collisions remain.
- Alias and relationship maps validate against canonical metadata.
- All related references resolve.
- Accessibility defaults are present and valid.
- Category assignments are internally consistent enough for Core 100 release.

### Deliberate observations

- `heart` and `star` remain in `communication` because their metadata is explicitly centred on reactions, social/content, and rating contexts.
- `settings` remains in `system`, matching its configuration/system contexts.
- Related links are intentionally directional; 40 relationships are currently one-way. They are treated as semantic recommendations rather than graph edges that must be symmetric.
- Brand marks are a documented exception to the line-rendering contract: they use solid `currentColor` silhouettes while remaining in the same catalogue.

No semantic change is warranted solely to make the numbers look more symmetrical.

## Visual / optical audit

The canonical SVG contract passes for all 100 icons: 24×24 viewBox, currentColor rendering, 2px line weight, round caps/joins, with the documented brand exception.

A manual rendered sample exposed one real geometry defect in `star`: the previous path self-intersected and produced an optically broken star. It has been corrected and regenerated through the normal pipeline.

The sample also confirms an important size-system boundary: complex line masters can remain recognisable at 12px, but they do not all retain professional optical weight at that size. In particular, `star` becomes visibly heavy/noisy when rasterised at 12px. This supports the planned Micro family rather than forcing the 24px master to carry every optical size.

### Rule going forward

Do not add Core 101+ icons until the next visual milestone exists:

1. rendered 12/16/20/24px audit grid;
2. optical-volume/keyline review;
3. dedicated Micro simplification rules;
4. repeatable visual regression snapshots.

The canonical 24px line masters remain the source geometry. Small-size variants must derive from them rather than becoming independent drawings.

## Decision

**Core 100 is structurally releasable, but the icon system is not being expanded yet.**

The next work is optical infrastructure and visual regression, followed by the first derived Micro family. Only after that should the catalogue grow beyond 100.
