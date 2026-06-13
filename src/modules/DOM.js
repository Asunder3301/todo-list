export const handleDOM = (() => {
    const createProject = () => {
        const container = document.getElementById("project-container");
        const card = document.createElement("div");
        card.classList.add("project");

        container.prepend(card);        
    }

    return { createProject }
})();