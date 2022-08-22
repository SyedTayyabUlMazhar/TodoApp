import { createReducer } from "@reduxjs/toolkit";
import { Action } from "../actions/ActionCreator";
import { SaveAction, RemoveSavedAction } from "../actions/AppAction";

export type SavedAction = Action & { id:string }; 

type StateType = {
    actionsQueue: SavedAction[],
}
const initialState: StateType = {
    actionsQueue: [],
};

const SaveActionReducer = createReducer(initialState, (builder) => 
{
    builder

    .addCase(SaveAction.type, (state:StateType, action:Action) => 
    {
        state.actionsQueue.push(action.payload.action);
    })

    .addCase(RemoveSavedAction.type, (state:StateType, action:Action) => 
    {
        const { id } = action.payload;
        const updatedActionsQueue = state.actionsQueue
            .filter((action)=>action.id !== id);
        
        state.actionsQueue = updatedActionsQueue;
    })

});

export default SaveActionReducer;