import
{
    ADD_TODO,
    FETCH_ALL_TODOS,
    SAVE_ACTION,
} from '../constants';

import { createActions, createActionCreator } from './ActionCreator';
import { UPDATED_TODO } from './../constants';

const AddTodoActions = createActions(ADD_TODO);
const UpdateTodoActions = createActions(UPDATED_TODO);
const FetchAllTodoActions = createActions(FETCH_ALL_TODOS);
const SaveAction = createActionCreator(SAVE_ACTION);

export
{
    AddTodoActions,
    UpdateTodoActions,
    FetchAllTodoActions,
    SaveAction,
}