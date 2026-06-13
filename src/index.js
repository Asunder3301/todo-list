import "./styles.css";
import "./modern-normalize.css";
import { handleDOM } from "./modules/DOM.js";

handleDOM.createProject();

const button = document.getElementById("add-btn");
button.addEventListener("click", handleDOM.createProject);