export function ChangeDate(date) {
  const moment = require("moment");

  const publish_date = moment(date).format("YYYY-MM-DD");
  return publish_date;
}
