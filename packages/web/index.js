import { icons } from "@byjtt/icons";

class JttIconElement extends HTMLElement {
  static observedAttributes = ["name", "size", "title", "color", "stroke-width"];

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const name = this.getAttribute("name");
    const icon = name ? icons[name] : null;
    if (!icon) {
      this.replaceChildren();
      return;
    }
    const size = this.getAttribute("size") || "24";
    const title = this.getAttribute("title");
    const svg = icon.svg.replace("<svg", "<svg width="" + size + "" height="" + size + """);
    const template = document.createElement("template");
    template.innerHTML = svg;
    const node = template.content.firstElementChild;
    if (title) {
      node.setAttribute("role", "img");
      node.setAttribute("aria-label", title);
      node.removeAttribute("aria-hidden");
    } else {
      node.setAttribute("aria-hidden", "true");
      node.setAttribute("role", "presentation");
    }
    const color = this.getAttribute("color");
    if (color) node.style.color = color;
    const strokeWidth = this.getAttribute("stroke-width");
    if (strokeWidth && node.hasAttribute("stroke-width")) node.setAttribute("stroke-width", strokeWidth);
    this.replaceChildren(node);
  }
}

if (!customElements.get("jtt-icon")) customElements.define("jtt-icon", JttIconElement);
export { JttIconElement };
