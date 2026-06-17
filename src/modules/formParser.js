export class FormParser {
  static getInputValue(formElement, inputName) {
    if (!formElement) throw new Error("Form element not found.");
    const formData = new FormData(formElement);
    return formData.get(inputName) || "";
  }

  static extractTodoList(formElement) {
    if (!formElement) throw new Error("Form element not found.");
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    const todos = [];

    Object.keys(data).forEach(key => {
      const match = key.match(/^todos\[(\d+)\]\[(.+)\]$/);
      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];

        if (!todos[index]) {
          todos[index] = {};
        }
        todos[index][field] = data[key];
      }
    });

    return todos.filter(item => item !== undefined);
  }
}
