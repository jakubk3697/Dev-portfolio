// /* eslint-disable require-jsdoc */
export default () => {
  return fetch("https://official-joke-api.appspot.com/random_joke")
    .then((res) => res.json())
    .then((data) => {
      if (data.type === "programming") {
        return data;
      }
      return fetch("http://api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe")
        .then((res) => res.json())
        .then((data) => data.value.joke);
    });
};
