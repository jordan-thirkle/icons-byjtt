# JTT Icons Accessibility

Accessibility is part of the icon contract.

## Classifications

Every icon declares one default classification:

- `decorative`
- `meaningful`
- `interactive`
- `status`
- `brand`

The classification describes the default semantic role. It does not replace the accessible name or control semantics required by the consuming interface.

## Website requirements

The JTT website aims to conform to WCAG 2.2 AA for relevant content and interaction.

UI text must maintain at least 4.5:1 contrast against its background for normal text and 3:1 for large text. UI components and required graphical states use at least 3:1 non-text contrast where applicable. Keyboard focus remains visible with a sufficiently contrasting indicator. The site also supports reduced-motion preferences.

Contrast must be evaluated on the actual rendered foreground/background pair, not only on the design token in isolation.

## Icon usage

Interactive icon buttons need an accessible control name. Meaningful and status icons need an appropriate text alternative when the information is not otherwise present. Decorative icons should be hidden from assistive technology when appropriate.

SVG markup alone must not be assumed to communicate meaning to assistive technology.

## Contribution requirement

UI changes that alter colour, focus, borders, controls or typography should include an accessibility review in the PR and should preserve the repository contrast tests.
