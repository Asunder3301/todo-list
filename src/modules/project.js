export class Project {
    todos = [];

    constructor(name) {
        this.name = name;
    }

    pushTodo(todo) {
        this.todos.push(todo);
    }
}