/* eslint-disable comma-dangle */
/* eslint-disable require-jsdoc */
import { getBlogPost } from "../github/service";
import style from "../css/blog.css";

class HTMLElementWithContent extends HTMLElement {
  constructor(tag, tagStyle, content) {
    super();
    const element = document.createElement(tag);
    element.className = tagStyle;
    element.innerHTML = `<div class="${style.container}">${content}</div>`;
    this.appendChild(element);
  }
}

export class Header extends HTMLElementWithContent {
  constructor() {
    super(
      "header",
      style.header,
      `
      <h1 class="${style["header-heading"]}">Yet another programmer's blog</h1>
      `
    );
  }
}

export class Navigation extends HTMLElementWithContent {
  constructor() {
    super(
      "nav",
      style["nav-bar"],
      `
       <ul class="${style.nav}">
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="../index.html">About me</a></li>
       </ul>
    `
    );
  }
}

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
