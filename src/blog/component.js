/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable require-jsdoc */
import { markdownRenderer, renderer } from "../common/decorator";
import { getBlogPost } from "../github/service";
import { getNextPosts /* getNextPost */ } from "../github/generator";
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

@renderer()
export class Body extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  async render(name = null) {
    this.posts = getNextPosts();
    const fullPost = !!name;
    const names = fullPost ? [name] : (await this.posts.next()).value;
    this.shadowRoot.innerHTML = `
    ${this.renderStyles()}
      <section>
        <div class="${style.container}">  
        <main>
          ${this.renderPostComponents(names, fullPost)}
        </main> 
        <aside>
          <slot name="side-menu"></slot>
        </aside>
        </div>
      </section>
      `;
    this.attachClickCallbacks(names, fullPost);

    dom.i2svg({
      node: this.shadowRoot,
    });
  }

  async uprender() {
    const generated = await this.posts.next();
    const names = generated.value;
    if (names.length) {
      const main = this.shadowRoot.querySelector("main");
      const nextPosts = document.createElement("div");
      nextPosts.className = "next-posts";
      nextPosts.innerHTML = `<hr>${this.renderPostComponents(names)}`;
      main.appendChild(nextPosts);
      this.attachClickCallbacks(names);
    }
    if (generated.done) {
      this.shadowRoot.getElementById("load-more").remove();
    }
  }

  renderPostComponents(names, fullPost = false) {
    const postComponents = names
      .map(
        (postName, index) => `
      <blog-post post-name="${postName}" full-post="${fullPost}"></blog-post>
      <div style="display: flex; justify-content: space-between;">
        <button id="${index}-${postName}">${fullPost ? "Back" : "Read more..."}</button>
        <button id="next-${index}-${postName}" style="display: ${fullPost ? "block" : "none"};">Next</button>
      </div>
    `
      )
      .join("<hr>");

    return fullPost ? postComponents : postComponents + '<button style="display: block; padding: 1em; margin: 0 auto;" id="load-more">Load more...</button>';
  }

  attachClickCallbacks(names, fullPost = false) {
    names.forEach((postName, index) => {
      this.shadowRoot.getElementById(`${index}-${postName}`).onclick = () => {
        if (!fullPost) {
          this.render(postName);
        } else {
          this.render();
        }
      };
    });

    if (!fullPost) {
      const loadMoreBtn = this.shadowRoot.getElementById("load-more");
      loadMoreBtn.onclick = () => {
        console.log("Load more works");
        loadMoreBtn.remove();
        this.uprender();
      };
    }
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

@renderer(true)
@markdownRenderer
export class BlogPost extends HTMLElement {
  static get observedAttributes() {
    return ["post-name", "full-post"];
  }
  constructor() {
    super();
    this.init();
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
