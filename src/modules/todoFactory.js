import { Todo } from './todo.js';

export class TodoFactory {
  static createFromData(todoData) {
    return new Todo(
      todoData.title,
      todoData.description,
      todoData['due-date'],
      todoData.priority
    );
  }
}
