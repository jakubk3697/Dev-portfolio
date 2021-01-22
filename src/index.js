/* eslint-disable no-unused-vars */
import initMd from "markdown-element";
import startGame from "./game/index";
import startJoke from "./joke/index";
import initBlog from "./blog/index";
import initInfo from "./about/index";
import initGHRepos from "./github/index";
// import main from "./github/index";

import { getNextPosts } from "./github/generator";

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
