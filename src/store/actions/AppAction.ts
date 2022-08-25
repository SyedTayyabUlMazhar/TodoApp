import
{
    ADD_TODO,
    FETCH_ALL_TODOS,
    REMOVE_ACTION,
    SAVE_ACTION,
} from '../constants';

import { createActions, createActionCreator } from './ActionCreator';
import { UPDATED_TODO } from './../constants';
import { TodoType } from '../../containers/Home/TodoItem';
import {AddTodoPayload, FetchAllTodoPayload, UpdateTodoPayload} from './AppAction.types'

const AddTodoActions = createActions<AddTodoPayload>(ADD_TODO);
const UpdateTodoActions = createActions<UpdateTodoPayload>(UPDATED_TODO);
const FetchAllTodoActions = createActions(FETCH_ALL_TODOS);
const SaveAction = createActionCreator(SAVE_ACTION);
const RemoveSavedAction = createActionCreator(REMOVE_ACTION);

export
{
    AddTodoActions,
    UpdateTodoActions,
    FetchAllTodoActions,
    SaveAction,
    RemoveSavedAction,
}