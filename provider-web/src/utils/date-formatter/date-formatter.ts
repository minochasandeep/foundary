import moment from 'moment-timezone';

export const convertDateTime = (
  date: string,
  toUTC: boolean = false,
  timezone?: string,
  format: string = "LLLL",
) => {
  if (!moment(date, moment.ISO_8601, true).isValid()) {
    throw new Error("Invalid date");
  }

  if (timezone && !moment.tz.zone(timezone)) {
    throw new Error("Invalid timezone");
  }

  const dateTime = moment(date);
  if (!dateTime.isValid()) {
    throw new Error("Invalid date");
  }

  try {
    if (toUTC) {
      return dateTime.utc().toISOString();
    } else {
      if (timezone) {
        return moment.utc(date).tz(timezone).format(format);
      } else {
        return moment(date).format(format);
      }
    }
  } catch (error) {
    throw new Error("Conversion error");
  }
};

