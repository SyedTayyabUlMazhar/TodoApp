import { createReducer } from "@reduxjs/toolkit";
import { Action, CommonActionTypes } from "../actions/ActionCreator";
const {Default, Success, Failure, } = CommonActionTypes;

const regularExpression = new RegExp(`(.*)_(${Default}|${Success}|${Failure})`);

type StateType = {
    [key: string]: any,
};

const initialState:StateType = {
};

const defaultOrSuccessOrFailureActionMatcher = (action:Action) => 
{
    const matches = regularExpression.exec(action.type) ?? [];

    return matches.length > 0;
}

const StatusFlagsReducer = createReducer(initialState, (builder) => {
    builder

    .addMatcher(defaultOrSuccessOrFailureActionMatcher, (state:StateType, action:Action) => 
    {
        const type = action.type;

        const matches = regularExpression.exec(type)!;

        const baseActionType = matches[1];
        const isDefaultAction = matches[2] === Default;

        state[baseActionType] ??= { loading: 0 };

        state[baseActionType].loading += isDefaultAction ? +1 : -1;

    })

});


export default StatusFlagsReducer;