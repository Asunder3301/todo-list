const DOMHandler = {
    getInputValue(formElement, inputName) {
        if(!formElement) { return "Error: Form element not be found." };
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);

        return data[inputName] || "";
    }
}

const DOMRenderer = {
    createProjectCard(containerID, textContent, options = {}) {
        const container = document.getElementById(containerID);
        if(!container) { return "Error: Container not found" };

        const projectCard = document.createElement("div");
        projectCard.classList.add(options.className || "project");
        projectCard.id = crypto.randomUUID();

        AddListeners.addProjectListner(projectCard);

        const text = document.createElement("h3");
        text.textContent = textContent;

        projectCard.appendChild(text);
        container.prepend(projectCard);
    }
}

const AddListeners = {
    addProjectListner(element) {
        if (!element) { return "Error: Element not found."};
        element.addEventListener("click", () => {
            alert(`Clicked: ${element.id}`);
        })
    }
}

export { DOMHandler, DOMRenderer }