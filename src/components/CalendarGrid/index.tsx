import moment from 'moment';
import { GridWrapper } from '../../containers';
import { User } from '../../type';
import CalendarGridBody from '../CalendarGridBody';
import CalendarGridHeader from '../CalendarGridHeader';

type CalendarProps = {
  startDay: moment.Moment;
  events: User[];
  openFormHandler: (
    method: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => void;
  setDisplayMod: React.Dispatch<React.SetStateAction<'month' | 'day'>>;
};

const CalendarGrid = ({ startDay, events, openFormHandler, setDisplayMod }: CalendarProps) => {
  return (
    <>
      <GridWrapper isHeader>
        <CalendarGridHeader />
      </GridWrapper>
      <GridWrapper>
        <CalendarGridBody
          startDay={startDay}
          events={events}
          openFormHandler={openFormHandler}
          setDisplayMod={setDisplayMod}
        />
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
