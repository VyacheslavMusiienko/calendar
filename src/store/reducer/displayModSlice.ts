import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from '../../helpers/constant';

interface DisplayMode {
  displayMod: typeof DISPLAY_MODE_MONTH | typeof DISPLAY_MODE_DAY;
}

const initialState: DisplayMode = {
  displayMod: DISPLAY_MODE_MONTH,
};

const displayModeSlice = createSlice({
  name: 'displayMod',
  initialState,
  reducers: {
    updateDisplayMod: (
      state,
      action: PayloadAction<typeof DISPLAY_MODE_MONTH | typeof DISPLAY_MODE_DAY>
    ) => {
      return { ...state, displayMod: action.payload };
    },
  },
});

export const { updateDisplayMod } = displayModeSlice.actions;

export default displayModeSlice.reducer;
