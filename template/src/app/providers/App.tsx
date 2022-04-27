import { inject } from "mobx-react";
import { Component, ReactNode } from "react";
import Controller from "../controllers/App";

@inject()
export default class App extends Component {

    render(): ReactNode {
        return <Controller />;
    }
}