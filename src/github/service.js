/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import { GitHubRepo } from "./model.js";
const REPOS_URL = "https://api.github.com/users/jakubk3697/repos";
const RAW_URL = "https://raw.githubusercontent.com/jakubk3697/Dev-portfolio/master/blog/";
const POSTS_SUB_URL = "posts/";
const POST_NAME = /(\d+)\.md/;
const FILES_URL = "https://api.github.com/repos/jakubk3697/Dev-portfolio/contents/blog";
const FORBIDDEN_REPOS = ["Portfolio"];

const convertObj = ({ name, stargazers_count: stars, clone_url: cloneUrl }) =>
  new GitHubRepo({
    name,
    stars,
    cloneUrl,
  });

async function getRawFileContent(pathToFile) {
  try {
    const res = await fetch(`${RAW_URL}${pathToFile}`);
    if (res.ok) {
      return await res.text();
    }
    throw Error("Response not 200");
  } catch (err) {
    console.warn(err);
  }
}

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

export async function getBlogPost(name = "0.md") {
  return getRawFileContent(`${POSTS_SUB_URL}${name}`);
}

export async function getAboutMe() {
  return getRawFileContent("about-me.md");
}

export async function getBlogPostNames() {
  try {
    const res = await fetch(FILES_URL);
    if (res.ok) {
      return (await res.json()).filter((file) => POST_NAME.test(file.name)).map(({ name }) => name.split(".")[0]);
    }
  } catch {
    throw Error("Response not 200");
  }
}
