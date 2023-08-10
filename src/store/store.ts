import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dateReducer from './reducer/dateSlice';
import displayModeReducer from './reducer/displayModSlice';

const rootReducer = combineReducers({
  dateReducer,
  displayModeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSore = ReturnType<typeof setupStore>;
export type AppDispatch = AppSore['dispatch'];
