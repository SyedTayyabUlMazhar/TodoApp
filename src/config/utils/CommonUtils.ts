import moment from "moment";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { v4 as uuidv4 } from 'uuid';

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

export default {
  utcTimeNow,
  msToHourMin,
  randomNumber,
  checkIfInternetReachable,
  getNewUid,
  addNetInfoListener,
}