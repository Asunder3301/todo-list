import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export class Todo {
    constructor(title, description, dueDate, priority) {
            this.title = title;
            this.description = description;
            this.dueDate = format(new Date(dueDate), 'MMM-dd-yyyy', { locale: enUS });
            this.priority = priority;
    }
}