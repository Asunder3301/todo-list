import "./styles.css";
import "./modern-normalize.css";
import { FormHandler, DOMRenderer } from "./modules/DOM.js";

DOMRenderer.createProjectCard("project-container", "Defualt");

const form = document.getElementById("project-form");
const dialog = document.getElementById("create-project");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = FormHandler.getInputValue(form, "project-name");
    DOMRenderer.createProjectCard("project-container", name);
    
    form.reset();
    dialog.close();
});