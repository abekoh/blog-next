import moment from 'moment';

export const dateToString: (date: Date) => string = (date) => {
  return moment(date).format('YYYY.MM.DD');
};
