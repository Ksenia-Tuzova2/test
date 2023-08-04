import React, { useCallback, useMemo } from "react";
import { AddBox } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";


type PropsType = {
    addItem: (title: string,) => void
}

export const AddItemForm=React.memo((props: PropsType)=> {

    console.log("AddItem called");
    const [inputValue, setInputValue] = useState("");
    const [err, setErr] = useState<string | null>(null);

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value);
    }

    const onClickAddItemHandler=useCallback(()=> {
        if(err !== null) {
            setErr("error");
        }
        if (inputValue.trim() !== "") {
            props.addItem(inputValue.trim());
            setInputValue("");
        } 
    },[err, inputValue, props]);

    function onKeyDownHandler(key: string) {
        if(err !== null) {
            setErr("error");
        }
        if (key === "Enter") {
            onClickAddItemHandler();
        }

    }
    const addBox = useMemo(()=><AddBox />,[]);

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


        {
        useMemo(()=><IconButton
            color='primary' onClick={onClickAddItemHandler}>
            {addBox}
        </IconButton>,[addBox, onClickAddItemHandler])
        }

    </div>;
},
);