const FormHandler = {
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

        const card = document.createElement("div");
        card.classList.add(options.className || "project");

        const text = document.createElement("h3");
        text.textContent = textContent;

        card.appendChild(text);
        container.prepend(card);
    }
}

export { FormHandler, DOMRenderer }