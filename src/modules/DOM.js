import svgString from "../assets/plus-icon.svg"

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
    },

    createProjectDialog(options = {}) {
        const dialog = document.createElement("dialog");
        dialog.classList.add(options.className || "dynamic-dialog");
        dialog.closedBy = "none";

        DOMRenderer.createTodoForm(dialog, "Add Todo");
        
        document.body.appendChild(dialog);
        dialog.showModal();
    },

    createTodoForm(container, formTitle) {
        const form = document.createElement("form");
        form.method = "dialog";
        form.id = "todo-form";

        const title = document.createElement("legend");
        title.textContent = formTitle;
        form.appendChild(title);

        const titleGroup = document.createElement("div");
        titleGroup.classList.add("form-group");

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        titleLabel.htmlFor = "title";
        titleGroup.appendChild(titleLabel);

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.required = true;
        titleInput.id = "title";
        titleInput.name = "title";
        titleGroup.appendChild(titleInput);

        const descGroup = document.createElement("div");
        descGroup.classList.add("form-group");

        const descLabel = document.createElement("label");
        descLabel.textContent = "Description";
        descLabel.htmlFor = "description";
        descGroup.appendChild(descLabel);

        const descInput = document.createElement("textarea");
        descInput.rows = "5";
        descInput.id = "description";
        descInput.name = "description";
        descGroup.appendChild(descInput);

        const dateGroup = document.createElement("div");
        dateGroup.classList.add("form-group");

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Due Date";
        dateLabel.htmlFor = "due-date";
        dateGroup.appendChild(dateLabel);

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.required = true;
        dateInput.id = "due-date";
        dateInput.name = "due-date";
        dateGroup.appendChild(dateInput);

        const priorityGroup = document.createElement("div");
        priorityGroup.classList.add("form-group");

        const priorityLabel = document.createElement("label");
        priorityLabel.textContent = "Priority";
        priorityLabel.htmlFor = "priority";
        priorityGroup.appendChild(priorityLabel);

        const dropdown = document.createElement("select");
        dropdown.required = true;
        dropdown.id = "priority";
        dropdown.name = "priority";
        priorityGroup.appendChild(dropdown);

        const addTodo = document.createElement("button");
        addTodo.id = "add-todo";
        addTodo.type = "button";

        const svg = document.createElement("img");
        svg.src = svgString;
        svg.width = "20";
        svg.height = "20";
        addTodo.appendChild(svg);

        const submit = document.createElement("button");
        submit.id = "todo-submit";
        submit.type = "submit";
        submit.textContent = "Submit"

        form.appendChild(titleGroup);
        form.appendChild(descGroup);
        form.appendChild(dateGroup);
        form.appendChild(priorityGroup)
        form.appendChild(addTodo);
        form.appendChild(submit);

        container.appendChild(form);
    }
}

const AddListeners = {
    addProjectListner(element) {
        if (!element) { return "Error: Element not found."};
        element.addEventListener("click", DOMRenderer.createProjectDialog);
    }
}

const handleDialog = {
    closeAndRemove(element) {
        element.close();
        element.remove();
    }
}

export { DOMHandler, DOMRenderer }