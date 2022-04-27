import Client from "../../../api/client";
import { makeAutoObservable } from "mobx";
export interface Todo {
    id: string,
    title: string,
    description: string;
}
export class TodoModel {
    private state: Todo[] = [];
    private client: Client<Todo>;
    constructor() {
        makeAutoObservable(this);
        this.client = new Client("Todo");
    }
    public getAll() {
        if (process.env.REACT_APP_ENV === "mock") {
            this.state = [{ id: "1", title: "Todo 1", description: "Descript 1" },
            { id: "2", title: "Todo 2", description: "Descript 2" }];
            return;
        }

        this.client.getAll().then(todos => {
            this.state = todos;
        }).catch(err => {
            throw err;
        });

    }
    public get(id: string): Promise<Todo> {
        return new Promise((resolve, reject) => {
            if (process.env.REACT_APP_ENV === "mock") {
                return resolve(this.state.find(f => f.id === id) as Todo);
            }

            this.client.get({ id }).then(todo => {
                const _index = this.state.findIndex(f => f.id === todo.id);
                if (_index === -1) {

                    this.state = [...this.state, todo];
                }
                else {
                    this.state[_index] = todo;
                }
                resolve(todo);
            }).catch(err => {
                reject(err);
            });

        });
    }
    public add(todo: Todo): Promise<Todo> {
        return new Promise((resolve, reject) => {
            if (process.env.REACT_APP_ENV === "mock") {
                this.state = [...this.state, todo];
                return;
            }
            this.client.create({ request: todo }).then(todo => {

                this.state = [...this.state, todo];
                resolve(todo);
            }).catch(err => {
                reject(err);
            });
        });
    }
    public update(todo: Todo): Promise<Todo> {
        return new Promise((resolve, reject) => {
            if (process.env.REACT_APP_ENV === "mock") {
                const _index = this.state.findIndex(f => f.id === todo.id);
                // eslint-disable-next-line security/detect-object-injection
                this.state[_index] = todo;
                return resolve(todo);
            }
            this.client.update({ id: todo.id, request: todo }).then(resp => {
                const _index = this.state.findIndex(f => f.id === todo.id);
                // eslint-disable-next-line security/detect-object-injection
                this.state[_index] = resp;
                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        });
    }
    public delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (process.env.REACT_APP_ENV === "mock") {
                const _index = this.state.findIndex(f => f.id === id);
                // eslint-disable-next-line security/detect-object-injection
                this.state.slice(_index, 1);
                return resolve();
            }
            this.client.delete({ id }).then(() => {
                const _index = this.state.findIndex(f => f.id === id);
                this.state = this.state.slice(_index, 1);
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
    * Getter
    */
    public get todos() {
        return this.state;
    }

}