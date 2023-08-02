import { User } from '../../type';
import CalendarCell from '../CalendarCell';
import { isDayContainCurrentEvent } from '../helpers';

type CalendarGridBodyProps = {
  startDay: moment.Moment;
  today: moment.Moment;
  totalDay: number;
  events: User[];
  openFormHandler: (
    method: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => void;
};

const CalendarGridBody = ({
  startDay,
  today,
  totalDay,
  events,
  openFormHandler,
}: CalendarGridBodyProps) => {
  const day = startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(totalDay)].map(() => day.add(1, 'day').clone());

  return daysArray.map((dayItem) => {
    return (
      <CalendarCell
        key={dayItem.format('DDMMYYYY')}
        dayItem={dayItem}
        today={today}
        events={events.filter((event) => isDayContainCurrentEvent(event, dayItem))}
        openFormHandler={openFormHandler}
      />
    );
  });
};

export default CalendarGridBody;
