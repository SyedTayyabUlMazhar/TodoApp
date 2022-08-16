import
{
    ADD_TODO,
    DELETE_TODO,
} from '../constants';

import { createActions } from './ActionCreator';
import { UPDATED_TODO } from './../constants';

const AddTodoActions = createActions(ADD_TODO);
const DeleteTodoActions = createActions(DELETE_TODO);
const UpdateTodoActions = createActions(UPDATED_TODO);

export
{
    AddTodoActions,
    DeleteTodoActions,
    UpdateTodoActions,
}