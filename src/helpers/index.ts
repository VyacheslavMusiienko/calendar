import moment from 'moment';
import { User } from '../type';

export const isCurrentDay = (currentDay: moment.Moment): boolean =>
  moment().isSame(currentDay, 'day');

export const isSelectedMonth = (currentMonth: moment.Moment, today: moment.Moment): boolean =>
  today.isSame(currentMonth, 'month');

export const isDayContainCurrentEvent = (event: User, dayItem: moment.Moment) =>
  event.data >= dayItem.startOf('day').format('X') &&
  event.data <= dayItem.clone().endOf('day').format('X');
