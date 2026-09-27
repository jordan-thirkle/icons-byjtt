export interface JttIconProps {
  name: string;
  title?: string;
  size?: number | string;
  [key: string]: unknown;
}
export declare function JttIcon(props: JttIconProps): {
  name: string;
  title: string;
  size: number | string;
  attrs: Record<string, unknown>;
  svg: string;
};
