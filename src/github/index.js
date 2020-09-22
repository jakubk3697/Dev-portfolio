/* eslint-disable require-jsdoc */
import getRepos from "./service.js";

// eslint-disable-next-line space-before-function-paren
export default async function () {
  (await getRepos()).forEach((el) => el);
}
