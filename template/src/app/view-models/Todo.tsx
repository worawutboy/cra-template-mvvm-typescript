import { Todo, TodoModel } from "../models/domain/todos/Todo";

export default class TodoViewModel {
    private model: TodoModel;
    constructor(_model: TodoModel) {
        this.model = _model;
    }
    public getAll() {
        return this.model.getAll();
    }
    public get(id: string): Promise<Todo> {
        return this.model.get(id);
    }
    public add(request: Todo): Promise<Todo> {
        return this.model.add(request);
    }
    public update(request: Todo): Promise<Todo> {
        return this.model.update(request);
    }
    public delete(id: string): Promise<void> {
        return this.model.delete(id);
    }
    public get Todos() {
        return this.model.todos;
    }
}