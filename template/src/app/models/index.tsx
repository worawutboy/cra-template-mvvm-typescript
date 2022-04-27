import { TodoModel } from "./domain/todos/Todo";

export default class Store {
    static type = {
        TODO_MODEL: 'todo',
    };
    private todoModel: TodoModel;
    constructor() {
        this.todoModel = new TodoModel();
    }
    public getStores = () => ({ [Store.type.TODO_MODEL]: this.todoModel });
}