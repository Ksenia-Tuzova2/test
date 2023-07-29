import { v1 } from "uuid"
import { FilterType, TodolistsType } from "../App"

type ActionType = ReturnType<typeof RemoveTodolistAC> | ReturnType<typeof ChangeTodoTitleAC> | ReturnType<typeof ChangeTodoFilterAC> |ReturnType<typeof AddTodoListAC>


export const RemoveTodolistAC = (id: string) => {
    return { type: 'REMOVE-TODOLIST', id: id } as const
}

export const AddTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    } as const
}

export const ChangeTodoTitleAC = (title: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: id
    } as const
}

export const ChangeTodoFilterAC = (filter: FilterType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    } as const
}


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todoListReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let filtredTodos = state.filter((t) => t.id !== action.id)
            return filtredTodos
        case 'ADD-TODOLIST':
            let newTodo = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodo]

        case 'CHANGE-TODOLIST-TITLE':

            let findedTodo = state.find((t) => t.id === action.id)
            if (findedTodo) {
                findedTodo.title = action.title
                return [...state]
            } else return [...state]

        case 'CHANGE-TODOLIST-FILTER':

            let todolist = state.find((t) => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
                return [...state]
            } else return [...state]

        default:
            throw new Error('I don\'t understand this type')
    }
}


