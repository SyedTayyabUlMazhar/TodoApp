import { AppMiddleware } from "../middlewares"
import { takeLatest, all } from 'redux-saga/effects'
import { AddTodoActions, FetchAllTodoActions, UpdateTodoActions } from "../actions/AppAction"
export function* Sagas() {
    yield all([
        yield takeLatest(AddTodoActions.Default.type, AppMiddleware.AddTodo),
        yield takeLatest(UpdateTodoActions.Default.type, AppMiddleware.UpdateTodo),
        yield takeLatest(FetchAllTodoActions.Default.type, AppMiddleware.FetchAllTodo),
    ])
}