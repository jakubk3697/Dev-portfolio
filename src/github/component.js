/* eslint-disable require-jsdoc */
import { renderer } from "../common/decorator";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { getRepos } from "./service";

@renderer()
export class GitHubRepos extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  async render() {
    const repos = await getRepos();
    this.shadowRoot.innerHTML = `
    ${this.renderStyles()}
    ${this.renderHeader()}
        <table>
            <tbody>
                ${repos.map((r) => r.toTableRow()).join("\n")}
            </tbody>
        </table>
    `;
    dom.i2svg({
      node: this.shadowRoot,
    });
  }

  renderStyles() {
    return `
        <style>
          img {
            height: 1em;
          }
          
          h2 {
            width: 40%;
            margin: 1em auto 0;
            text-align: center;
          }

          table {
            width: 40%;
            margin: 0 auto 20px;
            background-color: transparent;
            border-spacing: 0;
            border-collapse: collapse;
            border-top: 1px solid #ddd;
          }
          
          th,
          td {
            padding: 0.5em 1em;
            vertical-align: top;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          
          tr {
            color: #333;
          }
          
          tr:hover {
            color: #999;
            cursor: pointer;
          }  
        </style>
      `;
  }

  renderHeader() {
    // eslint-disable-next-line max-len
    const logo = document.getElementById("gh-logo").content.cloneNode(true);
    const h2 = document.createElement("h2");
    h2.appendChild(logo);
    return h2.outerHTML;
  }
}
