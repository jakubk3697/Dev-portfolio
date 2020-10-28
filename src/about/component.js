import { getAboutMe } from "../github/service.js";

/* eslint-disable require-jsdoc */
export class AboutMe extends HTMLElement {
  static get observedAttributes() {
    return ["about-title"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  async render() {
    const about = await getAboutMe();
    this.shadowRoot.innerHTML = `
      <mark-down>
        ${about}
      </mark-down>
    `;
  }
}
