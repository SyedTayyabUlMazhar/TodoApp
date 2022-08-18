import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { CommonUtils } from "../../config/utils";
import { TodoType } from "../../containers/Home/TodoItem";
import { Action } from "../actions/ActionCreator";
import { AddTodoActions, FetchAllTodoActions, UpdateTodoActions } from "../actions/AppAction";

type QuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

type StateType = {
    todos: TodoType[],
}
const initialState: StateType = {
    todos: []
};

export default function TodoReducer(state = initialState, action: Action)
{
    const { type, payload } = action;

    switch (type)
    {
        case AddTodoActions.Reducer.type: {

            const todo = { ...payload.todo } as TodoType;

            state = { ...state, todos: [todo, ...state.todos,] };
            return state;
        }

        case UpdateTodoActions.Reducer.type: {
            const { id, updates } = payload;

            const toUpdateIndex: number = state.todos.findIndex((todo) => todo.id === id);

            const itemToUpdate = state.todos[toUpdateIndex];
            const updatedItem = { ...itemToUpdate, ...updates}

            state = { ...state, todos: [...state.todos] };
            state.todos[toUpdateIndex] = updatedItem;

            return state;
        }
        case FetchAllTodoActions.Reducer.type: {
            const { querySnapshot } = payload;
            const todosDocs: TodoType[] = getDocsFromQuerySnapshot<TodoType>(querySnapshot);
            state = {...state, todos:[...todosDocs]};
            return state;
        }
        default:
            return state;
    }
}

function getDocsFromQuerySnapshot<T>(querySnapshot: QuerySnapshot): T[]
{
    const docsArray: T[] = querySnapshot.docs.reduce((acc: FirebaseFirestoreTypes.DocumentData[], curr) =>
    {
        acc.push(curr.data());
        return acc;
    }, []) as T[];

    return docsArray;
}