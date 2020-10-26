/* eslint-disable require-jsdoc */
import { getRepos } from "./service";

export class GitHubRepos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  async render() {
    const repos = await getRepos();
    this.shadowRoot.innerHTML = `
    ${this.renderStyles()}
        <h2>My <img src"https://github.githubassets.com/images/icons/emoji/octocat.png"> repositories</h2>
        <table>
            <tbody>
                ${repos.map((r) => r.toTableRow()).join("\n")}
            </tbody>
        </table>
    `;
  }

  renderStyles() {
    return `
        <style>
          img {
            height: 1em;
          }
          
          h2 {
            width: 20%;
            margin: 1em auto 0;
            text-align: left;
          }

          table {
            width: 20%;
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
}
