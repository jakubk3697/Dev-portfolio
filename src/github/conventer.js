import { GitHubRepo } from "./model.js";

export const convertObj =
({ name, stargazers_count: stars, license: { spdx_id: license } }) =>
  new GitHubRepo({
    name,
    stars,
    license,
  });
