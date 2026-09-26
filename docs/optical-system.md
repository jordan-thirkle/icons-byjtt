# JTT Icons Optical System

The canonical JTT icon is authored on a **24 × 24 master grid**. Optical Infrastructure keeps that master as the source of truth while making real UI sizes reviewable and repeatable.

## Review sizes

Every Core icon is reviewed at:

- 12px — dense / micro UI
- 16px — compact UI
- 20px — standard UI
- 24px — canonical master

The repository generates a deterministic SVG contact grid for every size under `visual-snapshots/`.

## Keyline

The default optical live area is **18 × 18 units**, centred inside the 24 × 24 viewBox:

- left/top: 3
- right/bottom: 21
- ratio: 75% of the master box

The keyline is a guide, not a prison. Directional terminals, circular silhouettes and other semantic geometry may optically exceed or retreat from it when that produces a more balanced icon.

## Optical volume

JTT does not require identical geometric occupancy. Icons should have comparable **perceived visual weight**.

Review:

- apparent stroke mass;
- silhouette area;
- centre of visual gravity;
- negative-space distribution;
- terminal prominence;
- corner and counter clarity;
- tangencies and near-collisions.

Mathematical centring is subordinate to optical balance.

## Micro derivation

Micro is a **derived family**, never an independent source family.

The 24px Line master remains canonical. A Micro derivative may:

1. remove secondary detail;
2. merge geometry where it improves recognition;
3. preserve the primary contour;
4. preserve directional and interaction cues;
5. protect critical counters and gaps;
6. retain the canonical icon name and semantic metadata.

A Micro derivative must never become a competing semantic source.

## Automated audit

`node scripts/generate-optical.mjs` produces:

- `visual-snapshots/core-100-12.svg`
- `visual-snapshots/core-100-16.svg`
- `visual-snapshots/core-100-20.svg`
- `visual-snapshots/core-100-24.svg`
- `metadata/optical-audit.json`

The audit gives every icon a deterministic complexity score. High complexity means **review required**, not automatic rejection.

## Release gate

Core expansion is blocked until:

- all four grids exist;
- all 100 icons are represented in each grid;
- optical rules remain versioned;
- generated optical artifacts are deterministic;
- Micro remains downstream of the canonical 24px master.


## Micro 0.1 proof family

The first Micro proof is deliberately experimental and contains eight representative non-brand derivatives. It is reviewed at 12px and 16px with side-by-side Line/Micro snapshots.

Micro is not added to the canonical catalogue or framework package until the family rules survive this proof.

The Micro audit treats complexity as supporting evidence. A derivative may legitimately keep complexity flat when its purpose is optical rebalancing, such as enlarging a critical counter or changing repeated directional geometry for small-size recognition.
