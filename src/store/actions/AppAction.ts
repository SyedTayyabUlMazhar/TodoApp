import
{
    ADD_TODO,
    DELETE_TODO,
    FETCH_ALL_TODOS,
} from '../constants';

import { createActions } from './ActionCreator';
import { UPDATED_TODO } from './../constants';

const AddTodoActions = createActions(ADD_TODO);
const DeleteTodoActions = createActions(DELETE_TODO);
const UpdateTodoActions = createActions(UPDATED_TODO);
const FetchAllTodoActions = createActions(FETCH_ALL_TODOS);

export
{
    AddTodoActions,
    DeleteTodoActions,
    UpdateTodoActions,
    FetchAllTodoActions,
}