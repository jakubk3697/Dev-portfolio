/* eslint-disable no-unused-vars */
import initMd from "markdown-element";
// import main from "./github/index.js";
import { getBlogPost } from "./github/service.js";

getBlogPost().then((blogPost) => {
  const md = document.createElement("mark-down");
  md.textContent = blogPost;
  document.body.appendChild(md);
});
// import getJoke from "./joke/index.js";
// import game from "./game/index.js";
// getJoke();
// main();
// game();
