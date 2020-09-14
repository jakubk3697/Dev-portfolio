import { TOO_LESS, TOO_MUCH } from "./constants.js";

export default (num, expected) => {
  if (num > expected) {
    alert(TOO_MUCH);
  } else {
    alert(TOO_LESS);
  }
};
