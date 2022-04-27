import { inject } from "mobx-react";
import { Component, ReactNode } from "react";
import Controller from "../controllers/Todo";
import models from "../models";
import TodoViewModel from "../view-models/Todo";
@inject(models.type.TODO_MODEL)
export default class Todo extends Component<any> {
    private viewModel: TodoViewModel;
    constructor(props: any) {
        super(props);
        const model = props[models.type.TODO_MODEL];
        this.viewModel = new TodoViewModel(model);
    }
    render(): ReactNode {
        return <Controller viewModel={this.viewModel} />;
    }
}