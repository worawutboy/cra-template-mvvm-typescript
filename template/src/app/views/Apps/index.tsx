import { Fragment } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Todo from "../../providers/Todo";

const View = () => {
    return <Fragment>

        <HashRouter>
            <Routes>
                <Route path="/" element={<Todo />} />
            </Routes>
        </HashRouter>
    </Fragment>;
};
export default View;