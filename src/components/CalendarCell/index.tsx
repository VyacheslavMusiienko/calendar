import moment from 'moment';
import { User } from '../../type';
import {
  CellWrapper,
  CurrentDay,
  DayWrapper,
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
  RowInCell,
  ShowDayWrapper,
} from '../containers';
import { isCurrentDay, isSelectedMonth } from '../helpers';

type CalendarCellProps = {
  dayItem: moment.Moment;
  today: moment.Moment;
  openFormHandler: (
    method: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => void;
  events: User[];
};

const CalendarCell = ({ dayItem, today, openFormHandler, events }: CalendarCellProps) => {
  return (
    <CellWrapper
      isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
      isSelectedMonth={isSelectedMonth(dayItem, today)}
    >
      <RowInCell justifyContent="flex-end">
        <ShowDayWrapper>
          <DayWrapper onDoubleClick={() => openFormHandler('Create', null, dayItem)}>
            {isCurrentDay(dayItem) ? (
              <CurrentDay>{dayItem.format('D')}</CurrentDay>
            ) : (
              dayItem.format('D')
            )}
          </DayWrapper>
        </ShowDayWrapper>
        <EventListWrapper>
          {events.slice(0, 2).map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper onDoubleClick={() => openFormHandler('Update', event)}>
                {event.title}
              </EventItemWrapper>
            </EventListItemWrapper>
          ))}
          {events.length > 2 ? (
            <EventListItemWrapper key="show more">
              <EventItemWrapper>Show more...</EventItemWrapper>
            </EventListItemWrapper>
          ) : null}
        </EventListWrapper>
      </RowInCell>
    </CellWrapper>
  );
};
export default CalendarCell;