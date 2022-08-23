import { createReducer } from "@reduxjs/toolkit";
import { Action } from "../actions/ActionCreator";
import { SaveAction, RemoveSavedAction, AddTodoActions, UpdateTodoActions } from "../actions/AppAction";

export type SavedAction = Action & {id: string};
type Payload = { action: SavedAction};
export type DispatchedAction = Action & { payload:Payload, }; 

type StateType = {
    actionsQueue: (Action & {id: string})[],
}
const initialState: StateType = {
    actionsQueue: [],
};

const SaveActionReducer = createReducer(initialState, (builder) => 
{
    builder

    .addCase(SaveAction.type, (state:StateType, action:DispatchedAction) => 
    {
        const actionToSave = action.payload.action;
        const typeOfActionToSave = actionToSave.type;

        switch(typeOfActionToSave)
        {
            case AddTodoActions.Default.type: 
            {
                state.actionsQueue.push(actionToSave);
                break;
            }

            case UpdateTodoActions.Default.type:
            {
                // get the id of todo in action to save
                const idOfTodoToBeUpdated = actionToSave.payload.id;

                const indexOfPreviouslySavedActionForUpdatingTheSameTodo = state.actionsQueue.findIndex((savedAction)=>
                {
                    return savedAction.type === UpdateTodoActions.Default.type &&
                    savedAction.payload.id === idOfTodoToBeUpdated
                });
                
                const savedActionToUpdateThisTodoDoesntExist = indexOfPreviouslySavedActionForUpdatingTheSameTodo === -1;
                if(savedActionToUpdateThisTodoDoesntExist)
                {
                    state.actionsQueue.push(actionToSave);
                }
                else
                {
                    Object.assign(state.actionsQueue[indexOfPreviouslySavedActionForUpdatingTheSameTodo].payload.updates, actionToSave.payload.updates);
                }
                break;
            }

            default: break;
        }
    })

    .addCase(RemoveSavedAction.type, (state:StateType, action:DispatchedAction) => 
    {
        const { id } = action.payload;
        const updatedActionsQueue = state.actionsQueue
            .filter((action)=>action.id !== id);
        
        state.actionsQueue = updatedActionsQueue;
    })

});

export default SaveActionReducer;