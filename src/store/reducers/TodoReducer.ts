import { CommonUtils } from "../../config/utils";
import { TodoType } from "../../containers/Home/TodoItem";
import { Action } from "../actions/ActionCreator";
import { AddTodoActions, DeleteTodoActions, UpdateTodoActions } from "../actions/AppAction";

type StateType = {
    todos: TodoType[],
}
const initialState: StateType = {
    todos: []
};

export default function TodoReducer(state = initialState, action: Action)
{
    switch (action.type)
    {
        case AddTodoActions.Success.type:

            const todo = {...action.payload} as TodoType;

            state = { ...state, todos: [todo, ...state.todos,] };
            return state;
        
        case DeleteTodoActions.Success.type: {
            const id = action.payload.id;

            const toDeleteIndex:number = state.todos.findIndex((todo)=>todo.id===id);

            let updatedTodoItem = state.todos[toDeleteIndex];
            updatedTodoItem = {...updatedTodoItem, deletedAt:CommonUtils.utcTimeNow()}

            state = {...state, todos:[...state.todos]};
            state.todos[toDeleteIndex] = updatedTodoItem;
            
            return state;
        }
        case UpdateTodoActions.Success.type:
            const payload = action.payload;
            const {id, updates} = payload;

            const toUpdateIndex:number = state.todos.findIndex((todo)=>todo.id===id);

            const itemToUpdate = state.todos[toUpdateIndex];
            const updatedItem = {...itemToUpdate, ...updates, updatedAt:CommonUtils.utcTimeNow()}

            state = {...state, todos:[...state.todos]};
            state.todos[toUpdateIndex] = updatedItem;

            return state;
        default:
            return state;
    }
}