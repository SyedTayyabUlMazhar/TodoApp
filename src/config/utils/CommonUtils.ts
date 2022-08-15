import moment from "moment";

function utcTimeNow(): number
{
  return moment().utc().valueOf();
}

function msToHourMin(ms:number): string
{
  return moment(ms).format('hh:mm');
}

export default {
  utcTimeNow,
  msToHourMin,
}