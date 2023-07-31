import { ChangeEvent} from "react";
import { v1 } from "uuid";
import { Delete } from "@mui/icons-material";
import { Button, Grid, IconButton, Paper } from "@mui/material";

import Checkbox from "@mui/material/Checkbox";

import { FilterType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  changeTodoTitle: (title: string, todolistId: string) => void;
  changeTasksTitle: (title: string, id: string, todolistId: string) => void;
  removeTodoList: (todolistId: string) => void;
  todoListId: string;
  filter: FilterType;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (isDone: boolean, id: string, todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  function AddTaskHandler(title: string) {
    props.addTask(title.trim(), props.todoListId);
  }

  function changeFilterHandler(filter: FilterType) {
    props.changeFilter(filter, props.todoListId);
  }

  function changeTodoTitleHandler(title: string) {
    props.changeTodoTitle(title, props.todoListId);
  }

  return (
    <Grid container spacing={3}>
      <Paper style={{ padding: "30px", margin: "0 30px 0 0" }}>
        <h3>
          <EditableSpan title={props.title} onChange={changeTodoTitleHandler} />
        </h3>
        <IconButton>
          <Delete onClick={() => props.removeTodoList(props.todoListId)} />
        </IconButton>
        <AddItemForm addItem={AddTaskHandler} />
        <div>
          {props.tasks.map((t) => {
            function removeTaskHandler(id: string) {
              props.removeTask(id, props.todoListId);
            }

            function changeTaskStatusHandler(e: ChangeEvent<HTMLInputElement>) {
              const newIsDoneValue = e.currentTarget.checked;
              props.changeTaskStatus(newIsDoneValue, t.id, props.todoListId);
            }

            function onChangeEditableSpan(newTitle: string) {
              props.changeTasksTitle(newTitle, t.id, props.todoListId);
            }

            return (
              <div key={v1()} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                  checked={t.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <EditableSpan title={t.title} onChange={onChangeEditableSpan} />
                <IconButton>
                  <Delete
                    onClick={() => {
                      removeTaskHandler(t.id);
                    }}
                  />
                </IconButton>
              </div>
            );
          })}
        </div>
        <div>
          <Button
            color="secondary"
            variant={props.filter === "all" ? "outlined" : "text"}
            onClick={() => changeFilterHandler("all")}
          >
            All
          </Button>
          <Button
            variant={props.filter === "active" ? "outlined" : "text"}
            onClick={() => changeFilterHandler("active")}
          >
            Active
          </Button>
          <Button
            variant={props.filter === "completed" ? "outlined" : "text"}
            onClick={() => changeFilterHandler("completed")}
          >
            Completed
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}
