import moment from 'moment';
import { isDayContainCurrentEvent } from '../../helpers';
import { TOTAL_DAY } from '../../helpers/constant';
import { useAppSelector } from '../../hooks/redux';
import { User } from '../../type';
import CalendarCell from '../CalendarCell';

type CalendarGridBodyProps = {
  events: User[];
  openFormHandler: (
    method: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => void;
};

const CalendarGridBody = ({ events, openFormHandler }: CalendarGridBodyProps) => {
  const { today } = useAppSelector((state) => state.dateReducer);
  const day = moment(today).startOf('month').startOf('week').subtract(1, 'day');
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
