export class Project {
    todos = [];

    constructor(name) {
        this.name = name;
    }

    pushTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoInstance) {
        this.todos = this.todos.filter(todo => todo.title !== todoInstance.title);
        console.log(this.todos);
    }
}