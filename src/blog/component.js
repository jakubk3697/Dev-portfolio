/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable require-jsdoc */
import { getBlogPost, getBlogPostNames } from "../github/service";
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

export class Footer extends HTMLElementWithContent {
  constructor() {
    super("footer", style.footer, "&copy; Copyright Jacob 2020");
  }
}

export class Body extends HTMLElement {
  constructor() {
    super();
    const section = document.createElement("section");
    // section.className = style.content;
    getBlogPostNames().then((posts) => {
      section.innerHTML = `

    <style>
    section {
      overflow: hidden;
      padding: 1em 1.25em;
      background-color: #fff;
    }

    @media (min-width: 55em) {

      .${style.container}{
          max-width: 70em;
          margin: 0 auto;
      }

      section: {
        padding: 2em 3em;
      }
      
      main,
      aside {
        margin-bottom: 1em;
      }

      main {
        float: left;
        width: 65%;
        margin-right: 5%;
        margin-bottom: 1em;
      }
    
      aside {
        float: left;
        width: 30%;
        margin-bottom: 1em;
      }
    }

  </style>
 
      <div class="${style.container}">
        <main>
         ${posts
           .reverse()
           .map((postName) => `<blog-post post-name="${postName}"></blog-post>`)
           .join("<hr>")} 
        </main>
        <aside>
          <slot name="side-menu"></slot>
        </aside>
      </div>
    `;
      this.attachShadow({ mode: "open" }).appendChild(section);
    });
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
    this.shadow.appendChild(
      (document.createElement("style").innerHTML = `
      pre {
        width: 100%;
        overflow: scroll;
      }
      img {
        width: 100%;
      }
    `)
    );
  }

  clean() {
    this.shadow.childNodes.forEach((child) => child.remove());
  }
}
