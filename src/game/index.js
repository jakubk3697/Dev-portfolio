import TO_FIND from "./random";
import getNum from "./input";
import success from "./success";
import info from "./userInfo";
import count from "./count";

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
