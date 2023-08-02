import moment from 'moment';
import { CellWrapper, RowInCell } from '../containers';

const CalendarGridHeader = () => {
  return (
    <>
      {[...Array(7)].map((_, index) => {
        const weekdays = moment()
          .day(index + 1)
          .format('ddd');
        return (
          <CellWrapper isHeader key={weekdays} isSelectedMonth>
            <RowInCell justifyContent="flex-end" pr={1}>
              {weekdays}
            </RowInCell>
          </CellWrapper>
        );
      })}
    </>
  );
};

export default CalendarGridHeader;
