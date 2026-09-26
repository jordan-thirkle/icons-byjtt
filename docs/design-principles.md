# JTT Icons Design Principles

JTT Icons is a system, not a folder of unrelated SVGs.

## Canonical geometry

- 24 × 24 viewBox.
- SVG is the canonical source format.
- Default colour is `currentColor`.
- Line family uses stroke width 2, round caps, round joins and no fill.
- Optical alignment takes precedence over purely mathematical centring.
- Negative space must survive real UI sizes.

## Recognition first

Remove detail that does not improve recognition, hierarchy or interaction meaning. Avoid accidental tangencies, tiny counters, collapsed corners and decorative micro-detail.

## Real-size first

Review icons at 12px, 14px, 16px, 20px and 24px. A large preview is never sufficient evidence of usability.

## Semantic consistency

An icon has one stable semantic identity. Visual families change rendering, not meaning.

## Brand exception

Brand marks may use currentColor fill when their silhouette requires it. This is a system-level exception, not a general alternative to the Line geometry contract.
