export interface JttIconMetadata {
  name: string;
  title: string;
  category: string;
  tags: string[];
  aliases: string[];
  contexts: string[];
  related: string[];
  accessibility: { default: "decorative" | "meaningful" | "interactive" | "status" | "brand" };
  path: string;
  family: "line";
}
export interface JttIconModule {
  name: string;
  title: string;
  category: string;
  svg: string;
  metadata: JttIconMetadata;
}
export declare const arrowUpRight: JttIconModule;
export declare const check: JttIconModule;
export declare const code: JttIconModule;
export declare const github: JttIconModule;
export declare const heart: JttIconModule;
export declare const menu: JttIconModule;
export declare const minus: JttIconModule;
export declare const plus: JttIconModule;
export declare const search: JttIconModule;
export declare const settings: JttIconModule;
export declare const star: JttIconModule;
export declare const x: JttIconModule;
export declare const iconNames: readonly string[];
export declare const icons: Record<string, JttIconModule>;
