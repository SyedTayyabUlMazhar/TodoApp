import { TodoType } from "../../containers/Home/TodoItem";
import { Action } from "../actions/ActionCreator";
import { AddTodoActions } from "../actions/AppAction";

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

        default:
            return state;
    }
}