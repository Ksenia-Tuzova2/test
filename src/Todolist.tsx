import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { v1 } from 'uuid'
import { FilterType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    removeTodoList: (todolistId: string) => void,
    todoListId: string,
    filter: FilterType
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (isDone: boolean, id: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {


    function AddTaskHandler(title: string) {
        props.addTask(title.trim(), props.todoListId)
    }


    function changeFilterHandler(filter: FilterType) {
        props.changeFilter(filter, props.todoListId)
    }

    function onChangeEditableSpan(newTitle:string){

    }

    return <div>
        <h3>{props.title}</h3>
        <button onClick={() => props.removeTodoList(props.todoListId)}>✖️</button>
        < AddItemForm
            addItem={AddTaskHandler} />
        <ul>

            {props.tasks.map((t) => {

                function removeTaskHandler(id: string) {
                    props.removeTask(id, props.todoListId)
                }
                function changeTaskStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeTaskStatus(newIsDoneValue, t.id, props.todoListId)
                }

                return (<li key={v1()}
                    className={t.isDone ? 'is-done' : ''}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={(e) => changeTaskStatusHandler(e)} />
                    <EditableSpan title={t.title} 
                    onChange={onChangeEditableSpan } />
                    <button onClick={() => { removeTaskHandler(t.id) }}>✖️</button>
                </li>)
            })}
        </ul>
        <div>
            <button
                className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={() => changeFilterHandler('all')}>All</button>
            <button
                className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={() => changeFilterHandler('active')}>Active</button>
            <button
                className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={() => changeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}
