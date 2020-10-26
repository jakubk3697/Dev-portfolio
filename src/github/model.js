/* eslint-disable require-jsdoc */
export class GitHubRepo {
  constructor({ name, stars, license, url }) {
    this.name = name;
    this.stars = stars;
    this.license = license;
    this.url = url;
  }

  toTableRow() {
    return `
      <tr onclick="location.assign('${this.url}')">
        <td>
          ${this.name}
        </td>
        <td>
          (${this.stars} ⭐)
        </td>
      </tr>
    `;
  }
}
