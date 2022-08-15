import moment from "moment";

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
export default {
  utcTimeNow,
  msToHourMin,
  randomNumber,
}