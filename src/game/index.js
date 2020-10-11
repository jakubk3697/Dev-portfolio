import TO_FIND from "./random.js";
import getNum from "./input.js";
import success from "./success.js";
import info from "./userInfo.js";
import count from "./count.js";

export default () => {
  alert("Wylosowano liczbę z przedziały 1-50. Zgaduj!");

  let num = getNum();
  let attempts = 0;

  while (num !== TO_FIND) {
    attempts++;
    info(num, TO_FIND);
    num = getNum();
  }

  success();
  count(attempts);
};
