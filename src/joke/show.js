/* eslint-disable require-jsdoc */
import getJoke from "./service.js";

export default async function() {
  const data = await getJoke();
  if (data.setup) {
    alert(data.setup);
    alert(data.punchline);
  } else {
    alert(data.value.joke);
  }
}
