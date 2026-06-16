import svgString from '../assets/plus-icon.svg';

const DOMHandler = {
  getInputValue(formElement, inputName) {
    if (!formElement) return new Error("Form element not found.");
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    return data[inputName] || "";
  }
};

const DOMRenderer = {
  createProjectCard(containerID, textContent, options = {}) {
    const container = document.getElementById(containerID);
    if (!container) return new Error("Container not found");

    const projectCard = document.createElement("div");
    projectCard.classList.add(options.className || "project");
    projectCard.id = crypto.randomUUID();
    
    AddListeners.addProjectListner(projectCard);

    const text = document.createElement("h3");
    text.textContent = textContent;
    projectCard.appendChild(text);
    container.prepend(projectCard);
  },

  createProjectDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dynamic-dialog");
    dialog.closedBy = "none";

    const title = document.createElement("h3");
    title.textContent = "Add Todo";
    title.id = "todo-title";

    //Create a parent form that wraps the entire content
    const form = document.createElement("form");
    form.method = "dialog";
    form.id = "todo-form";

    //Container to hold all dynamically added todo fieldsets
    const todoBlocksContainer = document.createElement("div");
    todoBlocksContainer.id = "todo-blocks-container";
    form.appendChild(todoBlocksContainer);

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "button-container";

    const addTodo = document.createElement("button");
    addTodo.id = "add-todo";
    addTodo.type = "button"; 

    const svg = document.createElement("img");
    svg.src = svgString;
    svg.width = 20;
    svg.height = 20;
    addTodo.appendChild(svg);

    AddListeners.addTodoListener(addTodo, todoBlocksContainer);

    buttonContainer.appendChild(addTodo);

    const submit = document.createElement("button");
    submit.id = "todo-submit";
    submit.type = "submit";
    submit.textContent = "Submit";
    buttonContainer.appendChild(submit);

    form.appendChild(buttonContainer);
    dialog.appendChild(title);
    dialog.appendChild(form);
    
    document.body.appendChild(dialog);
    dialog.showModal();

    // Automatically add the first todo form block
    DOMRenderer.createTodoField(todoBlocksContainer);
  },

  createTodoField(container) {
    const index = container.children.length;

    const fieldset = document.createElement("fieldset");
    fieldset.classList.add("todo-form-block");

    const legend = document.createElement("legend");
    legend.textContent = `Todo #${index + 1}`;
    fieldset.appendChild(legend);

    // Title Field
    const titleGroup = document.createElement("div");
    titleGroup.classList.add("form-group");
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title ";
    titleLabel.htmlFor = `title-${index}`;
    titleGroup.appendChild(titleLabel);
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.required = true;
    titleInput.id = `title-${index}`;
    titleInput.name = `todos[${index}][title]`;
    titleGroup.appendChild(titleInput);
    fieldset.appendChild(titleGroup);

    // Description Field
    const descGroup = document.createElement("div");
    descGroup.classList.add("form-group");
    const descLabel = document.createElement("label");
    descLabel.textContent = "Description ";
    descLabel.htmlFor = `description-${index}`;
    descGroup.appendChild(descLabel);
    const descInput = document.createElement("textarea");
    descInput.rows = 3;
    descInput.id = `description-${index}`;
    descInput.name = `todos[${index}][description]`;
    descGroup.appendChild(descInput);
    fieldset.appendChild(descGroup);

    // Date Field
    const dateGroup = document.createElement("div");
    dateGroup.classList.add("form-group");
    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Due Date ";
    dateLabel.htmlFor = `due-date-${index}`;
    dateGroup.appendChild(dateLabel);
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.required = true;
    dateInput.id = `due-date-${index}`;
    dateInput.name = `todos[${index}][due-date]`;
    dateGroup.appendChild(dateInput);
    fieldset.appendChild(dateGroup);

    // Priority Field
    const priorityGroup = document.createElement("div");
    priorityGroup.classList.add("form-group");
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority ";
    priorityLabel.htmlFor = `priority-${index}`;
    priorityGroup.appendChild(priorityLabel);
    const dropdown = document.createElement("select");
    dropdown.required = true;
    dropdown.id = `priority-${index}`;
    dropdown.name = `todos[${index}][priority]`;
    
    // Quick boilerplate options for select
    ["Low", "Medium", "High"].forEach(level => {
      const opt = document.createElement("option");
      opt.value = level.toLowerCase();
      opt.textContent = level;
      dropdown.appendChild(opt);
    });

    priorityGroup.appendChild(dropdown);
    fieldset.appendChild(priorityGroup);

    container.appendChild(fieldset);
  }
};

const AddListeners = {
  addProjectListner(element) {
    if (!element) return new Error("Element not found.");
    element.addEventListener("click", DOMRenderer.createProjectDialog);
  },

  addTodoListener(element, targetContainer) {
    if (!element) return new Error("Element not found.");
    element.addEventListener("click", () => {
      DOMRenderer.createTodoField(targetContainer);
    });
  }
};

const handleDialog = {
  closeAndRemove(element) {
    element.close();
    element.remove();
  }
};

export { DOMHandler, DOMRenderer };
