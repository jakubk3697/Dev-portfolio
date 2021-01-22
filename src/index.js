/* eslint-disable no-unused-vars */
import initMd from "markdown-element";
import startGame from "./game/index.js";
import startJoke from "./joke/index.js";
import initBlog from "./blog/index.js";
import initInfo from "./about/index.js";
import initGHRepos from "./github/index.js";
// import main from "./github/index.js";

import { getNextPosts } from "./github/generator.js";

initBlog();
initInfo();
initGHRepos();
// startJoke();
// startGame();
// main();

window.controls = {
  startGame,
  startJoke,
};

const posts = getNextPosts();

posts.next().then((r) => {
  console.log(r);
  posts.next().then((r2) => {
    console.log(r2);
    posts.next().then((r3) => console.log(r3));
  });
});
