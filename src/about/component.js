import { markdownRenderer, renderer } from "../common/decorator";
import { getAboutMe } from "../github/service";

@renderer()
@markdownRenderer
/* eslint-disable require-jsdoc */
export class AboutMe extends HTMLElement {
  static get observedAttributes() {
    return ["about-title"];
  }
  constructor() {
    super();
    this.init();
  }

  async render() {
    const about = await getAboutMe();
    this.shadowRoot.innerHTML = this.renderMarkdown(about);
  }
}
