import React, { useState } from 'react';

import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';


export type FilterType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     { id: v1(), title: 'What to learn', filter: 'all' },
    //     { id: v1(), title: 'What to buy', filter: 'all' },
    // ]
    // )


    // let [tasks, setTasks] = useState([
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false }
    // ])

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })



    function removeTask(id: string, todolistId: string) {
        //записываем в переменную массив с тасками
        let todoListTasks = tasks[todolistId]
        //перезаписываем таски в с новым фильтром в старый массив
        tasks[todolistId] = todoListTasks.filter((t: any) => t.id !== id)
        //сетаем для перерисовки
        setTasks({ ...tasks })
    }

    function addTask(title: string, todolistId: string) {
        // создаем новую таску 
        let newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }

        //достаем нужные таски 
        let currentTasks = tasks[todolistId]

        tasks[todolistId] = [newTask, ...currentTasks]

        setTasks({ ...tasks })
    }

    function changeTaskStatus(isDone: boolean, id: string, todolistId: string) {
        //достаем нужные таски 
        let todoTasks = tasks[todolistId]

        //находим нужную таску
        let findedTask = todoTasks.find((t) => t.id === id)
        if (findedTask) {
            //меняем значение 
            findedTask.isDone = isDone
            //сетаем таску
            setTasks({ ...tasks })
        }
    }


    function changeFilter(value: FilterType, todolistId: string) {
        //находим нужный лист 
        let todoList = todolists.find((t) => t.id === todolistId)
        if (todoList) {
            //перезатираем нужный фильтр в нужном листе
            todoList.filter = value
            //перезаписываем массив тудулистов
            setTodolists([...todolists])
        }
    }

    function removeTodoList(todolistId: string) {
        //находим фильтруем нужный лист,  сетаем 
        setTodolists(todolists.filter(t => t.id !== todolistId))

        //удаляем таски к листу и сетаем для перериса
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    function addTodo(titile: string) {
        let newTodoId = v1()

        let newTodo: TodolistsType = {
            id: newTodoId,
            title: titile,
            filter: 'all'
        }

        //пропихнем в массив тудушек 
        setTodolists([newTodo, ...todolists])
        //пропихнем в массив тасок 
        setTasks({ ...tasks, [newTodoId]: [] })

    }

    return (
        <div className="App">
            <AddItemForm
                addItem={addTodo} />
            {
                todolists.map((t) => {
                    //здесь будем хранить отфильтрованные приколы
                    let tasksForTodo = tasks[t.id]

                    if (t.filter === 'active') {
                        tasksForTodo = tasksForTodo.filter((t) => t.isDone === false)
                    }

                    if (t.filter === 'completed') {
                        tasksForTodo = tasksForTodo.filter((t) => t.isDone === true)
                    }



                    return (
                        <Todolist
                            removeTodoList={removeTodoList}
                            title={t.title}
                            filter={t.filter}
                            tasks={tasksForTodo}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            todoListId={t.id} />
                    )
                })
            }

        </div>
    );
}

export default App;
