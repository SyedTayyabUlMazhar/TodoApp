import { AppMiddleware } from "../middlewares"
import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import { AddTodoActions, FetchAllTodoActions, UpdateTodoActions } from "../actions/AppAction"
export function* Sagas() {
    yield all([
        yield takeEvery(AddTodoActions.Default.type, AppMiddleware.AddTodo),
        yield takeEvery(UpdateTodoActions.Default.type, AppMiddleware.UpdateTodo),
        yield takeLatest(FetchAllTodoActions.Default.type, AppMiddleware.FetchAllTodo),
    ])
}