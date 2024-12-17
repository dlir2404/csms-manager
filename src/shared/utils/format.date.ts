import moment from 'moment';

export const formatDate = (iso: string) => {
  return moment(iso).format('HH:mm:ss DD/MM/YYYY');
};
