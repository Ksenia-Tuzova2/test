import { ChangeEvent, KeyboardEvent, useState } from 'react'


type PropsType = {
    addItem: (title: string, ) => void
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
        <input
            value={inputValue}
            onChange={(e) => onChangeHandler(e)}
            onKeyDown={(e) => onKeyDownHandler(e.key)}
            className={`${err ? 'error' : ''}`}
        />
        <button onClick={() => onClickAddItemHandler()}>+</button>
        {err && <span className='error-message'>{err}</span>}
    </div>
}
