export class Validator {
    static checkForTodos(projectInstance) {
        if(projectInstance.todos && projectInstance.todos.length > 0) {
            console.warn("Todo already exist in this porject");
            return true;
        }
    }
}