# Integrations

JTT Icons is intentionally framework-agnostic.

## Raw SVG

```html
<img src="https://icons.byjtt.com/icons/navigation/search.svg" width="24" height="24" alt="Search">
```

## Direct CDN

The canonical SVGs can be consumed from jsDelivr directly from the public GitHub repository:

```html
<img src="https://cdn.jsdelivr.net/gh/jordan-thirkle/icons-byjtt/icons/navigation/search.svg" alt="Search">
```

## React

```bash
npm install @byjtt/icons-react react
```

```jsx
import { IconSearch } from "@byjtt/icons-react";

<IconSearch aria-label="Search" />
```

## Vue

```bash
npm install @byjtt/icons-vue vue
```

```vue
<IconSearch aria-label="Search" />
```

## Svelte

```bash
npm install @byjtt/icons-svelte @byjtt/icons
```

```svelte
<script>
  import { JttIcon } from "@byjtt/icons-svelte";
</script>

<JttIcon name="search" title="Search" />
```

## Web Component

```bash
npm install @byjtt/icons-web
```

```html
<script type="module">
  import "@byjtt/icons-web";
</script>

<jtt-icon name="search" title="Search"></jtt-icon>
```

## AI agents

Use `/api/mcp`, `/api/icons.json`, or the portable skill at `/skills/jtt-icons/SKILL.md`.

All integrations resolve back to the same canonical icon identity.
