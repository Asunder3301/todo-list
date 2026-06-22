import "./styles.css";
import "./modern-normalize.css";
import { DOMHandler, DOMRenderer } from "./modules/DOM.js";
import { Project } from "./modules/project.js";
import { LocalStorage } from "./modules/localStorage.js";

let myProjects = [];

window.addEventListener("DOMContentLoaded", () => {
    //Get and render projects from local storage
    const localProjects = LocalStorage.getFromLocal("myProjects");

    if(localProjects && localProjects.length > 0) {
        myProjects = localProjects.map(projectData => {
            const  restoredProject = new Project(projectData.name);

            if(projectData.todos) {
                restoredProject.todos = projectData.todos;
            }
            
            return restoredProject;
        })

        // myProjects.push(...localProjects);
        myProjects.forEach(project => {
            DOMRenderer.createProjectCard("project-container", project.name, project);
        });
        return;
    }

    // Initialize default project if local storage is empty
    const defaultProject = new Project("Default");
    myProjects.push(defaultProject);
    DOMRenderer.createProjectCard("project-container", "Default", defaultProject);
    LocalStorage.addToLocal("myProjects", myProjects);
})

const viewProjects = document.getElementById("view-projects");
viewProjects.addEventListener("click", () => {
    const bodyChildren = document.body.children;
    const main = bodyChildren[1];
    DOMRenderer.rerenderProjects(main, "project-container", "todos-container", myProjects);
})

const form = document.getElementById("project-form");
const dialog = document.getElementById("create-project");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = DOMHandler.getInputValue(form, "project-name");
    const newProject = new Project(name);

    myProjects.push(newProject);

    LocalStorage.addToLocal("myProjects", myProjects);

    DOMRenderer.createProjectCard("project-container", name, newProject);

    form.reset();
    dialog.close();

    console.log(newProject);
    console.log(myProjects);
});
