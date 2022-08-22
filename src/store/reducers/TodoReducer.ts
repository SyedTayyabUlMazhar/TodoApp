import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { createReducer } from "@reduxjs/toolkit";
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

const TodoReducer = createReducer(initialState, (builder) => {
    builder

    .addCase(AddTodoActions.Reducer.type, (state:StateType, action:Action) => 
    {
        state.todos.unshift(action.payload.todo)
    })

    .addCase(UpdateTodoActions.Reducer.type, (state:StateType, action:Action) => 
    {
        const { id, updates } = action.payload;

        const toUpdateIndex: number = state.todos.findIndex((todo) => todo.id === id);

        Object.assign(state.todos[toUpdateIndex], updates);
    })

    .addCase(FetchAllTodoActions.Reducer.type, (state:StateType, action:Action) => 
    {
        const { querySnapshot } = action.payload;
        const todosDocs: TodoType[] = getDocsFromQuerySnapshot<TodoType>(querySnapshot);
        state.todos = todosDocs;
    })
})

function getDocsFromQuerySnapshot<T>(querySnapshot: QuerySnapshot): T[]
{
    const docsArray: T[] = querySnapshot.docs.reduce((acc: FirebaseFirestoreTypes.DocumentData[], curr) =>
    {
        acc.push(curr.data());
        return acc;
    }, []) as T[];

    return docsArray;
}

export default TodoReducer;