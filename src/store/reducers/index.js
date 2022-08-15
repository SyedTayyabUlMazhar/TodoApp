import { combineReducers } from 'redux';
import TodoReducer from './TodoReducer';
import StatusFlagsReducer from './StatusFlagsReducer';

const RootReducer = combineReducers({
    TodoReducer,
    StatusFlagsReducer,
});

export default RootReducer;