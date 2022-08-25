
export const CommonActionTypes = { Default: 'Default', Reducer: 'Reducer', Success: "Success", Failure: "Failure", };
export type Payload = {[key:string]:any};

// Action that is dispatched to store dispatch(action:Action)
export type Action<P> = { type:string, payload: P, cb?: Function, vararg: any[] };

type ActionCreator<P> = { (payload: P, cb?: Function, ...arg: any[]): Action<P>, type: string };

export type ActionCreators<P> = { BaseType:string, Default: ActionCreator<P>, Reducer: ActionCreator<P>, Success: ActionCreator<{}>, Failure: ActionCreator<{}>, };

function createActionCreator<P>(type: string)
{
  const actionCreator:ActionCreator<P> = (payload: P, cb?: Function, ...vararg: any[]) => ({ type, payload, cb, vararg });
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
function createActions<P>(baseType: string): ActionCreators<P>
{
  const actionCreators: any = {BaseType:baseType};

  const commonActionTypes = Object.values(CommonActionTypes);

  commonActionTypes.forEach((type:string) =>
  {
    const fullType = baseType + '_' + type;

    actionCreators[type] = createActionCreator<P>(fullType);
  });

  return actionCreators;
}

export  {
  createActions,
  createActionCreator,
}