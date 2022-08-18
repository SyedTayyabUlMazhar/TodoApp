import moment from "moment";
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
function getNewUid():string
{
  return uuidv4();
}

export default {
  utcTimeNow,
  msToHourMin,
  randomNumber,
  getNewUid,
}