function time() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes}`;
  return time;
}

function date() {
  const d = new Date();
  const ymd = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  return ymd;
}

function timeDelay(time) {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const bufTime = time.split(':');
  if ((+bufTime[1] + 1 == 60 && +bufTime[0] + 1 == hours) || (+bufTime[1] + 1 == minutes && bufTime[0] == hours)) {
    return true;
  }
  return false;
}

module.exports = {
  time,
  date,
  timeDelay
}
