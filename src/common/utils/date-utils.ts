import { format as fnsFormat } from 'date-fns';
import moment from 'moment';

const YYYY_MM_DD = 'yyyy-MM-dd';

export const toDateFormat = (date: string | number, format = YYYY_MM_DD) => {
  return fnsFormat(moment(date).toDate(), format);
};
