const REPOS_URL = "https://api.github.com/users/jakubk3697/repos";
const FORBIDDEN_REPOS = ["Portfolio"];

/* eslint-disable require-jsdoc */
export default function getRepos() {
  return fetch(REPOS_URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw Error("Response not 200");
    })
    .catch((err) => console.warn(err))
    .then((arr) => arr.filter((repo) => !FORBIDDEN_REPOS.includes(repo.name)));
}
