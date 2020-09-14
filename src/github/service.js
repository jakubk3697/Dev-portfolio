/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import { GitHubRepo } from "./model.js";
const REPOS_URL = "https://api.github.com/users/jakubk3697/repos";
const FORBIDDEN_REPOS = ["Portfolio"];

const convertObj = ({ name, stargazers_count: stars, clone_url: cloneUrl }) =>
  new GitHubRepo({
    name,
    stars,
    cloneUrl,
  });

export default function getRepos() {
  return fetch(REPOS_URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw Error("Response not 200");
    })
    .then((arr) => arr.filter((repo) => !FORBIDDEN_REPOS.includes(repo.name)).map(convertObj))

    .catch((err) => console.warn(err));
}
