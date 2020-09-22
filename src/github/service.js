/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import { GitHubRepo } from "./model.js";
const REPOS_URL = "https://api.github.com/users/jakubk3697/repos";
const POSTS_URL = `https://raw.githubusercontent.com/jakubk3697/Dev-portfolio/master/blog/${name}`;
const FORBIDDEN_REPOS = ["Portfolio"];

const convertObj = ({ name, stargazers_count: stars, clone_url: cloneUrl }) =>
  new GitHubRepo({
    name,
    stars,
    cloneUrl,
  });

/* Version 2 - async/await */
export default async function getRepos() {
  try {
    const res = await fetch(REPOS_URL);
    if (res.ok) {
      return (await res.json()).filter((repo) => !FORBIDDEN_REPOS.includes(repo.name)).map(convertObj);
    }
  } catch {
    throw Error("Response not 200");
  }
}

export async function getBlogPost(name = "1.md") {
  try {
    const res = await fetch(`${POSTS_URL}${name}`);
    if (res.ok) {
      return await res.text();
    }
  } catch {
    throw Error("Response not 200");
  }
}

/* Version 1 - fetch */
// export default function getRepos() {
//   return fetch(REPOS_URL)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       throw Error("Response not 200");
//     })
//     .then((arr) => arr.filter((repo) => !FORBIDDEN_REPOS.includes(repo.name)).map(convertObj))

//     .catch((err) => console.warn(err));
// }
