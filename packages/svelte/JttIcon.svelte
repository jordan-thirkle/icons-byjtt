<script>export let name=""; export let size=24; export let title="";</script>
<svg width={size} height={size} viewBox="0 0 24 24" role={title?"img":"presentation"} aria-hidden={title?undefined:"true"} aria-label={title}>{#if title}<title>{title}</title>{/if}</svg>
