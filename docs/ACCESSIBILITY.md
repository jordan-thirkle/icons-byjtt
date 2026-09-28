# JTT Icons — Accessibility

JTT Icons targets WCAG 2.2 AA as the public web accessibility baseline.

## Product contract

- Keyboard-first navigation with a persistent skip link and visible `:focus-visible` treatment.
- Interactive controls use at least 44px minimum height where practical; WCAG 2.2 requires pointer targets to be at least 24×24 CSS pixels or meet an allowed exception.
- Text and controls use explicit foreground/background tokens rather than relying on colour alone.
- The default dark and light themes both use high-contrast text and control boundaries.
- `prefers-reduced-motion`, `prefers-contrast` and `forced-colors` are supported.
- Sticky search navigation uses scroll padding so keyboard focus can remain visible.
- Search results expose live result-count changes to assistive technology.
- Icon-only controls are labelled by the control; decorative SVGs are hidden from assistive technology.
- Content is responsive and designed to reflow rather than requiring two-dimensional scrolling at narrow widths.

## Contrast

The colour system is designed above the WCAG AA thresholds rather than targeting the minimum. The dark text system uses very high contrast, while the light-theme body text, links and focus colour are all substantially above 4.5:1 against the light background.

## Review

Accessibility is tested as a source contract and should additionally be checked in real browsers with keyboard navigation, zoom/reflow, screen readers, high-contrast/forced-colour modes and reduced motion.

Visual icon review remains separate from web accessibility: every canonical icon must also pass the JTT five-size optical review at 12, 14, 16, 20 and 24px.
