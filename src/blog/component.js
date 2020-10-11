/* eslint-disable require-jsdoc */
import { getBlogPost } from "../github/service";
import style from "../css/blog.css";

export class Header extends HTMLElement {
  constructor() {
    super();
    const header = document.createElement("header");
    header.innerHTML = `
      <div class=${style.container}>
        <h1 class=${style["header-heading"]}>Yet another programmer's blog</h1>
      </div>
    `;
    this.appendChild(header);
  }
}

/* eslint-disable require-jsdoc */
export class BlogPost extends HTMLElement {
  static get observedAttributes() {
    return ["post-name"];
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
    const name = this.getAttribute("post-name");
    const md = document.createElement("mark-down");
    md.textContent = await getBlogPost(`${name}.md`);
    this.shadow.appendChild(md);
  }

  clean() {
    this.shadow.childNodes.forEach((child) => child.remove());
  }
}
