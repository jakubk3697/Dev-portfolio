/* eslint-disable require-jsdoc */
export class GitHubRepo {
  constructor({ name, stars, license }) {
    this.name = name;
    this.stars = stars;
    this.license = license;
  }

  toString() {
    return `${this.name} (${this.stars} *)`;
  }
}
