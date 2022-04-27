
import { observer } from "mobx-react";
import { useEffect } from "react";
import { ControllerProps } from "../@types/Todo";
import { Todo } from "../models/domain/todos/Todo";

import View from "../views/Todos";

const Controller = observer((props: ControllerProps) => {
    useEffect(() => {
        props.viewModel.getAll();
    }, []);
    const onAdd = (arg: Todo) => {
        props.viewModel.add(arg);
    };


    return <View todos={props.viewModel.Todos} onAdd={onAdd} />;

});
export default Controller;