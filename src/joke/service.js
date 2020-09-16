/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
// /* eslint-disable require-jsdoc */

/* v.1 */
export default async function getJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await res.json();
  if (data.type === "general") {
    return data;
  } else {
    return fetch("http://api.icndb.com/jokes/random")
      .then((res) => res.json())
      .then((data) => data);
  }
}

/* v.2 */
// export default () => {
//   return fetch("https://official-joke-api.appspot.com/random_joke")
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.type === "programming") {
//         return data;
//       } else {
//         return fetch("http://api.icndb.com/jokes/random")
//           .then((res) => res.json())
//           .then((data) => data);
//       }
//     });
// };
