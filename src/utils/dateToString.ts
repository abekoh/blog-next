import moment from 'moment';

export const dateToString: (date: Date, separator?: string) => string = (
  date,
  separator = '.',
) => {
  return moment(date).format(`YYYY${separator}MM${separator}DD`);
};
