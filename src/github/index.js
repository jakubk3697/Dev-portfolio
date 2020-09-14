/* eslint-disable require-jsdoc */
import getRepos from "./service.js";

// eslint-disable-next-line space-before-function-paren
export default function () {
  getRepos().then((arr) => console.log(arr.length));
}
