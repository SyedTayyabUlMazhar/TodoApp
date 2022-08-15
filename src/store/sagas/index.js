import { AppMiddleware } from "../middlewares"
import { takeLatest, all } from 'redux-saga/effects'
import { AddTodoActions } from "../actions/AppAction"
export function* Sagas() {
    yield all([
        yield takeLatest(AddTodoActions.Default.type, AppMiddleware.AddTodo),
    ])
}