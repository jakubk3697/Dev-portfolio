import { Header, Navigation, BlogPost } from "./component.js";

export default () => {
  customElements.define("blog-header", Header);
  customElements.define("blog-nav", Navigation);
  customElements.define("blog-post", BlogPost);
};
