/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable require-jsdoc */
import { markdownRenderer } from "../common/decorator";

import { getBlogPost, getBlogPostNames } from "../github/service";
import { dom } from "@fortawesome/fontawesome-svg-core";
import style from "./style.css";

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
    this.attachShadow({ mode: "open" });
    this.render();
    this.renderStyles();
  }
  async render(name = null) {
    const fullPost = !!name;
    const postNames = await getBlogPostNames();
    const posts = fullPost ? [name] : postNames;
    this.shadowRoot.innerHTML = `
      <section>
      ${this.renderStyles()}
        <div class="${style.container}">  
        <main>
  
        ${posts
          .reverse()
          .map(
            (postName, index) => `
            <blog-post post-name="${postName}" full-post="${fullPost}"></blog-post>
            <button id="${index}-${postName}">${fullPost ? "Back" : "Read more..."}</button> 
            `
          )
          .join("<hr>")} 
        </main> 
        <aside>
          <slot name="side-menu"></slot>
        </aside>
        </div>
      </section>
    `;

    posts.forEach((postName, index) => {
      // console.log(this.shadowRoot.getElementById(`${index}-${postName}`));
      this.shadowRoot.getElementById(`${index}-${postName}`).addEventListener("click", () => {
        if (!fullPost) {
          this.render(postName);
        } else {
          this.render();
        }
      });
    });

    dom.i2svg({
      node: this.shadowRoot,
    });
  }

  renderStyles() {
    return `
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

      .svg-inline--fa {
        display: inline-block;
        font-size: inherit;
        height: 2em;
        overflow: visible;
        vertical-align: -0.125em;
      }
      .svg-inline--fa.fa-w-16 {
        width: 2em;
      }

      @keyframes rotating {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .rotate-ico {
        animation: rotating 2s linear infinite;
      }
  
    </style>
    `;
  }
}

@markdownRenderer
export class BlogPost extends HTMLElement {
  static get observedAttributes() {
    return ["post-name", "full-post"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  async render() {
    this.loading();
    const name = this.getAttribute("post-name");
    const fullPost = this.getAttribute("full-post") === "true";
    const content = await getBlogPost(`${name}.md`);
    this.shadowRoot.innerHTML = `
      <article>
        ${this.renderMarkdown(fullPost ? content : `${content.substr(0, 100)}...`)}
      </article>

      <style>
        pre {
          width: 100%;
          overflow: scroll;
        }
        img {
          width: 100%; 
        }
      </style>
    `;
  }
  loading() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(document.getElementById("blog-loading").content.cloneNode(true));
    dom.i2svg({ node: this.shadowRoot });
  }
}
