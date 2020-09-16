/* eslint-disable require-jsdoc */
import getJoke from "./service.js";

export default () => {
  getJoke().then((data) => {
    if (data.setup) {
      alert(data.setup);
      alert(data.punchline);
    } else {
      alert(data);
    }
  });
};
