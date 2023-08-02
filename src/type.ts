import { CSSProperties } from 'styled-components';

export interface User {
  id?: number;
  title: string;
  description: string;
  data: string;
}

export type CellWrapperProps = {
  isHeader?: boolean;
  isWeekday?: boolean;
  isSelectedMonth?: boolean;
};
export type RowInCellProps = {
  justifyContent?: CSSProperties['justifyContent'];
  pr?: number;
};
