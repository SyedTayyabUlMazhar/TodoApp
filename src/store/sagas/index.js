import { AppMiddleware } from "../middlewares"
import { takeLatest, all } from 'redux-saga/effects'
import { AddTodoActions, DeleteTodoActions } from "../actions/AppAction"
export function* Sagas() {
    yield all([
        yield takeLatest(AddTodoActions.Default.type, AppMiddleware.AddTodo),
        yield takeLatest(DeleteTodoActions.Default.type, AppMiddleware.DeleteTodo),
    ])
}