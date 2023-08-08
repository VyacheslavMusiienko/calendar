import moment from 'moment';
import { User } from '../type';

export const isCurrentDay = (currentDay: moment.Moment): boolean =>
  moment().isSame(currentDay, 'day');

export const isSelectedMonth = (currentMonth: moment.Moment, today: moment.Moment): boolean =>
  today.isSame(currentMonth, 'month');

export const isDayContainCurrentTimestamp = (time: string, currentTime: moment.Moment) =>
  time >= currentTime.startOf('day').format('X') &&
  time <= currentTime.clone().endOf('day').format('X');

export const isDayContainCurrentEvent = (event: User, dayItem: moment.Moment) =>
  isDayContainCurrentTimestamp(event.date, dayItem);
