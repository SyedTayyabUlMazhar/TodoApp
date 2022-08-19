import { Action } from "../actions/ActionCreator";
import { SaveAction, RemoveSavedAction } from "../actions/AppAction";

export type SavedAction = Action & {storedRequest:boolean, id:string}; 

type StateType = {
    actionsQueue: SavedAction[],
}
const initialState: StateType = {
    actionsQueue: [],
};

export default function SaveActionReducer(state = initialState, action: Action)
{
    const { type, payload } = action;

    switch (type)
    {
        case SaveAction.type: {
            state = {...state, actionsQueue:[...state.actionsQueue, payload.action]};
            return state;
        }

        case RemoveSavedAction.type: {
            const { id } = payload;
            const updatedActionsQueue = state.actionsQueue
                .filter((action)=>action.id !== id);
            
            state = {...state, actionsQueue:updatedActionsQueue};

            return state;
        }
        default: return state;
    }
}