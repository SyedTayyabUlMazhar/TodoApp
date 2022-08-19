import { TodoType } from "../../containers/Home/TodoItem";
import { Action, CommonActionTypes } from "../actions/ActionCreator";
const {Default, Success, Failure, } = CommonActionTypes;

const regularExpression = new RegExp(`(.*)_(${Default}|${Success}|${Failure})`);

type StateType = {
    [key: string]: any,
};

const initialState:StateType = {
};

export default function StatusFlagsReducer (state = initialState, action: Action)
{
    const type = action.type;

    const matches = regularExpression.exec(type);
    if(matches)
    {
        const baseActionType = matches[1];

        state = {...state};

        let currentLoadingValueOfAction = state[baseActionType]?.loading ?? 0;
        currentLoadingValueOfAction += matches[2] === Default ? +1 : -1;
        state[baseActionType] = {loading: currentLoadingValueOfAction};

        return state;
    }

    return state;
}