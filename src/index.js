import "./index.css";
import tabNav from "./tabNav.js";
import { mainContainer } from "./main.js";

(() => {
  const main = document.createElement("div");
  main.id = "main";

  main.appendChild(tabNav);
  main.appendChild(mainContainer);

  document.querySelector("body").appendChild(main);
})();
