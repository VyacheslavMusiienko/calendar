import moment from 'moment';
import {
  CellWrapper,
  CurrentDay,
  DayWrapper,
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
  RowInCell,
  ShowDayWrapper,
} from '../../containers';
import { isCurrentDay, isSelectedMonth } from '../../helpers';
import { DISPLAY_MODE_DAY } from '../../helpers/constant';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { User } from '../../type';
import { updateDisplayMod } from '../../store/reducer/displayModSlice';

type CalendarCellProps = {
  dayItem: moment.Moment;
  openFormHandler: (
    method: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => void;
  events: User[];
};

const CalendarCell = ({ dayItem, openFormHandler, events }: CalendarCellProps) => {
  const dispatch = useAppDispatch();
  const { today } = useAppSelector((state) => state.dateReducer);

  return (
    <CellWrapper
      isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
      isSelectedMonth={isSelectedMonth(dayItem, moment(today))}
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
              <EventItemWrapper onClick={() => dispatch(updateDisplayMod(DISPLAY_MODE_DAY))}>
                Show more...
              </EventItemWrapper>
            </EventListItemWrapper>
          ) : null}
        </EventListWrapper>
      </RowInCell>
    </CellWrapper>
  );
};
export default CalendarCell;
