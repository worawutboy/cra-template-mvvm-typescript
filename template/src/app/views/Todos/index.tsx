import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { ViewProps } from "../../@types/Todo";

const TodoView = (props: ViewProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return <Box style={{ padding: 10 }} >
        <Grid container direction={"column"} spacing={2}>
            <Grid item>

                <TextField label="Title" onChange={(e) => {
                    setTitle(e.target.value);
                }} />
            </Grid>
            <Grid item>
                <TextField label="Description" type="text" onChange={(e) => {
                    setDescription(e.target.value);
                }} />
            </Grid>
            <Grid item>
                <Button onClick={() => {
                    props.onAdd({ id: `${props.todos.length + 1}`, title, description });
                }}>Add</Button>
            </Grid>
        </Grid>
        <ul>
            {props.todos.map(m => {
                return <li key={m.id} >{m.title}-{m.description}</li>;
            })}
        </ul>
    </Box>;
};
export default TodoView;