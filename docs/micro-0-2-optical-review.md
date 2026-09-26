# Micro 0.2 Optical Review

Status: **experimental — proof lane only**

Micro 0.2 applies the corrected Micro rules from 0.1 to six representative failure modes. It does not expand the catalogue or package exports.

## Semantic recognition gate

Every selected icon must preserve its declared primary cue. The regression layer checks the canonical source and Micro derivative against a machine-readable semantic contract in `metadata/micro-semantic.json`.

The contract is intentionally narrow: required structural cues and known forbidden reads. It is a regression guard, not a claim that regex can determine whether a human recognises an icon.

## Review set

| Icon | Failure mode | Micro treatment | Gate |
| --- | --- | --- | --- |
| archive | container/detail | replace tiny internal plus with archive slot | Pass to visual review |
| cart | compound wheels | enlarge wheel counters | Pass to visual review |
| database | stacked repetition | collapse repeated body rows into one cylinder | Pass to visual review |
| edit | diagonal compound | remove redundant pencil seam | Pass to visual review |
| git-branch | branch topology | enlarge nodes, preserve all three | Pass to visual review |
| loading | radial repetition | replace spoke wheel with open activity arc | Pass to visual review |

## Deliberately gated

- **copy** — canonical nested-sheet structure is already compact enough; no earned derivative yet.
- **map** — both fold divisions are semantic; removing one would weaken the map metaphor.
- **volume-off** — speaker plus mute cross is the minimum semantic structure.
- **warning** — triangle plus exclamation are both essential to the warning cue.

## Rule proven

Micro is **not** a complexity-minimisation pass. Archive, cart and git-branch keep complexity flat because optical rebalancing can be the correct intervention. Database, edit and loading demonstrate true simplification where secondary detail is expendable.

The next gate is native-size review of the six selected derivatives. Remaining candidates stay out of the family until a specific failure mode earns a geometry change and passes the semantic regression layer.
