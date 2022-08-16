import
{
    ADD_TODO,
    DELETE_TODO,
} from '../constants';

import { createActions } from './ActionCreator';

const AddTodoActions = createActions(ADD_TODO);
const DeleteTodoActions = createActions(DELETE_TODO);
export
{
    AddTodoActions,
    DeleteTodoActions,
}