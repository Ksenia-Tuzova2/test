import { useState } from "react";
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

import { AddItemForm } from "./AddItemForm";
import { TaskType, Todolist } from "./Todolist";

export type FilterType = "all" | "active" | "completed";
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todolistID1: string = v1();
  const todolistID2: string = v1();

  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    //записываем в переменную массив с тасками
    const todoListTasks = tasks[todolistId];
    //перезаписываем таски в с новым фильтром в старый массив
    tasks[todolistId] = todoListTasks.filter((t: any) => t.id !== id);
    //сетаем для перерисовки
    setTasks({ ...tasks });
  }

  function addTask(title: string, todolistId: string) {
    // создаем новую таску
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };

    //достаем нужные таски
    const currentTasks = tasks[todolistId];

    tasks[todolistId] = [newTask, ...currentTasks];

    setTasks({ ...tasks });
  }

  function changeTaskStatus(isDone: boolean, id: string, todolistId: string) {
    //достаем нужные таски
    const todoTasks = tasks[todolistId];

    //находим нужную таску
    const findedTask = todoTasks.find((t) => t.id === id);
    if (findedTask) {
      //меняем значение
      findedTask.isDone = isDone;
      //сетаем таску
      setTasks({ ...tasks });
    }
  }

  function changeTasksTitle(title: string, id: string, todolistId: string) {
    const todoTasks = tasks[todolistId];
    const findedTask = todoTasks.find((t) => t.id === id);

    if (findedTask) {
      findedTask.title = title;
      setTasks({ ...tasks });
    }
  }

  function changeFilter(value: FilterType, todolistId: string) {
    //находим нужный лист
    const todoList = todolists.find((t) => t.id === todolistId);
    if (todoList) {
      //перезатираем нужный фильтр в нужном листе
      todoList.filter = value;
      //перезаписываем массив тудулистов
      setTodolists([...todolists]);
    }
  }

  function removeTodoList(todolistId: string) {
    //находим фильтруем нужный лист,  сетаем
    setTodolists(todolists.filter((t) => t.id !== todolistId));

    //удаляем таски к листу и сетаем для перериса
    delete tasks[todolistId];
    setTasks({ ...tasks });
  }

  function addTodo(titile: string) {
    const newTodoId = v1();

    const newTodo: TodolistsType = {
      id: newTodoId,
      title: titile,
      filter: "all",
    };

    //пропихнем в массив тудушек
    setTodolists([newTodo, ...todolists]);
    //пропихнем в массив тасок
    setTasks({ ...tasks, [newTodoId]: [] });
  }

  function changeTodoTitle(title: string, todolistId: string) {
    const neededTodo = todolists.find((t) => t.id === todolistId);
    if (neededTodo) {
      neededTodo.title = title;
      setTodolists([...todolists]);
    }
  }

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

export default App;
