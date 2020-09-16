// /* eslint-disable require-jsdoc */
export default () => {
  return fetch("https://official-joke-api.appspot.com/random_joke")
    .then((res) => res.json())
    .then((data) => {
      if (data.type === "programming") {
        return data;
      } else {
        return fetch("http://api.icndb.com/jokes/random")
          .then((res) => res.json())
          .then((data) => data);
      }
    });
};
