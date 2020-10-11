/* eslint-disable no-unused-vars */
import initMd from "markdown-element";
import startGame from "./game/index.js";
import startJoke from "./joke/index.js";
import initBlog from "./blog/index.js";
import initInfo from "./about/index.js";
// import main from "./github/index.js";

initBlog();
initInfo();
// startJoke();
// startGame();
// main();

window.controls = {
  startGame,
  startJoke,
};
