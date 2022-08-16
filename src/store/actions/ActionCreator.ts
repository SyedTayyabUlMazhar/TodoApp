
export const CommonActionTypes = { Default: 'Default', Success: "Success", Failure: "Failure", };
type Payload = {[key:string]:any};

// Action that is dispatched to store dispatch(action:Action)
export type Action = { type:string, payload: Payload, cb?: Function, vararg: any[] };

type ActionCreator = { (payload: Payload, cb?: Function, ...arg: any[]): Action, type: string };

type ActionCreators = { BaseType:string, Default: ActionCreator, Success: ActionCreator, Failure: ActionCreator, };

function createActionCreator(type: string): ActionCreator
{
  const actionCreator:ActionCreator = (payload: Payload, cb?: Function, ...vararg: any[]) => ({ type, payload, cb, vararg });
  actionCreator.type = type;

  return actionCreator;
};

/* if you call like this: createActions("Login")
* returns this object =>
* { 
*    Default: (payload:object, cb:Function, ...vararg:any[]) => ({type: "Login_Default", payload, cb, vararg}),
*    Succcess: (payload:object, cb:Function, ...vararg:any[]) => ({type: "Login_Succcess", payload, cb, vararg}),
*    Failure: (payload:object, cb:Function, ...vararg:any[]) => ({type: "Login_Failure", payload, cb, vararg}),
*  }
* 
*/
function createActions(baseType: string): ActionCreators
{
  const actionCreators: any = {BaseType:baseType};

  const commonActionTypes = Object.values(CommonActionTypes);

  commonActionTypes.forEach((type:string) =>
  {
    const fullType = baseType + '_' + type;

    actionCreators[type] = createActionCreator(fullType);
  });

  return actionCreators;
}

export  {
  createActions,
}