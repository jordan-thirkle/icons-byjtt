import { icons } from "@byjtt/icons";

export function JttIcon({ name, title, size = 24, ...attrs }) {
  const icon = icons[name];
  if (!icon) throw new Error("Unknown JTT icon: " + name);
  const ariaHidden = title ? undefined : "true";
  return {
    name: icon.name,
    title: title || "",
    size,
    attrs: { ...attrs, width: size, height: size, "aria-hidden": ariaHidden, "aria-label": title },
    svg: icon.svg
  };
}
