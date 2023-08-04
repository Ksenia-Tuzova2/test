import "./null.css";
import { v1 } from "uuid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";

import { AddItemForm } from "./AddItemForm";
import { TaskType, Todolist } from "./Todolist";
import {
  AddTodoListAC,
  RemoveTodolistAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./store/tasks-reducer";
import {
  ChangeTodoFilterAC,
  ChangeTodoTitleAC,
} from "./store/todolists-reducer";

import { AppRootStateType } from "./store/store";

export type FilterType = "all" | "active" | "completed";
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  // const todolistID1: string = v1();
  // const todolistID2: string = v1();

  // const [todolists, dispatchToTodoLists] = useReducer(todoListReducer, [
  //   { id: todolistID1, title: "What to learn", filter: "all" },
  //   { id: todolistID2, title: "What to buy", filter: "all" },
  // ]);

  // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
  //   [todolistID1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //   ],
  //   [todolistID2]: [
  //     { id: v1(), title: "Rest API", isDone: true },
  //     { id: v1(), title: "GraphQL", isDone: false },
  //   ],
  // });

  const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(
    (state) => state.todolists,
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks,
  );

  const dispatch = useDispatch();

  const removeTask=useCallback((id: string, todolistId: string) =>{
    const action = removeTaskAC(id, todolistId);
    dispatch(action);},
    [],
  );

  const addTask=useCallback((title: string, todolistId: string)=> {
    const action = addTaskAC(title, todolistId);
    dispatch(action);
  },[]);

  const changeTaskStatus=useCallback(
    (isDone: boolean, id: string, todolistId: string)=> {
    const action = changeTaskStatusAC(isDone, id, todolistId);
    dispatch(action);
  },[]);

  const changeTasksTitle=useCallback(
    (title: string, id: string, todolistId: string)=> {
    const action = changeTaskTitleAC(title, id, todolistId);
    dispatch(action);
  },[]);

  const changeFilter=useCallback(
    (value: FilterType, todolistId: string) =>{
    const action = ChangeTodoFilterAC(value, todolistId);
    dispatch(action);
  },[]);

  const removeTodoList=useCallback((todolistId: string)=> {
    const action = RemoveTodolistAC(todolistId);
    dispatch(action);
  },[]);

  const addTodo=useCallback((title: string)=> {
    console.log("a");
    const action = AddTodoListAC(title);
    //пропихнем в массив тудушек и в массив тасок
    dispatch(action);
  },[]);

  const changeTodoTitle=useCallback((title: string, todolistId: string)=> {
    const action = ChangeTodoTitleAC(title, todolistId);
    dispatch(action);
  },[]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="app__container-foe-view-part">
        <Container fixed>
          <Grid container style={{ padding: "30px" }}>
            <AddItemForm addItem={addTodo} />
          </Grid>
          <Grid container>
            {todolists.map((t) => {
              //здесь будем хранить отфильтрованные приколы
              let tasksForTodo = tasks[t.id];

              if (t.filter === "active") {
                tasksForTodo = tasksForTodo.filter((t) => t.isDone === false);
              }

              if (t.filter === "completed") {
                tasksForTodo = tasksForTodo.filter((t) => t.isDone === true);
              }

              return (
                <div key={v1()} className="">
                  <Todolist
                    changeTodoTitle={changeTodoTitle}
                    changeTasksTitle={changeTasksTitle}
                    removeTodoList={removeTodoList}
                    title={t.title}
                    filter={t.filter}
                    tasks={tasksForTodo}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    todoListId={t.id}
                  />
                </div>
              );
            })}
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default AppWithRedux;
