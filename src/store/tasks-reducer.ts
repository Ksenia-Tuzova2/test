import { v1 } from "uuid"
import { FilterType, TasksStateType } from "../App"

type ActionType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof AddTodoListAC> |
    ReturnType<typeof RemoveTodolistAC>


export const AddTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    } as const
}
export const RemoveTodolistAC = (id: string) => {
    return { type: 'REMOVE-TODOLIST', id: id } as const
}

export const removeTaskAC = (taskId: string, todoId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todoId: todoId
    } as const
}

export const addTaskAC = (title: string, todoId: string) => {
    return {
        type: 'ADD-TASK',
        title: title,
        todoId: todoId
    } as const
}

export const changeTaskTitleAC = (title: string, id: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title: title,
        id: id,
        todolistId: todolistId
    } as const
}

export const changeTaskStatusAC = (isDone: boolean, id: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        isDone: isDone,
        id: id,
        todolistId: todolistId
    } as const
}


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return { ...state }

        case 'REMOVE-TASK':
            //записываем в переменную массив с тасками
            let todoListTasks = state[action.todoId]
            //перезаписываем таски в с новым фильтром в старый массив
            state[action.todoId] = todoListTasks.filter((t: any) => t.id !== action.taskId)
            //сетаем для перерисовки
            return { ...state }
        case 'CHANGE-TASK-STATUS':
            let todoTasks = state[action.todolistId]
            //находим нужную таску
            let findedTask = todoTasks.find((t) => t.id === action.id)
            if (findedTask) {
                //меняем значение 
                findedTask.isDone = action.isDone
                //сетаем таску
                return { ...state }
            } else return { ...state }
        case 'CHANGE-TASK-TITLE':
            let tasksFromTodo = state[action.todolistId]
            let findeTask = tasksFromTodo.find((t) => t.id === action.id)

            if (findeTask) {
                findeTask.title = action.title
                return { ...state }
            } else return { ...state }
        case 'ADD-TASK':
            let newTask = {
                id: v1(),
                title: action.title,
                isDone: false,
            }

            //достаем нужные таски 
            let currentTasks = state[action.todoId]
            state[action.todoId] = [newTask, ...currentTasks]
            return { ...state }

        case 'ADD-TODOLIST':
            if(action.title){
                let newArr:TasksStateType={[v1()]: []}
                return {  ...state, ...newArr }
            }else return { ...state }

        default:
            throw new Error('I don\'t understand this type')
    }
}


