<script>
  import { icons } from "@byjtt/icons";
  export let name;
  export let title = "";
  export let size = 24;
  export let color;
  export let strokeWidth;
  $: icon = icons[name];
  $: svg = icon?.svg || "";
</script>

{#if icon}
  <span
    class="jtt-icon"
    aria-hidden={title ? undefined : "true"}
    aria-label={title || undefined}
    role={title ? "img" : "presentation"}
    style:display="contents"
  >
    {@html svg
      .replace("<svg", `<svg width="${size}" height="${size}"`)
      .replace(/stroke-width="2"/, strokeWidth ? `stroke-width="${strokeWidth}"` : 'stroke-width="2"')
      .replace("<svg", color ? `<svg style="color:${color}"` : "<svg")}
    }
  </span>
{/if}
