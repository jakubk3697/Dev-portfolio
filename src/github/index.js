/* eslint-disable space-before-function-paren */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line space-before-function-paren
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { GitHubRepos } from "./component";

export default function () {
  library.add(faSpinner, faGithub);

  customElements.define("gh-repos", GitHubRepos);
}
