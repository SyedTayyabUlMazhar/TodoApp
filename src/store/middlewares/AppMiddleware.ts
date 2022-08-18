// import { NavigationService, ApiCaller, Constants, showToast } from '../../config';
import { call, delay, put } from 'redux-saga/effects';
import { AddTodoActions, FetchAllTodoActions, UpdateTodoActions } from '../actions/AppAction';
import { CommonUtils } from '../../config/utils';
import { Action } from '../actions/ActionCreator';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { TodoType } from '../../containers/Home/TodoItem';
import { Alert } from 'react-native';
type QuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

const TodoCollection = firestore().collection("todo");
export default class AppMiddleware
{

    static *AddTodo(action: Action)
    {
        const { Success, Failure, Reducer, } = AddTodoActions;
        const todo: TodoType = action.payload.todo as TodoType;
        try
        {
            //some api call
            // success can be true or false randomly
            yield TodoCollection.doc(todo.id.toString()).set(todo);
            yield put(Success({}))
            if (action.cb) yield call<any>(action.cb);
        }
        catch (err)
        {
            console.log("Error e:", err);
            yield put(Failure({}))
        }
    }

    static *UpdateTodo(action: Action)
    {
        const { Success, Failure, Reducer, } = UpdateTodoActions;
        try
        {
            //some api call
            // success can be true or false randomly
            let {id, updates} = action.payload;
            yield TodoCollection.doc(id.toString()).update(updates);

            yield put(Success({}))
            yield call(() => action.cb?.());
        }
        catch (err)
        {
            const formattedError = getFormattedError(err);
            Alert.alert("Error: " + formattedError.error.code, formattedError.error.message);
            yield put(Failure({}))
        }
    }

    static *FetchAllTodo(action: Action)
    {
        const { Success, Failure, Reducer,} = FetchAllTodoActions;
        try
        {   
            const todosFromServer: QuerySnapshot = yield TodoCollection.get({ source: 'server' });
            const payload = { querySnapshot: todosFromServer };
            yield put(Reducer(payload));
            yield put(Success({}));
            if (action.cb) yield call<any>(action.cb);
        }
        catch (err)
        {
            console.log("Error e:", err);
            yield put(Failure({}))
        }
    }
}

function getFormattedError(e: any)
{
    // [auth/no-current-user] No user currently signed in.
    let message = e?.message;
    const code = e?.code;
    const regularExpression = new RegExp(`^(\\[.+\\])\\s+(.+)$`);

    // 0: [auth/no-current-user] No user currently signed in.
    // 1: [auth/no-current-user]
    // 2: No user currently signed in.
    const matches = regularExpression.exec(message);

    message = matches?.[2];

    const formattedError = { error: { code, message } };
    return formattedError;
}