import "./styles.css";
import "./modern-normalize.css";
import { handleDOM } from "./modules/DOM.js";

handleDOM.createDefualt();

const form = document.getElementById("project-form");
const dialog = document.getElementById("create-project");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleDOM.createProject();
    form.reset();
    dialog.close();
});