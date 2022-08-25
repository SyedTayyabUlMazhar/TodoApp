import moment from "moment";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { v4 as uuidv4 } from 'uuid';
import { ActionCreators, Payload } from "../../store/actions/ActionCreator";
import AppStore from "../appStore";
import { SaveAction } from "../../store/actions/AppAction";

function utcTimeNow(): number
{
  return moment().utc().valueOf();
}

function msToHourMin(ms: number): string
{
  return moment(ms).format('hh:mm');
}

function randomNumber(start: number, end: number):number
{
  return Math.random() % end + start;
}

async function checkIfInternetReachable():Promise<boolean>
{
  const { isInternetReachable, }: NetInfoState = await NetInfo.fetch();
  console.log("isInternetReachable: ", isInternetReachable);
  return isInternetReachable ?? false;
}

function addNetInfoListener(listener:(state:NetInfoState)=>void)
{
  console.log("addNetInfoListener")
  const unsubscribe = NetInfo.addEventListener(listener);

  return unsubscribe;
}
function getNewUid():string
{
  return uuidv4();
}

/**
 * 
 * Dispatches Reducer action with given payload.
 * If internet is working then dispatches Default action with  given payload
 * otherwise saves the default action to SaveActionReducer.
 */
async function offlineActionDispatcher<P>(actionCreators:ActionCreators<P>, payload:P, cb?:Function, ...arg:any[])
{
  const dispatch = AppStore.dispatch;
  const {Reducer, Default,} = actionCreators;
  
  dispatch(Reducer(payload, cb, ...arg));

  if( await checkIfInternetReachable())
  {
    const middlewareAction = Default(payload, undefined, ...arg);
    dispatch(middlewareAction);
  }
  else
  {
    const middlewareAction = Default(payload, undefined, ...arg);
    const saveActionPayload = { action:{...middlewareAction, id:getNewUid()} };
    dispatch(SaveAction(saveActionPayload));
  }
}

export default {
  utcTimeNow,
  msToHourMin,
  randomNumber,
  checkIfInternetReachable,
  getNewUid,
  addNetInfoListener,
  offlineActionDispatcher,
}