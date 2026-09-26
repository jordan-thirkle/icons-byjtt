# JTT Icons Accessibility

Accessibility is part of the icon contract.

## Classifications

Every icon declares one default classification:

- `decorative`
- `meaningful`
- `interactive`
- `status`
- `brand`

## Usage

The classification describes the icon's default semantic role; it does not replace accessible labelling in a consuming interface.

Interactive icons need an accessible control name. Meaningful and status icons need an appropriate text alternative when their information is not otherwise present. Decorative icons should be hidden from assistive technology when appropriate.

The SVG system must not assume that visual shape alone communicates meaning to assistive technology.
