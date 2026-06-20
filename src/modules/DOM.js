import svgString from '../assets/plus-icon.svg';
import trashIcon from '../assets/recycle-bin-svgrepo-com.svg';
import { FormParser } from './formParser.js';
import { TodoFactory } from './todoFactory.js';
import { Validator } from './validator.js';

class ProjectCardRenderer {
  static render(containerID, textContent, projectInstance, options = {}) {
    const container = document.getElementById(containerID);
    if (!container) throw new Error("Container not found");

    const projectCard = document.createElement("div");
    projectCard.classList.add(options.className || "project");
    projectCard.id = crypto.randomUUID();

    EventBinder.bindProjectClick(projectCard, projectInstance, containerID);

    const text = document.createElement("h3");
    text.textContent = textContent;
    projectCard.appendChild(text);
    container.prepend(projectCard);
  }

  static rerender(container, containerID, targetContainer, array) {
    if(container.id === containerID) {
      console.log("Cannot switch to the project page.");
      return;
    }

    ContentRemover.removeMainContent(targetContainer);
    container.id = containerID;
    container.appendChild(ProjectButtonRenderer.render());

    array.forEach(item => {
      this.render(containerID, item.name, item);
    })
  }
}

class TodoDialogRenderer {
  static render(projectInstance) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("dynamic-dialog");

    const title = document.createElement("h3");
    title.textContent = `Add Todo to ${projectInstance ? projectInstance.name : 'Project'}`;
    title.id = "todo-title";

    const form = document.createElement("form");
    form.method = "dialog";
    form.id = "todo-form";

    const todoBlocksContainer = document.createElement("div");
    todoBlocksContainer.id = "todo-blocks-container";
    form.appendChild(todoBlocksContainer);

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "button-container";

    const addTodoBtn = this.#createAddButton(todoBlocksContainer);
    buttonContainer.appendChild(addTodoBtn);

    const submitBtn = this.#createSubmitButton();
    buttonContainer.appendChild(submitBtn);

    form.appendChild(buttonContainer);
    dialog.appendChild(title);
    dialog.appendChild(form);
    
    form.addEventListener("submit", (e) => {
      e.preventDefault(); 
      this.#handleFormSubmission(form, projectInstance);
      this.#closeAndRemove(dialog);
    });

    document.body.appendChild(dialog);
    dialog.showModal();

    this.renderTodoFieldset(todoBlocksContainer);
  }

  static renderTodoFieldset(container) {
    const index = container.children.length;
    const fieldset = document.createElement("fieldset");
    fieldset.classList.add("todo-form-block");

    const legend = document.createElement("legend");
    legend.textContent = `Todo #${index + 1}`;
    fieldset.appendChild(legend);

    fieldset.appendChild(this.#createInputField("Title ", "text", `title-${index}`, `todos[${index}][title]`, true));
    fieldset.appendChild(this.#createTextAreaField("Description ", `description-${index}`, `todos[${index}][description]`));
    fieldset.appendChild(this.#createInputField("Due Date ", "date", `due-date-${index}`, `todos[${index}][due-date]`, true));
    fieldset.appendChild(this.#createSelectField("Priority ", `priority-${index}`, `todos[${index}][priority]`, ["Low", "Medium", "High"]));

    container.appendChild(fieldset);
  }

  static #handleFormSubmission(form, projectInstance) {
    const rawTodos = FormParser.extractTodoList(form);
    
    rawTodos.forEach(todoData => {
      const todoObj = TodoFactory.createFromData(todoData);
      if (projectInstance && typeof projectInstance.pushTodo === 'function') {
        projectInstance.pushTodo(todoObj);
      }
    });

    console.log(projectInstance);
  }

  static #createAddButton(targetContainer) {
    const btn = document.createElement("button");
    btn.id = "add-todo";
    btn.type = "button"; 

    const svg = document.createElement("img");
    svg.src = svgString;
    svg.width = 20;
    svg.height = 20;
    btn.appendChild(svg);

    EventBinder.bindAddBlockClick(btn, targetContainer, () => this.renderTodoFieldset(targetContainer));
    return btn;
  }

  static #createSubmitButton() {
    const btn = document.createElement("button");
    btn.id = "todo-submit";
    btn.type = "submit";
    btn.textContent = "Submit";
    return btn;
  }

  static #createInputField(labelText, type, id, name, isRequired = false) {
    const group = document.createElement("div");
    group.classList.add("form-group");
    
    const label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = id;
    
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = name;
    input.required = isRequired;

    group.appendChild(label);
    group.appendChild(input);
    return group;
  }

  static #createTextAreaField(labelText, id, name) {
    const group = document.createElement("div");
    group.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = id;

    const textarea = document.createElement("textarea");
    textarea.rows = 3;
    textarea.id = id;
    textarea.name = name;

    group.appendChild(label);
    group.appendChild(textarea);
    return group;
  }

  static #createSelectField(labelText, id, name, optionsArray) {
    const group = document.createElement("div");
    group.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = id;

    const select = document.createElement("select");
    select.required = true;
    select.id = id;
    select.name = name;

    optionsArray.forEach(level => {
      const opt = document.createElement("option");
      opt.value = level.toLowerCase();
      opt.textContent = level;
      select.appendChild(opt);
    });

    group.appendChild(label);
    group.appendChild(select);
    return group;
  }

  static #closeAndRemove(element) {
    element.close();
    element.remove();
  }
}

class ProjectContentRenderer {
  static render(projectInstance, containerID) {
    const container = document.getElementById(containerID);
    container.id = "todos-container";

    const header = document.createElement("div");
    header.id = "todo-header"

    header.appendChild(this.#createHeaderLabel("Title"));
    header.appendChild(this.#createHeaderLabel("Description"));
    header.appendChild(this.#createHeaderLabel("Due Date"));
    header.appendChild(this.#createHeaderLabel("Priority"));
    header.appendChild(this.#createHeaderLabel("Delete Todo"));

    container.appendChild(header);

    projectInstance.todos.forEach(todo => {
      container.appendChild(this.#createTodoGroup(todo, projectInstance)); 
    })
  }

  static #createHeaderLabel(text) {
    const label = document.createElement("h3");
    label.textContent = text;

    return label;
  }

  static #createTodoGroup(todo, projectInstance) {
    const group = document.createElement("div");
    group.classList.add("todo-group");

    group.appendChild(this.#createTodoElement("h4", "todo-title", todo.title));
    group.appendChild(this.#createTodoElement("p", "todo-description", todo.description));
    group.appendChild(this.#createTodoElement("p", "due-date", todo.dueDate));
    group.appendChild(this.#createTodoElement("p", "todo-priority", todo.priority));

    group.appendChild(this.#createDeleteButton(todo, group, projectInstance));

    return group;
  }

  static #createTodoElement(element, className, todoProperty) {
    const todoElement = document.createElement(element);
    todoElement.textContent = todoProperty;
    todoElement.classList.add(className);

    return todoElement;
  }

  static #createDeleteButton(todo, group, projectInstance) {
    const btn = document.createElement("button");
    btn.classList.add("remove-button");
    btn.type = "button";

    const svg = document.createElement("img");
    svg.src = trashIcon;
    svg.height = 30;
    svg.width = 30;
    btn.appendChild(svg);

    EventBinder.bindRemoveButtonClick(btn, todo, group, projectInstance);

    return btn;
  }
}

class ProjectButtonRenderer {
    static render() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "add-btn";
    btn.command = "show-modal";
    btn.setAttribute("commandfor", "create-project");

    const svg = document.createElement("img");
    svg.src = svgString;
    svg.width = 30;
    svg.height = 30;

    btn.appendChild(svg);
    
    return btn;
  }
}

class ContentRemover {
  static removeMainContent(containerID) {
    const container = document.getElementById(containerID);
    container.textContent = "";
  }

  static removeTodoGroup(group) {
    if (group) { group.remove(); }
  }
}

class EventBinder {
  static bindProjectClick(element, projectInstance, containerID) {
    if (!element) throw new Error("Target element missing.");

    element.addEventListener("click", () => {
      if (Validator.checkForTodos(projectInstance) === true) {
        ContentRemover.removeMainContent(containerID);
        ProjectContentRenderer.render(projectInstance, containerID);
        return; 
      }

      TodoDialogRenderer.render(projectInstance);
    });
  }

  static bindAddBlockClick(element, targetContainer, actionCallback) {
    if (!element) throw new Error("Target element missing.");
    element.addEventListener("click", actionCallback);
  }

  static bindRemoveButtonClick(element, todoInstance, group, projectInstance) {
    if(!element) throw new Error("Target element is missing");
    element.addEventListener("click", () => {
      projectInstance.removeTodo(todoInstance);
      ContentRemover.removeTodoGroup(group);
    });
  }
}

const DOMHandler = {
  getInputValue: FormParser.getInputValue,
};

const DOMRenderer = {
  createProjectCard: ProjectCardRenderer.render.bind(ProjectCardRenderer),
  rerenderProjects: ProjectCardRenderer.rerender.bind(ProjectCardRenderer),
};

export { DOMHandler, DOMRenderer };
