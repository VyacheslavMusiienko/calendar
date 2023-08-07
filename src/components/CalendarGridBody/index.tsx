import { isDayContainCurrentEvent } from '../../helpers';
import { User } from '../../type';
import CalendarCell from '../CalendarCell';

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
  setDisplayMod: React.Dispatch<React.SetStateAction<'month' | 'day'>>;
};

const CalendarGridBody = ({
  startDay,
  today,
  totalDay,
  events,
  openFormHandler,
  setDisplayMod,
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
        setDisplayMod={setDisplayMod}
      />
    );
  });
};

export default CalendarGridBody;
