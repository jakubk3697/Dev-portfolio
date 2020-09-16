/* eslint-disable require-jsdoc */
import showJoke from "./show.js";

export default () => {
  const jokeBtn = document.createElement("button");
  jokeBtn.innerText = "Get joke!";
  document.body.appendChild(jokeBtn);

  jokeBtn.addEventListener("click", showJoke);
};
