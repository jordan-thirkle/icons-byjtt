import type { SvelteComponentTyped } from "svelte";
export interface JttIconProps { name:string; size?:number|string; title?:string; [key:string]:any }
export default class JttIcon extends SvelteComponentTyped<JttIconProps> {}
