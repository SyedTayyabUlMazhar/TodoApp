import { combineReducers } from 'redux';
import TodoReducer from './TodoReducer';
import StatusFlagsReducer from './StatusFlagsReducer';
import SaveActionReducer from './SaveActionReducer';

const RootReducer = combineReducers({
    TodoReducer,
    StatusFlagsReducer,
    SaveActionReducer,
});

export default RootReducer;