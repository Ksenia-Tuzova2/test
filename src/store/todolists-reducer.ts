import { FilterType, TodolistsType } from "../App";

import { AddTodoListAC } from "./tasks-reducer";

type ActionType =
  | ReturnType<typeof RemoveTodolistAC>
  | ReturnType<typeof ChangeTodoTitleAC>
  | ReturnType<typeof ChangeTodoFilterAC>
  | ReturnType<typeof AddTodoListAC>;


export const RemoveTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", id: id } as const;
}; 


export const ChangeTodoTitleAC = (title: string, id: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    id: id,
  } as const;
};

export const ChangeTodoFilterAC = (filter: FilterType, id: string) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: id,
    filter: filter,
  } as const;
};

const InitialState:Array<TodolistsType>=[];
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todoListReducer = (
  state: Array<TodolistsType>=InitialState,
  action: ActionType,
) :Array<TodolistsType>=> {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      const filtredTodos = state.filter((t) => t.id !== action.id);
      return filtredTodos;
    case "ADD-TODOLIST":
      const newTodo:TodolistsType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };
      return [...state, newTodo];

    case "CHANGE-TODOLIST-TITLE":
      const findedTodo = state.find((t) => t.id === action.id);
      if (findedTodo) {
        findedTodo.title = action.title;
        return [...state];
      } else return [...state];

    case "CHANGE-TODOLIST-FILTER":
      const todolist = state.find((t) => t.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
        return [...state];
      } else return [...state];

    default:
      return state;
  }
};
