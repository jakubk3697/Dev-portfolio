import { BlogPost } from "./component.js";
import { Header } from "./component.js";

export default () => {
  customElements.define("blog-header", Header);
  customElements.define("blog-post", BlogPost);
};
