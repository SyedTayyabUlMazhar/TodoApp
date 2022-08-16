// import { NavigationService, ApiCaller, Constants, showToast } from '../../config';
import { call, delay, put } from 'redux-saga/effects';
import { AddTodoActions, DeleteTodoActions, UpdateTodoActions } from '../actions/AppAction';
import { CommonUtils } from '../../config/utils';
import { Action } from '../actions/ActionCreator';
import firestore from '@react-native-firebase/firestore';
import { TodoType } from '../../containers/Home/TodoItem';

const TodoCollection = firestore().collection("todo");
export default class AppMiddleware
{

    static *AddTodo(action: Action)
    {
        const { Success, Failure, } = AddTodoActions;
        const todo: TodoType = action.payload as TodoType;
        try
        {
            //some api call
            // success can be true or false randomly
            yield TodoCollection.doc(todo.id.toString()).set(todo);
            yield put(Success(action.payload))
            if (action.cb) yield call<any>(action.cb);
        }
        catch (err)
        {
            console.log("Error e:", err);
            yield put(Failure({}))
        }
    }

    static *DeleteTodo(action: Action)
    {
        const { Success, Failure, } = DeleteTodoActions;
        try
        {
            //some api call
            // success can be true or false randomly
            let success: number | boolean = yield delay(10000, CommonUtils.randomNumber(0, 2))
            success = Boolean(success);
            if (success)
            {
                yield put(Success(action.payload))
                yield call(() => action.cb?.());
            }
            else
            {
                yield put(Failure({}))
            }
        }
        catch (err)
        {
            yield put(Failure({}))
        }
    }

    static *UpdateTodo(action: Action)
    {
        const { Success, Failure, } = UpdateTodoActions;
        try
        {
            //some api call
            // success can be true or false randomly
            let success: number | boolean = yield delay(10000, CommonUtils.randomNumber(0, 2))
            success = Boolean(success);
            if (success)
            {
                yield put(Success(action.payload))
                yield call(() => action.cb?.());
            }
            else
            {
                yield put(Failure({}))
            }
        }
        catch (err)
        {
            yield put(Failure({}))
        }
    }
}