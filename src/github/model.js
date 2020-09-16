/* eslint-disable require-jsdoc */
export class GitHubRepo {
  constructor({ name, stars, cloneUrl }) {
    this.name = name;
    this.stars = stars;
    this.cloneUrl = cloneUrl;
  }

  get starsInfo() {
    return this.stars > 0 ? `${this.stars}` : "";
  }

  toString() {
    return `
    ${this.name}
    (${this.starsInfo})
    ${this.cloneUrl} 
     `;
  }
}
