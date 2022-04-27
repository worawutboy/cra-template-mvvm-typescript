import { Todo } from "../models/domain/todos/Todo";
import TodoViewModel from "../view-models/Todo";

export interface ViewProps {
    todos: Todo[];
    onAdd: (arg: Todo) => void;
}
export interface ControllerProps {
    viewModel: TodoViewModel;
}