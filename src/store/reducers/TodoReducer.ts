import { CommonUtils } from "../../config/utils";
import { TodoType } from "../../containers/Home/TodoItem";
import { Action } from "../actions/ActionCreator";
import { AddTodoActions, DeleteTodoActions } from "../actions/AppAction";

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
        
        case DeleteTodoActions.Success.type:
            const id = action.payload.id;

            const toDeleteIndex:number = state.todos.findIndex((todo)=>todo.id===id);

            let updatedTodoItem = state.todos[toDeleteIndex];
            updatedTodoItem = {...updatedTodoItem, deletedAt:CommonUtils.utcTimeNow()}

            state = {...state, todos:[...state.todos]};
            state.todos[toDeleteIndex] = updatedTodoItem;
            
            return state;
        default:
            return state;
    }
}