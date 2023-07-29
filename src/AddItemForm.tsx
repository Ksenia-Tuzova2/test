import { AddBox } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ChangeEvent, KeyboardEvent, useState } from 'react'


type PropsType = {
    addItem: (title: string,) => void
}

export function AddItemForm(props: PropsType) {

    let [inputValue, setInputValue] = useState('')
    let [err, setErr] = useState<string | null>(null)

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value)
    }

    function onClickAddItemHandler() {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim())
            setInputValue('')
        } else {
            setErr('error')
        }
    }

    function onKeyDownHandler(key: string) {
        setErr(null)
        if (key === 'Enter') {
            onClickAddItemHandler()
        }

    }

    return <div>
        <TextField
            label={"Title"}
            helperText={err}
            variant='outlined'
            value={inputValue}
            onChange={onChangeHandler}
            onKeyDown={(e) => onKeyDownHandler(e.key)}
            error={!!err}
        />


        <IconButton
            color='primary' onClick={onClickAddItemHandler}>
            <AddBox />
        </IconButton>

    </div>
}
