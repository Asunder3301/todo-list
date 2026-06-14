export const handleDOM = (() => {
    const createDefualt = () => {
        const container = document.getElementById("project-container");
        const card = document.createElement("div");
        card.classList.add("project");

        const text = document.createElement("h3");
        text.textContent = "Default";
        card.appendChild(text);

        container.prepend(card);
    }

    const createProject = () => {
        const container = document.getElementById("project-container");
        const card = document.createElement("div");
        card.classList.add("project");

        const projectName = getProjectName();
        const text = document.createElement("h3");
        text.textContent = projectName;
        card.appendChild(text);

        container.prepend(card);        
    }

    const getProjectName = () => {
        const form = document.getElementById("project-form");
        const formData = new FormData(form);
        const name = Object.fromEntries(formData);

        return name['project-name'];
    }

    return { createDefualt, createProject }
})();