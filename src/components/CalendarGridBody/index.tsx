import { isDayContainCurrentEvent } from '../../helpers';
import { TOTAL_DAY } from '../../helpers/constant';
import { User } from '../../type';
import CalendarCell from '../CalendarCell';

type CalendarGridBodyProps = {
  startDay: moment.Moment;
  events: User[];
  openFormHandler: (
    method: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => void;
};

const CalendarGridBody = ({ startDay, events, openFormHandler }: CalendarGridBodyProps) => {
  const day = startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(TOTAL_DAY)].map(() => day.add(1, 'day').clone());

  return daysArray.map((dayItem) => {
    return (
      <CalendarCell
        key={dayItem.format('DDMMYYYY')}
        dayItem={dayItem}
        events={events.filter((event) => isDayContainCurrentEvent(event, dayItem))}
        openFormHandler={openFormHandler}
      />
    );
  });
};

export default CalendarGridBody;
