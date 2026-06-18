import "./styles.css";
import "./modern-normalize.css";
import { DOMHandler, DOMRenderer } from "./modules/DOM.js";
import { Project } from "./modules/project.js";

const myProjects = [];

// Initialize default data structure configuration
const defaultProject = new Project("Default");
DOMRenderer.createProjectCard("project-container", "Default", defaultProject);
myProjects.push(defaultProject);

const form = document.getElementById("project-form");
const dialog = document.getElementById("create-project");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = DOMHandler.getInputValue(form, "project-name");
    const newProject = new Project(name);
    
    DOMRenderer.createProjectCard("project-container", name, newProject);
    myProjects.push(newProject);

    form.reset();
    dialog.close();

    console.log(newProject);
    console.log(myProjects);
});
