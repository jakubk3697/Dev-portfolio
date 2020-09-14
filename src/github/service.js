const REPOS_URL = "https://api.github.com/users/jakubk3697/repos";

/* eslint-disable require-jsdoc */
export default function getRepos() {
  return fetch(REPOS_URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error("Response not 200");
      }
    })
    .catch((err) => console.warn(err));
}
