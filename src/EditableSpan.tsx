import React, { ChangeEvent, useState } from 'react'


type PropsType = {
    title: string
    onChange:(newTitle:string)=>void
   }

export function EditableSpan(props: PropsType) {

let [editMode, setEditMode]=useState(false)
let [title, setTitle] = useState(props.title)

function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value)
}

function activateEditMode(){
    setEditMode(true)
    props.onChange(title)
}

function activateViewMode(){
    setEditMode(false)
}

    return editMode?
        <input
         value={title}
        autoFocus
        onChange={(e)=>onChangeHandler(e)}
         onBlur={()=>activateViewMode()}/>:
        <span onDoubleClick={()=>activateEditMode()}>{props.title}</span>
    
}
