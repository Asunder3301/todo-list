export class Todo {
    constructor(title, description, dueDate,
        priority, notes, checklist) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = Number(priority);
            this.notes = notes;
            this.checklist = Boolean(checklist);
    }
}