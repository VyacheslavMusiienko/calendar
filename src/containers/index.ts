import styled from 'styled-components';
import { CellWrapperProps, RowInCellProps } from '../type';

export const GridWrapper = styled.div<CellWrapperProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? '#1e1f21' : '#404040')};
  ${(props) => props.isHeader && 'border-bottom: 1px solid #404040'}
  cursor: pointer;
`;

export const CellWrapper = styled.div<CellWrapperProps>`
  min-height: ${(props) => (props.isHeader ? 24 : 94)}px;
  min-width: 120px;
  background-color: ${(props) => (props.isWeekday ? '#27282A' : '#1E1F21')};
  color: ${(props) => (props.isSelectedMonth ? '#DDDDDD' : '#555759')};
`;

export const RowInCell = styled.div<RowInCellProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
  ${(props) => props.pr && `padding-right: ${props.pr * 8}px`}
`;

export const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;

export const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const EventListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EventItemWrapper = styled.button`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;

export const EventListItemWrapper = styled.li`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;
