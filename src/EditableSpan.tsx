import TextField from "@mui/material/TextField";
import React, { ChangeEvent, useState } from "react";


type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: PropsType) {

    //сделать эдитбл спан как и аэайтемформ с проверкой на пустую строку
    const [err, setErr] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title);

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);

    }

    function activateEditMode() {
        setEditMode(true);

    }

    function activateViewMode() {
        setEditMode(false);

        props.onChange(title);
    }

    return editMode ?
        <TextField
            label={"Title"}
            helperText={err}
            error={!!err}
            variant='outlined'
            value={title}
            autoFocus
            onChange={onChangeHandler}
            onBlur={() => activateViewMode()} /> :
        <span onDoubleClick={() => activateEditMode()}>{props.title}</span>;

}
