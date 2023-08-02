import moment from 'moment';
import { GridWrapper } from '../../containers';
import { User } from '../../type';
import CalendarGridBody from '../CalendarGridBody';
import CalendarGridHeader from '../CalendarGridHeader';

type CalendarProps = {
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

const CalendarGrid = ({ startDay, today, totalDay, events, openFormHandler }: CalendarProps) => {
  return (
    <>
      <GridWrapper isHeader>
        <CalendarGridHeader />
      </GridWrapper>
      <GridWrapper>
        <CalendarGridBody
          startDay={startDay}
          totalDay={totalDay}
          events={events}
          openFormHandler={openFormHandler}
          today={today}
        />
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
