import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MethodType {
  method: 'Update' | 'Create' | null;
}

const initialState: MethodType = {
  method: null,
};

const methodSlice = createSlice({
  name: 'method',
  initialState,
  reducers: {
    updateMethod: (state, action: PayloadAction<'Update' | 'Create' | null>) => {
      return { ...state, method: action.payload };
    },
  },
});

export const { updateMethod } = methodSlice.actions;

export default methodSlice.reducer;
