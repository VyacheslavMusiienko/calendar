import moment from 'moment';
import styled, { CSSProperties } from 'styled-components';

type CalendarProps = {
  startDay: moment.Moment;
  today: moment.Moment;
  totalDay: number;
};
type CellWrapperProps = {
  isHeader?: boolean;
  isWeekend?: boolean;
  isSelectedMonth?: boolean;
};
type RowInCellProps = {
  justifyContent?: CSSProperties['justifyContent'];
  pr?: number;
};

const GridWrapper = styled.div<CellWrapperProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? '#1e1f21' : '#404040')};
  ${(props) => props.isHeader && 'border-bottom: 1px solid #404040'}
`;

const CellWrapper = styled.div<CellWrapperProps>`
  min-width: 140px;
  min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
  background-color: ${(props) => (props.isWeekend ? '#565759' : '#1e1f21')};
  color: ${(props) => (props.isSelectedMonth ? '#e9edf5' : '#8f9396')};
`;

const RowInCell = styled.div<RowInCellProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  ${(props) => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const DayWrapper = styled.div`
  height: 33px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarGrid = ({ startDay, today, totalDay }: CalendarProps) => {
  const day = startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(totalDay)].map(() => day.add(1, 'day').clone());

  const isCurrentDay = (currentDay: moment.Moment): boolean => moment().isSame(currentDay, 'day');
  const isSelectedMonth = (currentMonth: moment.Moment): boolean =>
    today.isSame(currentMonth, 'month');

  return (
    <>
      <GridWrapper isHeader>
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
      </GridWrapper>
      <GridWrapper>
        {daysArray.map((dayItem) => {
          return (
            <CellWrapper
              key={dayItem.format('DDMMYYYY')}
              isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
              isSelectedMonth={isSelectedMonth(dayItem)}
            >
              <RowInCell justifyContent="flex-end">
                <DayWrapper>
                  {!isCurrentDay(dayItem) && dayItem.format('D')}
                  {isCurrentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                </DayWrapper>
              </RowInCell>
            </CellWrapper>
          );
        })}
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
