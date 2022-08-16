// import { NavigationService, ApiCaller, Constants, showToast } from '../../config';
import { call, delay, put } from 'redux-saga/effects';
import { AddTodoActions, DeleteTodoActions, UpdateTodoActions } from '../actions/AppAction';
import { CommonUtils } from '../../config/utils';
import {Action} from '../actions/ActionCreator';

export default class AppMiddleware
{

    static *AddTodo (action:Action)
    {
        const {Success, Failure, } = AddTodoActions;

        try
        {
            //some api call
            // success can be true or false randomly
            let success: number | boolean = yield delay(10000, CommonUtils.randomNumber(0, 2))
            success = Boolean(success);
            if (success)
            {
                yield put(Success(action.payload))
                yield call(()=>action.cb?.());
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

    static *DeleteTodo (action:Action)
    {
        const {Success, Failure, } = DeleteTodoActions;
        try
        {
            //some api call
            // success can be true or false randomly
            let success: number | boolean = yield delay(10000, CommonUtils.randomNumber(0, 2))
            success = Boolean(success);
            if (success)
            {
                yield put(Success(action.payload))
                yield call(()=>action.cb?.());
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

    static *UpdateTodo (action:Action)
    {
        const {Success, Failure, } = UpdateTodoActions;
        try
        {
            //some api call
            // success can be true or false randomly
            let success: number | boolean = yield delay(10000, CommonUtils.randomNumber(0, 2))
            success = Boolean(success);
            if (success)
            {
                yield put(Success(action.payload))
                yield call(()=>action.cb?.());
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