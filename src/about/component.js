import { getAboutMe } from "../github/service.js";

/* eslint-disable require-jsdoc */
export class AboutMe extends HTMLElement {
  static get observedAttributes() {
    return ["about-title"];
  }
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  async render() {
    this.clean();
    const name = this.getAttribute("about-title");
    const md = document.createElement("mark-down");
    md.textContent = await getAboutMe(name);
    this.shadow.appendChild(md);
  }

  clean() {
    this.shadow.childNodes.forEach((child) => child.remove());
  }
}
