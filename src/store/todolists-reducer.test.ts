import { v1 } from "uuid";

import { FilterType } from "../App";

import { todoListReducer } from "./todolists-reducer";


type TodolistsType = {
    id: string;
    title: string;
    filter: FilterType;
}
 let todolistId1:string ;
let  todolistId2:string ;

let startState: Array<TodolistsType>; 

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ];
});



test("correct todolist should be removed", () => {
  
    const endState = todoListReducer(startState,
         {type: "REMOVE-TODOLIST" as const, id: todolistId1});

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test("correct todolist should be added", () => {


    const newTodolistTitle = "New Todolist";


    const endState = todoListReducer(startState, 
        {type: "ADD-TODOLIST", title: newTodolistTitle,  
        todolistId:v1()});

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
 
    const newTodolistTitle = "New Todolist";

    const action = {
        type: "CHANGE-TODOLIST-TITLE" as const,
        id: todolistId2,
        title: newTodolistTitle,
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test("correct filter of todolist should be changed", () => {

    const newFilter: FilterType = "completed";

    const action = {
        type: "CHANGE-TODOLIST-FILTER" as const,
        id: todolistId2,
        filter: newFilter,
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
