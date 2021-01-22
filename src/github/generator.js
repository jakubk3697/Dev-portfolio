/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import { getBlogPost, getBlogPostNames } from "./service";

const MAX_PARALLEL_POSTS = 5;

export async function* getNextPosts() {
  const postNames = await getBlogPostNames();
  let index = 0;
  while (index < postNames.length) {
    const currentPosts = postNames.slice(index, index + MAX_PARALLEL_POSTS);
    console.log(currentPosts);
    yield Promise.all([
      //
      ...currentPosts.map((name) => getBlogPost(`${name}.md`)),
    ]);
    index += MAX_PARALLEL_POSTS;
  }
}
