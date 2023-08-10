import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

moment.updateLocale('en', { week: { dow: 1 } });

const initialState: { today: moment.Moment } = {
  today: moment(),
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateToday: (state, action: PayloadAction<moment.Moment>) => {
      return { ...state, today: action.payload };
    },
  },
});

export const { updateToday } = dateSlice.actions;

export default dateSlice.reducer;
