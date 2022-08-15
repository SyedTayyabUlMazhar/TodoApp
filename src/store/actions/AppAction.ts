import
{
    ADD_TODO,
} from '../constants';

import { createActions } from './ActionCreator';

const AddTodoActions = createActions(ADD_TODO);
export
{
    AddTodoActions,
}